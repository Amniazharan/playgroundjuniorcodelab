import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

// Helper functions untuk environment-aware URLs
export const getAppUrl = () => {
  // Priority 1: Use explicit environment variable
  if (import.meta.env.VITE_APP_URL) {
    return import.meta.env.VITE_APP_URL
  }

  // Priority 2: Auto-detect from window.location (works anywhere!)
  if (typeof window !== 'undefined') {
    return `${window.location.protocol}//${window.location.host}${import.meta.env.BASE_URL || ''}`
  }

  // Priority 3: Fallback for SSR/build time
  return 'http://localhost:3000'
}

export const getLoginUrl = () => {
  const returnUrl = encodeURIComponent(getAppUrl())
  return `https://juniorcodelab.com/Login?redirect=${returnUrl}`
}

export const getSubscribeUrl = () => {
  const returnUrl = encodeURIComponent(getAppUrl())
  return `https://juniorcodelab.com/Subscribe?redirect=${returnUrl}`
}

export const getHomeUrl = () => {
  return 'https://juniorcodelab.com'
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const initAuth = async () => {
      console.log('🔐 [AUTH] Starting authentication...')
      console.log('🔐 [AUTH] Current URL:', window.location.href)

      try {
        // Check URL parameters first (from Phase 1 redirect)
        const urlParams = new URLSearchParams(window.location.search)
        const authParam = urlParams.get('auth')
        console.log('🔐 [AUTH] Auth param from URL:', authParam ? 'Found' : 'Not found')

        if (authParam) {
          console.log('🔐 [AUTH] Decoding auth data...')
          // Decode auth data from Phase 1
          const authData = JSON.parse(atob(authParam))
          console.log('🔐 [AUTH] Auth data decoded successfully')

          // Set session
          console.log('🔐 [AUTH] Setting Supabase session...')
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: authData.access_token,
            refresh_token: authData.refresh_token
          })

          if (sessionError) {
            console.error('❌ [AUTH] Session error:', sessionError)
            setLoading(false)
            return
          }

          console.log('✅ [AUTH] Session set successfully:', sessionData.user?.email)

          if (sessionData?.user) {
            setUser(sessionData.user)

            // Fetch profile
            console.log('🔐 [AUTH] Fetching user profile...')
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', sessionData.user.id)
              .single()

            if (profileError) {
              console.error('❌ [AUTH] Profile fetch error:', profileError)
            } else {
              console.log('✅ [AUTH] Profile fetched:', profileData?.subscription_status)
              setProfile(profileData)
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname)
          }
        } else {
          // Check existing session
          console.log('🔐 [AUTH] Checking existing session...')
          const { data: { session }, error: sessionError } = await supabase.auth.getSession()

          if (sessionError) {
            console.error('❌ [AUTH] Get session error:', sessionError)
          }

          if (session?.user) {
            console.log('✅ [AUTH] Existing session found:', session.user.email)
            setUser(session.user)

            // Fetch profile
            console.log('🔐 [AUTH] Fetching user profile...')
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileError) {
              console.error('❌ [AUTH] Profile fetch error:', profileError)
            } else {
              console.log('✅ [AUTH] Profile fetched:', profileData?.subscription_status)
              setProfile(profileData)
            }
          } else {
            console.log('⚠️ [AUTH] No existing session found')
          }
        }
      } catch (error) {
        console.error('❌ [AUTH] Fatal error:', error)
      } finally {
        console.log('🔐 [AUTH] Authentication complete. Loading:', false)
        setLoading(false)
      }
    }

    initAuth()

    // Listen to auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        setUser(session.user)

        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        }
      } else if (event === 'SIGNED_IN' && session?.user) {
        setUser(session.user)

        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      window.location.href = getLoginUrl()
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    logout,
    isAuthenticated: !!user,
    isSubscribed: profile?.subscription_status === 'active'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
