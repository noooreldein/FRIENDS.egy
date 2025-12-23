import { createClient } from '@supabase/supabase-js'

// السطر ده هيتأكد إن الرابط نضيف من أي مسافات
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() || ''
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim() || ''

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  console.error('Supabase URL is missing or invalid!')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)