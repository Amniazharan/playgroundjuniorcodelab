import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('🔍 [AuthContext] Starting auth initialization...')

        // Check URL parameter first
        const urlParams = new URLSearchParams(window.location.search)
        const authParam = urlParams.get('auth')

        if (authParam) {
          console.log('🔐 [AuthContext] Found auth param in URL')

          try {
            const authData = JSON.parse(atob(authParam))
            console.log('📦 [AuthContext] Decoded auth data:', {
              email: authData.user_email,
              hasToken: !!authData.access_token
            })

            // Set session
            console.log('🔄 [AuthContext] Setting session...')
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: authData.access_token,
              refresh_token: authData.refresh_token
            })

            console.log('📦 [AuthContext] Session result:', {
              hasUser: !!sessionData?.user,
              hasError: !!sessionError
            })

            if (sessionError) {
              console.error('❌ [AuthContext] Session error:', sessionError)
              setError('Failed to verify session')
              setLoading(false)
              return
            }

            const verifiedUser = sessionData?.user
            console.log('👤 [AuthContext] Verified user:', verifiedUser?.email)

            if (verifiedUser) {
              console.log('✅ [AuthContext] User verified:', verifiedUser.email)
              setUser(verifiedUser)

              // Fetch profile
              console.log('📡 [AuthContext] Fetching profile from database...')
              console.log('🔑 [AuthContext] User ID:', verifiedUser.id)

              try {
                const { data: profileData, error: profileError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', verifiedUser.id)
                  .single()

                console.log('📦 [AuthContext] Profile fetch result:', {
                  hasData: !!profileData,
                  hasError: !!profileError
                })

                if (profileError) {
                  console.error('❌ [AuthContext] Profile error:', profileError)
                  console.error('📋 [AuthContext] Error details:', {
                    message: profileError.message,
                    code: profileError.code,
                    hint: profileError.hint
                  })
                  setError(`Profile error: ${profileError.message}`)
                } else {
                  console.log('✅ [AuthContext] Profile loaded successfully!')
                  console.log('📊 [AuthContext] Profile data:', {
                    email: profileData.email,
                    subscription_status: profileData.subscription_status
                  })
                  setProfile(profileData)
                }
              } catch (fetchError) {
                console.error('❌ [AuthContext] Profile fetch exception:', fetchError)
                setError(`Profile fetch failed: ${fetchError.message}`)
              }

              // Clean URL
              console.log('🧹 [AuthContext] Cleaning URL...')
              window.history.replaceState({}, document.title, window.location.pathname)
              console.log('✨ [AuthContext] URL cleaned')
            }
          } catch (decodeError) {
            console.error('❌ [AuthContext] Decode error:', decodeError)
            setError('Invalid auth data')
          }
        } else {
          // Check existing session
          console.log('🔍 [AuthContext] Checking existing session...')
          const { data: { session } } = await supabase.auth.getSession()

          if (session?.user) {
            console.log('✅ [AuthContext] Found session:', session.user.email)
            setUser(session.user)

            // Fetch profile
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileError) {
              console.error('❌ [AuthContext] Profile error:', profileError)
              setError(`Profile error: ${profileError.message}`)
            } else {
              console.log('✅ [AuthContext] Profile loaded')
              setProfile(profileData)
            }
          } else {
            console.log('ℹ️ [AuthContext] No session found')
            setError('No authentication found')
          }
        }
      } catch (error) {
        console.error('❌ [AuthContext] Init error:', error)
        setError(error.message)
      } finally {
        console.log('🏁 [AuthContext] Setting loading = false')
        setLoading(false)
        console.log('✅ [AuthContext] Auth initialization complete!')
      }
    }

    initAuth()

    // Listen for auth changes (but ignore during initial load)
    let isInitialLoad = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 [AuthContext] Auth event:', event, '(initial:', isInitialLoad, ')')

      // Skip handling during initial auth setup
      if (isInitialLoad && event === 'SIGNED_IN') {
        console.log('⏭️ [AuthContext] Skipping SIGNED_IN during initial load')
        isInitialLoad = false
        return
      }

      if (event === 'SIGNED_OUT') {
        console.log('🚪 [AuthContext] User signed out')
        setUser(null)
        setProfile(null)
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        console.log('🔄 [AuthContext] Token refreshed')
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
      console.log('🚪 [AuthContext] Logging out...')
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      setError(null)
      console.log('✅ [AuthContext] Logged out')
      window.location.href = 'https://juniorcodelab.com/Login'
    } catch (error) {
      console.error('❌ [AuthContext] Logout error:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    error,
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
