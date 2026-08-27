import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { resend } from '@/lib/resend';
import { appendToSheet } from '@/lib/google-sheets';
import { logAdminAction } from '@/lib/audit';

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
      .from('responses')
      .update({ status: action === 'accept' ? 'accepted' : 'rejected' })
      .eq('id', id);

    if (dbError) throw dbError;

    // 3. Send Email
    try {
      await resend.emails.send({
        from: 'Peercuit Admin <admin@peercuit.com>',
        to: email,
        subject: action === 'accept' ? 'Welcome to Peercuit!' : 'Update on your Peercuit application',
        html: `
          <div style="font-family: sans-serif; padding: 20px; color: #333;">
            <h2 style="color: #0d623d;">Hello!</h2>
            <p>Your application to Peercuit has been <strong>${action}ed</strong>.</p>
            ${action === 'accept' ? '<p>We are excited to have you on board! You will be matched for a coffee chat soon.</p>' : '<p>Thank you for your interest, but we cannot move forward at this time.</p>'}
          </div>
        `,
      });
    } catch (e) {
      console.error('Email failed to send. Check Resend key.', e);
    }

    // 4. Sync to Google Sheets
    if (process.env.GOOGLE_SHEET_ID) {
      try {
        await appendToSheet(
          process.env.GOOGLE_SHEET_ID,
          'Sheet1!A:D',
          [[id, email, action, new Date().toISOString()]]
        );
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

