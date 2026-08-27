import { supabaseAdmin } from './supabase';

export async function logAdminAction(adminEmail: string, action: string, details?: any) {
  try {
    const { error } = await supabaseAdmin
      .from('audit_logs')
      .insert([{ admin_email: adminEmail, action, details: details || {} }]);
      
    if (error) {
      console.error('Failed to write audit log:', error);
    }
  } catch (err) {
    console.error('Audit log exception:', err);
  }
}
