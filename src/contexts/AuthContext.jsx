import { createContext, useContext, useState, useEffect } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext(null)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [session, setSession] = useState(null)

  useEffect(() => {
    // Get initial session
    const initializeAuth = async () => {
      try {
        console.log('🔍 [AuthContext] Initializing auth...')

        const { data: { session: currentSession } } = await supabase.auth.getSession()

        if (currentSession) {
          console.log('✅ [AuthContext] Session found!')
          console.log('👤 [AuthContext] User:', currentSession.user.email)
          setSession(currentSession)

          // Get additional user data from localStorage
          const userEmail = localStorage.getItem('kodkids_user_email') || currentSession.user.email
          const userId = localStorage.getItem('kodkids_user_id') || currentSession.user.id
          const subscriptionStatus = localStorage.getItem('kodkids_subscription_status') || 'inactive'

          setUser({
            id: userId,
            email: userEmail,
            name: userEmail.split('@')[0],
            subscription: subscriptionStatus,
            supabaseUser: currentSession.user
          })

          console.log('👤 [AuthContext] User data set:', {
            email: userEmail,
            subscription: subscriptionStatus
          })
        } else {
          console.log('ℹ️ [AuthContext] No session found')
          setUser(null)
          setSession(null)
        }
      } catch (error) {
        console.error('❌ [AuthContext] Error initializing auth:', error)
        setUser(null)
        setSession(null)
      } finally {
        setLoading(false)
      }
    }

    initializeAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, currentSession) => {
      console.log('🔔 [AuthContext] Auth state changed:', event)

      if (event === 'SIGNED_IN' || event === 'TOKEN_REFRESHED') {
        console.log('✅ [AuthContext] User signed in or token refreshed')
        setSession(currentSession)

        if (currentSession?.user) {
          const userEmail = localStorage.getItem('kodkids_user_email') || currentSession.user.email
          const userId = localStorage.getItem('kodkids_user_id') || currentSession.user.id
          const subscriptionStatus = localStorage.getItem('kodkids_subscription_status') || 'inactive'

          setUser({
            id: userId,
            email: userEmail,
            name: userEmail.split('@')[0],
            subscription: subscriptionStatus,
            supabaseUser: currentSession.user
          })
        }
      } else if (event === 'SIGNED_OUT') {
        console.log('🚪 [AuthContext] User signed out')
        setUser(null)
        setSession(null)

        // Clear localStorage
        localStorage.removeItem('kodkids_user_email')
        localStorage.removeItem('kodkids_user_id')
        localStorage.removeItem('kodkids_subscription_status')
      }

      setLoading(false)
    })

    // Cleanup subscription
    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const logout = async () => {
    try {
      console.log('🚪 [AuthContext] Logging out...')

      // Sign out from Supabase
      await supabase.auth.signOut()

      // Clear all auth data
      setUser(null)
      setSession(null)

      // Clear localStorage
      localStorage.removeItem('kodkids_user_email')
      localStorage.removeItem('kodkids_user_id')
      localStorage.removeItem('kodkids_subscription_status')

      console.log('✅ [AuthContext] Logged out successfully')
      console.log('🔄 [AuthContext] Redirecting to Phase 1...')

      // Redirect to Phase 1
      window.location.href = 'https://juniorcodelab.com'
    } catch (error) {
      console.error('❌ [AuthContext] Error during logout:', error)
    }
  }

  const value = {
    user,
    session,
    loading,
    isAuthenticated: !!session && !!user,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
