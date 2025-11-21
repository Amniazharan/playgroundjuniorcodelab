import { createContext, useContext, useState, useEffect } from 'react'

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
    const checkAuth = () => {
      try {
        // Check both Phase 1 keys (kodkids_*) and Phase 2 keys (juniorcodelab_*)
        const phase1Token = localStorage.getItem('kodkids_auth_token')
        const phase1Email = localStorage.getItem('kodkids_user_email')
        const phase1Subscription = localStorage.getItem('kodkids_subscription_status')

        const phase2Token = localStorage.getItem('juniorcodelab_token')
        const phase2User = localStorage.getItem('juniorcodelab_user')

        // Also check URL params (for cross-domain access)
        const urlParams = new URLSearchParams(window.location.search)
        const urlToken = urlParams.get('token')

        // Priority: URL token > Phase 1 token > Phase 2 token
        const activeToken = urlToken || phase1Token || phase2Token

        console.log('🔍 Auth Check:', {
          hasUrlToken: !!urlToken,
          hasPhase1Token: !!phase1Token,
          hasPhase2Token: !!phase2Token,
          phase1Email,
          phase1Subscription
        })

        if (activeToken) {
          setToken(activeToken)

          // If we got token from URL, save to both Phase 1 & Phase 2 keys
          if (urlToken) {
            localStorage.setItem('kodkids_auth_token', urlToken)
            localStorage.setItem('juniorcodelab_token', urlToken)
            // Clean URL
            window.history.replaceState({}, '', window.location.pathname)
          }

          // Parse user data
          let userData = null

          // Try Phase 2 user first
          if (phase2User) {
            userData = JSON.parse(phase2User)
          }
          // Try Phase 1 email
          else if (phase1Email) {
            userData = {
              email: phase1Email,
              name: phase1Email.split('@')[0],
              subscription: phase1Subscription || 'inactive'
            }
            // Save to Phase 2 format
            localStorage.setItem('juniorcodelab_user', JSON.stringify(userData))
          }
          // Try decode token (Supabase JWT)
          else if (activeToken) {
            try {
              const payload = JSON.parse(atob(activeToken.split('.')[1]))
              userData = {
                id: payload.sub || payload.userId,
                email: payload.email || 'student@juniorcodelab.com',
                name: payload.email?.split('@')[0] || 'Student',
                subscription: phase1Subscription || 'inactive'
              }
              localStorage.setItem('juniorcodelab_user', JSON.stringify(userData))
            } catch (e) {
              console.error('Failed to decode token:', e)
              // Fallback to basic user
              userData = {
                email: phase1Email || 'student@juniorcodelab.com',
                name: phase1Email?.split('@')[0] || 'Student',
                subscription: phase1Subscription || 'inactive'
              }
            }
          }

          console.log('✅ User authenticated:', userData)
          setUser(userData)
        } else {
          console.warn('⚠️ No token found anywhere!')
        }
      } catch (error) {
        console.error('Auth check error:', error)
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

  const logout = () => {
    setToken(null)
    setUser(null)
    localStorage.removeItem('juniorcodelab_token')
    localStorage.removeItem('juniorcodelab_user')

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
