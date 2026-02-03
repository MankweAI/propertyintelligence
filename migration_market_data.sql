-- 1. Create suburbs table
CREATE TABLE IF NOT EXISTS suburbs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  city TEXT NOT NULL DEFAULT 'Sandton',
  province TEXT NOT NULL DEFAULT 'Gauteng',
  centroid JSONB NOT NULL DEFAULT '{}'::jsonb,
  overview JSONB NOT NULL DEFAULT '{}'::jsonb, 
  related_suburbs TEXT[] DEFAULT '{}',
  seller_report JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 2. Create Indexes
CREATE INDEX IF NOT EXISTS idx_suburbs_slug ON suburbs(slug);
CREATE INDEX IF NOT EXISTS idx_suburbs_city ON suburbs(city);

-- 3. Setup Permissions (Disable RLS for migration)
ALTER TABLE suburbs ENABLE ROW LEVEL SECURITY;
ALTER TABLE suburbs DISABLE ROW LEVEL SECURITY; -- Temporarily Open for Seeding

-- 4. Create Policies (for when we enable it later)
DROP POLICY IF EXISTS "Allow public read" ON suburbs;
CREATE POLICY "Allow public read" ON suburbs FOR SELECT TO anon, authenticated USING (true);
