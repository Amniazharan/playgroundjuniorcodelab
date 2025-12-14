import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

// Helper functions untuk environment-aware URLs
export const getAppUrl = () => {
  return import.meta.env.VITE_APP_URL || 'http://localhost:3000'
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
      try {
        // Check URL parameters first (from Phase 1 redirect)
        const urlParams = new URLSearchParams(window.location.search)
        const authParam = urlParams.get('auth')

        if (authParam) {
          // Decode auth data from Phase 1
          const authData = JSON.parse(atob(authParam))

          // Set session
          const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
            access_token: authData.access_token,
            refresh_token: authData.refresh_token
          })

          if (sessionError) {
            console.error('Session error:', sessionError)
            setLoading(false)
            return
          }

          if (sessionData?.user) {
            setUser(sessionData.user)

            // Fetch profile
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', sessionData.user.id)
              .single()

            if (profileData) {
              setProfile(profileData)
            }

            // Clean URL
            window.history.replaceState({}, document.title, window.location.pathname)
          }
        } else {
          // Check existing session
          const { data: { session } } = await supabase.auth.getSession()

          if (session?.user) {
            setUser(session.user)

            // Fetch profile
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileData) {
              setProfile(profileData)
            }
          }
        }
      } catch (error) {
        console.error('Auth error:', error)
      } finally {
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
