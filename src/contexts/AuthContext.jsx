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
  const [token, setToken] = useState(null)

  useEffect(() => {
    // Check for token in localStorage (from Phase 1)
    const checkAuth = async () => {
      try {
        // Check URL params FIRST (for cross-domain access)
        const urlParams = new URLSearchParams(window.location.search)
        const urlToken = urlParams.get('token')

        console.log('🌐 Current URL:', window.location.href)
        console.log('📍 URL Token:', urlToken ? 'EXISTS (length: ' + urlToken.length + ')' : 'MISSING')

        // Check both Phase 1 keys (kodkids_*) and Phase 2 keys (juniorcodelab_*)
        const phase1Token = localStorage.getItem('kodkids_auth_token')
        const phase1Email = localStorage.getItem('kodkids_user_email')
        const phase1Subscription = localStorage.getItem('kodkids_subscription_status')

        const phase2Token = localStorage.getItem('juniorcodelab_token')
        const phase2User = localStorage.getItem('juniorcodelab_user')

        // Priority: URL token > Phase 1 token > Phase 2 token
        const activeToken = urlToken || phase1Token || phase2Token

        console.log('🔍 Auth Check:', {
          currentUrl: window.location.href,
          hasUrlToken: !!urlToken,
          urlTokenLength: urlToken?.length || 0,
          hasPhase1Token: !!phase1Token,
          hasPhase2Token: !!phase2Token,
          phase1Email,
          phase1Subscription,
          activeTokenSource: urlToken ? 'URL' : phase1Token ? 'Phase1' : phase2Token ? 'Phase2' : 'NONE'
        })

        if (activeToken) {
          console.log('✅ Token found! Source:', urlToken ? 'URL' : phase1Token ? 'Phase1 localStorage' : 'Phase2 localStorage')

          // 🔥 VALIDATE TOKEN WITH SUPABASE
          try {
            console.log('🔐 Validating token with Supabase...')
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: activeToken,
              refresh_token: '' // Optional - Phase 1 might have refresh token
            })

            if (sessionError) {
              console.error('❌ Supabase validation failed:', sessionError.message)
              throw sessionError
            }

            console.log('✅ Supabase session validated!', sessionData)

            // Token is VALID - set it
            setToken(activeToken)

            // If we got token from URL, save to both Phase 1 & Phase 2 keys
            if (urlToken) {
              console.log('💾 Saving URL token to localStorage...')
              localStorage.setItem('kodkids_auth_token', urlToken)
              localStorage.setItem('juniorcodelab_token', urlToken)
            }

            // Get user from Supabase session
            const supabaseUser = sessionData.user
            console.log('👤 Supabase User:', supabaseUser)

            const userData = {
              id: supabaseUser.id,
              email: supabaseUser.email || phase1Email || 'student@juniorcodelab.com',
              name: supabaseUser.email?.split('@')[0] || phase1Email?.split('@')[0] || 'Student',
              subscription: phase1Subscription || 'inactive',
              supabaseUser: supabaseUser
            }

            console.log('👤 User data created:', userData)
            localStorage.setItem('juniorcodelab_user', JSON.stringify(userData))

            console.log('✅ User authenticated:', userData)
            setUser(userData)

            // Clean URL AFTER everything is set
            if (urlToken) {
              console.log('🧹 Cleaning URL (removing token)...')
              window.history.replaceState({}, '', window.location.pathname)
            }

          } catch (validationError) {
            console.error('❌ Token validation failed:', validationError)
            console.warn('⚠️ Token invalid or expired - falling back to manual decode')

            // Fallback: Try manual decode (for backward compatibility)
            try {
              console.log('🔐 Trying manual JWT decode as fallback...')
              const payload = JSON.parse(atob(activeToken.split('.')[1]))
              console.log('📦 Token payload:', payload)

              // Check if token is expired
              if (payload.exp && payload.exp * 1000 < Date.now()) {
                console.error('❌ Token expired!')
                throw new Error('Token expired')
              }

              setToken(activeToken)

              if (urlToken) {
                localStorage.setItem('kodkids_auth_token', urlToken)
                localStorage.setItem('juniorcodelab_token', urlToken)
              }

              const userData = {
                id: payload.sub || payload.user_id || payload.userId,
                email: payload.email || phase1Email || 'student@juniorcodelab.com',
                name: payload.email?.split('@')[0] || phase1Email?.split('@')[0] || 'Student',
                subscription: phase1Subscription || 'inactive'
              }
              console.log('👤 User data created (fallback):', userData)
              localStorage.setItem('juniorcodelab_user', JSON.stringify(userData))

              console.log('✅ User authenticated (fallback):', userData)
              setUser(userData)

              if (urlToken) {
                console.log('🧹 Cleaning URL (removing token)...')
                window.history.replaceState({}, '', window.location.pathname)
              }
            } catch (decodeError) {
              console.error('❌ Manual decode also failed:', decodeError)
              console.error('Token is completely invalid - clearing and redirecting')

              // Clear invalid tokens
              localStorage.removeItem('kodkids_auth_token')
              localStorage.removeItem('juniorcodelab_token')
              localStorage.removeItem('juniorcodelab_user')

              setToken(null)
              setUser(null)
            }
          }
        } else {
          console.warn('⚠️ No token found anywhere!')
          console.warn('   - URL token: MISSING')
          console.warn('   - Phase 1 token: MISSING')
          console.warn('   - Phase 2 token: MISSING')
        }
      } catch (error) {
        console.error('❌ Auth check error:', error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = (tokenData, userData) => {
    setToken(tokenData)
    setUser(userData)
    localStorage.setItem('juniorcodelab_token', tokenData)
    localStorage.setItem('juniorcodelab_user', JSON.stringify(userData))
  }

  const logout = async () => {
    console.log('🚪 Logging out...')

    // Sign out from Supabase
    await supabase.auth.signOut()

    setToken(null)
    setUser(null)
    localStorage.removeItem('juniorcodelab_token')
    localStorage.removeItem('juniorcodelab_user')
    localStorage.removeItem('kodkids_auth_token')
    localStorage.removeItem('kodkids_user_email')
    localStorage.removeItem('kodkids_subscription_status')

    console.log('✅ Logged out, redirecting to Phase 1...')

    // Redirect to Phase 1
    window.location.href = 'https://juniorcodelab.com'
  }

  const value = {
    user,
    token,
    loading,
    isAuthenticated: !!token,
    login,
    logout
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
