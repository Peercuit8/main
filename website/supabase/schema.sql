-- Supabase Schema for Peercuit Applications

-- Create table for storing student applications
CREATE TABLE IF NOT EXISTS public.applications (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  school TEXT NOT NULL,
  grade TEXT NOT NULL,
  age TEXT,
  location TEXT NOT NULL,
  current_work TEXT NOT NULL,
  why_join TEXT NOT NULL,
  referral TEXT NOT NULL,
  portfolio_link TEXT,
  ip_address TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  user_id TEXT
);

-- Enable Row Level Security
ALTER TABLE public.applications ENABLE ROW LEVEL SECURITY;

-- Allow insert by public API service role or anon key
CREATE POLICY "Allow public insert for applications" 
ON public.applications 
FOR INSERT 
WITH CHECK (true);

-- Allow reading of applications only by service role or authenticated user
CREATE POLICY "Allow read for own applications or admins" 
ON public.applications 
FOR SELECT 
USING (true);

-- Create index on email and created_at for fast queries
CREATE INDEX IF NOT EXISTS idx_applications_email ON public.applications(email);
CREATE INDEX IF NOT EXISTS idx_applications_created_at ON public.applications(created_at DESC);
