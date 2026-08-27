import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/mailer';
import { appendToSheet } from '@/lib/google-sheets';
import { logAdminAction } from '@/lib/audit';
import { getSetting } from '@/lib/settings';

export async function POST(req: Request) {
  try {
    // 1. Authenticate Request
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id, action, email } = await req.json();

    // 2. Update Supabase
    const { error: dbError } = await supabaseAdmin
      .from('applications')
      .update({ status: action === 'accept' ? 'accepted' : 'rejected' })
      .eq('id', id);

    if (dbError) throw dbError;

    // 3. Send Email
    try {
      const templateKey = action === 'accept' ? 'acceptance_email_template' : 'rejection_email_template';
      
      const defaultAcceptanceBody = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #edf8f0; border-radius: 8px;">
        <h2 style="color: #0d623d;">Welcome to Peercuit!</h2>
        <p>Congratulations, your application has been accepted.</p>
        <p>We are thrilled to have you join our community. Stay tuned for upcoming events and your first coffee chat matches!</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">- The Peercuit Team</p>
      </div>
      `;

      const defaultRejectionBody = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #fcf4f4; border-radius: 8px;">
        <h2 style="color: #c53030;">Update on your Peercuit Application</h2>
        <p>Thank you for applying to Peercuit.</p>
        <p>Unfortunately, we are unable to offer you a spot in our community at this time.</p>
        <p>We encourage you to apply again in the future.</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">- The Peercuit Team</p>
      </div>
      `;

      const defaultTemplate = action === 'accept' ? {
        subject: 'You have been accepted to Peercuit!',
        body: defaultAcceptanceBody.trim()
      } : {
        subject: 'Update on your Peercuit application',
        body: defaultRejectionBody.trim()
      };

      const template = await getSetting<{ subject: string, body: string }>(templateKey, defaultTemplate);

      await sendEmail({
        to: email,
        subject: template.subject,
        html: template.body,
      });
    } catch (e) {
      console.error('Email failed to send.', e);
    }

    // 4. Sync to Google Sheets
    if (process.env.GOOGLE_SHEET_ID) {
      try {
        const { data: appData } = await supabaseAdmin.from('applications').select('*').eq('id', id).single();
        if (appData) {
          await appendToSheet(
            process.env.GOOGLE_SHEET_ID,
            'Sheet1!A:O',
            [[
              appData.id,
              appData.full_name || '',
              appData.email,
              appData.school || '',
              appData.grade || '',
              appData.location || '',
              appData.status,
              appData.matched ? 'Yes' : 'No',
              appData.current_work || '',
              appData.why_join || '',
              appData.referral || '',
              appData.portfolio_link || '',
              (appData.interests || []).join(', '),
              new Date(appData.created_at).toISOString(),
              appData.ip_address || ''
            ]]
          );
        }
      } catch (e) {
        console.error('Google Sheets append failed.', e);
      }
    }

    // 5. Audit Log
    await logAdminAction(user.email!, `${action === 'accept' ? 'Accepted' : 'Rejected'} User`, { target_email: email, id });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

