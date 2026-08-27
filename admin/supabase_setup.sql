-- 1. Create the responses table
CREATE TABLE IF NOT EXISTS public.responses (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'accepted', 'rejected')),
    matched BOOLEAN NOT NULL DEFAULT false,
    interests TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Enable Row Level Security (RLS) on the responses table
ALTER TABLE public.responses ENABLE ROW LEVEL SECURITY;

-- 3. Create policies for the responses table
-- Allow anyone to insert a response (e.g. from the main website application form)
CREATE POLICY "Allow public inserts on responses" 
ON public.responses 
FOR INSERT 
TO anon, authenticated
WITH CHECK (true);

-- Only authenticated users (admins) can view responses
CREATE POLICY "Allow authenticated users to select responses" 
ON public.responses 
FOR SELECT 
TO authenticated 
USING (true);

-- Only authenticated users (admins) can update responses
CREATE POLICY "Allow authenticated users to update responses" 
ON public.responses 
FOR UPDATE 
TO authenticated 
USING (true);

-- (Optional) Only authenticated users can delete
CREATE POLICY "Allow authenticated users to delete responses" 
ON public.responses 
FOR DELETE 
TO authenticated 
USING (true);

-- 4. Set up an Admin User (You can also do this via the Supabase UI)
-- Replace the email and password below to create your bootstrap admin owner.
-- In production, you should disable open sign-ups in Supabase Auth settings
-- so only invited users can log in.
-- 
-- Note: It is usually safer to create the first user manually via the Supabase Dashboard
-- (Authentication -> Users -> Add user), but you can use this snippet for testing:
--
-- INSERT INTO auth.users (id, email, encrypted_password, email_confirmed_at, role)
-- VALUES (
--   gen_random_uuid(),
--   'admin@peercuit.com',
--   crypt('supersecretpassword123', gen_salt('bf')),
--   now(),
--   'authenticated'
-- );
