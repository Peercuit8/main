'use server';

import { supabaseAdmin } from '@/lib/supabase';
import { createClient } from '@/lib/supabase/server';
import { resend } from '@/lib/resend';
import { getSetting } from '@/lib/settings';
import { logAdminAction } from '@/lib/audit';

export async function sendManualMatches(groupsOfIds: string[][]) {
  try {
    const supabaseServer = await createClient();
    const { data: { user } } = await supabaseServer.auth.getUser();
    
    if (!user) {
      return { error: 'Unauthorized' };
    }

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

    let groupsCount = 0;
    
    for (const groupIds of groupsOfIds) {
      if (groupIds.length > 1) {
        
        // Fetch emails for these IDs
        const { data: usersData } = await supabaseAdmin
          .from('responses')
          .select('email')
          .in('id', groupIds);

        if (usersData && usersData.length > 0) {
          groupsCount++;
          const emails = usersData.map(u => u.email);
          
          await resend.emails.send({
            from: 'Peercuit Coffee Chat <coffee@peercuit.com>',
            to: emails,
            subject: template.subject,
            html: template.body,
          }).catch(e => console.error('Failed to send to group', e));

          await supabaseAdmin
            .from('responses')
            .update({ matched: true })
            .in('id', groupIds);
        }
      }
    }

    await logAdminAction(user.email!, 'Triggered Manual Coffee Chats', { groupsCount, total_users_matched: groupsOfIds.flat().length });

    return { success: true, groupsCount };
  } catch (error: any) {
    return { error: error.message };
  }
}
