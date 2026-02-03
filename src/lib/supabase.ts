import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PROJECT_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn('Missing Supabase environment variables. Lead capture may not work.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
