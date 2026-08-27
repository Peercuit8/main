import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { sendEmail } from '@/lib/mailer';
import { getSetting } from '@/lib/settings';
import { logAdminAction } from '@/lib/audit';

export async function POST(req: Request) {
  try {
    // 1. Authenticate Request
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // 2. Fetch accepted users who haven't been matched
    const { data: users, error: dbError } = await supabaseAdmin
      .from('applications')
      .select('*')
      .eq('status', 'accepted')
      .eq('matched', false);

    if (dbError) throw dbError;

    if (!users || users.length < 3) {
      return NextResponse.json({ message: 'Not enough unmatched users to form a group (minimum 3 required).' });
    }

    // 3. Group them smartly so no one is stranded
    const groups = [];
    let i = 0;
    while (i < users.length) {
      const remaining = users.length - i;
      let chunkSize = 4;
      if (remaining === 5) {
        chunkSize = 5;
      } else if (remaining === 6) {
        chunkSize = 3;
      } else if (remaining < 4 && remaining >= 3) {
        chunkSize = 3;
      } else if (remaining < 3) {
        if (groups.length > 0) {
          groups[groups.length - 1].push(...users.slice(i, i + remaining));
        }
        break;
      }
      groups.push(users.slice(i, i + chunkSize));
      i += chunkSize;
    }

    // 3.5 Fetch email template
    const defaultEmailBody = `
      <div style="font-family: sans-serif; padding: 20px; color: #333; background-color: #edf8f0; border-radius: 8px;">
        <h2 style="color: #0d623d;">Hello everyone!</h2>
        <p>You have been matched for a coffee chat based on your shared interests.</p>
        <p>Reply all to this email to figure out a time that works for everyone to hop on a quick call and get to know each other.</p>
        <p>Enjoy your chat!</p>
        <p style="font-size: 12px; color: #666; margin-top: 30px;">- The Peercuit Team</p>
      </div>
    `;
    const template = await getSetting<{ subject: string, body: string }>('coffee_chat_email_template', {
      subject: 'Your Peercuit Coffee Chat Match!',
      body: defaultEmailBody
    });

    // 4. Send emails
    let groupsMatched = 0;
    for (const group of groups) {
      if (group.length >= 3) {
        groupsMatched++;
        const emails = group.map((u: any) => u.email).join(', ');
        
        try {
          await sendEmail({
            to: emails,
            subject: template.subject,
            html: template.body,
          });
        } catch (e) {
          console.error('Failed to send coffee chat email', e);
        }

        // 5. Mark as matched in DB
        const ids = group.map((u: any) => u.id);
        await supabaseAdmin
          .from('applications')
          .update({ matched: true })
          .in('id', ids);
      }
    }

    if (groupsMatched === 0) {
      return NextResponse.json({ message: 'Could not form any full groups of 3+ people.' });
    }

    // 6. Audit Log
    await logAdminAction(user.email!, 'Triggered Automated Coffee Chats', { groupsMatched });

    return NextResponse.json({ success: true, groupsMatched });
  } catch (error: any) {
    console.error('Coffee chat API Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

