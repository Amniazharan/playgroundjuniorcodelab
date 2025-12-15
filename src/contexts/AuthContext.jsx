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

      // Timeout protection - prevent infinite loading
      const authTimeout = setTimeout(() => {
        console.error('❌ [AUTH] Authentication timeout (10s)')
        setLoading(false)
      }, 10000) // 10 second timeout

      try {
        // Check URL parameters first (from Phase 1 redirect)
        const urlParams = new URLSearchParams(window.location.search)
        const authParam = urlParams.get('auth')
        console.log('🔐 [AUTH] Auth param from URL:', authParam ? 'Found' : 'Not found')

        if (authParam) {
          console.log('🔐 [AUTH] Decoding auth data...')
          try {
            // Decode auth data from Phase 1
            const authData = JSON.parse(atob(authParam))
            console.log('🔐 [AUTH] Auth data decoded successfully')
            console.log('🔐 [AUTH] Access token length:', authData.access_token?.length)
            console.log('🔐 [AUTH] Refresh token exists:', !!authData.refresh_token)

            // Validate tokens exist
            if (!authData.access_token || !authData.refresh_token) {
              console.error('❌ [AUTH] Missing tokens in auth data')
              throw new Error('Invalid auth data: missing tokens')
            }

            // Set session with retry logic
            console.log('🔐 [AUTH] Setting Supabase session...')
            let sessionData, sessionError
            let retryCount = 0
            const maxRetries = 2

            while (retryCount < maxRetries) {
              const result = await supabase.auth.setSession({
                access_token: authData.access_token,
                refresh_token: authData.refresh_token
              })

              sessionData = result.data
              sessionError = result.error

              console.log(`🔐 [AUTH] setSession attempt ${retryCount + 1}/${maxRetries}`)
              console.log('🔐 [AUTH] Response:', {
                hasData: !!sessionData,
                hasError: !!sessionError,
                hasUser: !!sessionData?.user,
                hasSession: !!sessionData?.session,
                errorMessage: sessionError?.message
              })

              // If successful or non-retryable error, break
              if (!sessionError || sessionError.status === 401) {
                break
              }

              retryCount++
              if (retryCount < maxRetries) {
                console.log('⚠️ [AUTH] Retrying in 1s...')
                await new Promise(resolve => setTimeout(resolve, 1000))
              }
            }

            if (sessionError) {
              console.error('❌ [AUTH] Session error after retries:', sessionError)
              console.error('❌ [AUTH] Error details:', {
                message: sessionError.message,
                status: sessionError.status,
                name: sessionError.name,
                code: sessionError.code
              })

              // Clean URL and redirect to login
              window.history.replaceState({}, document.title, window.location.pathname)
              clearTimeout(authTimeout)
              setLoading(false)
              return
            }

            if (!sessionData?.user) {
              console.error('❌ [AUTH] No user in session data')
              console.error('❌ [AUTH] Full session data:', sessionData)

              // Clean URL and redirect to login
              window.history.replaceState({}, document.title, window.location.pathname)
              clearTimeout(authTimeout)
              setLoading(false)
              return
            }

            console.log('✅ [AUTH] Session set successfully:', sessionData.user?.email)
            console.log('✅ [AUTH] User ID:', sessionData.user?.id)

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
              // Continue even if profile fetch fails - user is still authenticated
            } else {
              console.log('✅ [AUTH] Profile fetched:', profileData?.subscription_status)
              setProfile(profileData)
            }

            // Clean URL
            console.log('🔐 [AUTH] Cleaning URL...')
            window.history.replaceState({}, document.title, window.location.pathname)

          } catch (decodeError) {
            console.error('❌ [AUTH] Failed to decode auth param:', decodeError)
            // Clean URL and let it fall through to session check
            window.history.replaceState({}, document.title, window.location.pathname)
          }
        } else {
          // Check existing session
          console.log('🔐 [AUTH] No auth param - checking existing session...')
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
        console.error('❌ [AUTH] Error stack:', error.stack)
      } finally {
        clearTimeout(authTimeout)
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
