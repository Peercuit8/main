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
    let inviteUrl = '';
    const updatePayload: Record<string, any> = {
      status: action === 'accept' ? 'accepted' : 'rejected'
    };

    if (action === 'accept') {
      const inviteToken = crypto.randomUUID();
      updatePayload.invite_token = inviteToken;
      updatePayload.invite_token_used = false;

      const siteUrl = 
        process.env.NEXT_PUBLIC_SITE_URL || 
        process.env.WEBSITE_URL || 
        (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : '') ||
        (process.env.NEXT_PUBLIC_VERCEL_URL ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}` : '') ||
        (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
        'https://peercuit.com';

      inviteUrl = `${siteUrl.replace(/\/$/, '')}/join?token=${inviteToken}`;
    }

    const { error: dbError } = await supabaseAdmin
      .from('applications')
      .update(updatePayload)
      .eq('id', id);

    if (dbError) throw dbError;

    // 3. Send Email
    try {
      const templateKey = action === 'accept' ? 'acceptance_email_template' : 'rejection_email_template';
      
      const defaultAcceptanceBody = `
      <div style="font-family: sans-serif; padding: 24px; color: #1e293b; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0d623d; margin-top: 0; font-size: 22px;">Welcome to Peercuit! 🎉</h2>
        <p style="font-size: 15px; line-height: 1.6;">Congratulations, your application to join the Peercuit community has been accepted!</p>
        <p style="font-size: 15px; line-height: 1.6;">Click the button below to join the private WhatsApp community. Please note that this is your <strong>single-use, personalized invite link</strong>:</p>
        
        <div style="margin: 28px 0; text-align: center;">
          <a href="{invite_link}" style="background-color: #0d623d; color: #ffffff; padding: 14px 28px; font-weight: 700; border-radius: 10px; text-decoration: none; display: inline-block; font-size: 15px; box-shadow: 0 4px 12px rgba(13, 98, 61, 0.2);">
            👉 Join WhatsApp Community
          </a>
        </div>

        <p style="font-size: 12px; color: #64748b; line-height: 1.5; text-align: center;">
          🔒 <em>This invite link will expire once you click it. Please do not share or forward this link.</em>
        </p>

        <hr style="border: none; border-top: 1px solid #dcfce7; margin: 24px 0;" />
        <p style="font-size: 13px; color: #475569; margin-bottom: 0;">Cheering you on,<br/><strong style="color: #0d623d;">The Peercuit Team</strong></p>
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
        subject: 'You have been accepted to Peercuit! 🎉',
        body: defaultAcceptanceBody.trim()
      } : {
        subject: 'Update on your Peercuit application',
        body: defaultRejectionBody.trim()
      };

      const template = await getSetting<{ subject: string, body: string }>(templateKey, defaultTemplate);

      let finalHtml = template.body;
      if (action === 'accept' && inviteUrl) {
        if (finalHtml.includes('{invite_link}')) {
          finalHtml = finalHtml.replace(/\{invite_link\}/g, inviteUrl);
        } else {
          // If the custom template didn't have the placeholder, automatically append the button
          finalHtml += `
            <div style="margin: 24px 0; text-align: center;">
              <a href="${inviteUrl}" style="background-color: #0d623d; color: #ffffff; padding: 12px 24px; font-weight: bold; border-radius: 8px; text-decoration: none; display: inline-block;">
                👉 Join WhatsApp Community (One-Time Link)
              </a>
            </div>
          `;
        }
      }

      await sendEmail({
        to: email,
        subject: template.subject,
        html: finalHtml,
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

