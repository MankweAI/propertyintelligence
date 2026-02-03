-- Create the leads table if it doesn't exist
CREATE TABLE IF NOT EXISTS leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  buyer_type TEXT NOT NULL,
  budget_range TEXT NOT NULL,
  preferred_suburbs JSONB NOT NULL,
  timeline TEXT NOT NULL,
  pre_approved TEXT NOT NULL,
  consent_given BOOLEAN NOT NULL DEFAULT false,
  consent_timestamp TIMESTAMPTZ NOT NULL DEFAULT now(),
  consent_text_version TEXT NOT NULL,
  consent_purpose TEXT NOT NULL,
  source_url TEXT NOT NULL,
  user_agent TEXT NOT NULL,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  status TEXT NOT NULL DEFAULT 'new',
  assigned_agent_id TEXT
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at);

-- 1. Enable RLS
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- 2. Drop existing policies to avoid errors when re-running
DROP POLICY IF EXISTS "Allow public insert" ON leads;
DROP POLICY IF EXISTS "Allow authenticated read" ON leads;
DROP POLICY IF EXISTS "Allow public lead submission" ON leads;
DROP POLICY IF EXISTS "Allow service role read" ON leads;

-- 3. Re-create Policies
-- Allow anyone (anon) to insert a lead
CREATE POLICY "Allow public insert" 
ON leads 
FOR INSERT 
TO anon, authenticated 
WITH CHECK (true);

-- Allow authenticated users (dashboard admins) to read leads
CREATE POLICY "Allow authenticated read" 
ON leads 
FOR SELECT 
TO authenticated, service_role 
USING (true);

-- Allow authenticated users to update/delete (e.g. changing status)
CREATE POLICY "Allow authenticated update" 
ON leads 
FOR UPDATE 
TO authenticated, service_role 
USING (true);
