import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Guna Supabase credentials yang SAMA dengan Phase 1
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

console.log('🔌 [SUPABASE] Initializing client...')
console.log('🔌 [SUPABASE] URL:', supabaseUrl)
console.log('🔌 [SUPABASE] Key exists:', !!supabaseAnonKey)

if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ [SUPABASE] Missing environment variables')
  throw new Error('Missing Supabase environment variables. Please check .env.local file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
console.log('✅ [SUPABASE] Client created successfully')
