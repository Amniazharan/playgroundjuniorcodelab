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

// Configure Supabase client with proper auth settings for Phase 2
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    // CRITICAL: Disable auto-refresh initially to prevent race conditions
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false, // We handle auth manually via URL params
    flowType: 'pkce',
    storage: window.localStorage,
    storageKey: 'kodkids-playground-auth', // Unique key untuk Phase 2
    debug: import.meta.env.DEV
  }
})

console.log('✅ [SUPABASE] Client created with auth config')
console.log('🔌 [SUPABASE] Storage key: kodkids-playground-auth')
console.log('🔌 [SUPABASE] Persist session: true')
console.log('🔌 [SUPABASE] Auto refresh: true')
