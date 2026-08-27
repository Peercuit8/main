import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder';

// Admin panel uses the service role key to bypass RLS for admin operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
