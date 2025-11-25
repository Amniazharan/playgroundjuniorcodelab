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
            const { data: { user: verifiedUser }, error: sessionError } = await supabase.auth.setSession({
              access_token: authData.access_token,
              refresh_token: authData.refresh_token
            })

            if (sessionError) {
              console.error('❌ [AuthContext] Session error:', sessionError)
              setError('Failed to verify session')
              setLoading(false)
              return
            }

            if (verifiedUser) {
              console.log('✅ [AuthContext] User verified:', verifiedUser.email)
              setUser(verifiedUser)

              // Fetch profile
              console.log('📡 [AuthContext] Fetching profile...')
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', verifiedUser.id)
                .single()

              if (profileError) {
                console.error('❌ [AuthContext] Profile error:', profileError)
                setError(`Profile error: ${profileError.message}`)
              } else {
                console.log('✅ [AuthContext] Profile loaded:', profileData)
                setProfile(profileData)
              }

              // Clean URL
              window.history.replaceState({}, document.title, window.location.pathname)
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
        setLoading(false)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 [AuthContext] Auth event:', event)

      if (event === 'SIGNED_OUT') {
        setUser(null)
        setProfile(null)
      } else if (session?.user) {
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

  const value = {
    user,
    profile,
    loading,
    error,
    isAuthenticated: !!user,
    isSubscribed: profile?.subscription_status === 'active'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
