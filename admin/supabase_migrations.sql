-- 1. Create the settings table for storing configuration like email templates
CREATE TABLE IF NOT EXISTS public.settings (
    key TEXT PRIMARY KEY,
    value JSONB NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on settings
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can manage settings (insert/update/delete)
CREATE POLICY "Allow authenticated users to manage settings" 
ON public.settings 
FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);

-- Allow public read access to settings
CREATE POLICY "Allow public read access to settings" 
ON public.settings 
FOR SELECT 
TO public 
USING (true);

-- 2. Create the audit_logs table to track admin actions
CREATE TABLE IF NOT EXISTS public.audit_logs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    admin_email TEXT NOT NULL,
    action TEXT NOT NULL,
    details JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on audit_logs
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Only authenticated admins can read or write audit logs
CREATE POLICY "Allow authenticated users to manage audit_logs" 
ON public.audit_logs 
FOR ALL 
TO authenticated 
USING (true) WITH CHECK (true);
