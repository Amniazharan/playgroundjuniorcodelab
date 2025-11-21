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
        // Also check URL params FIRST (for cross-domain access)
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

          setToken(activeToken)

          // If we got token from URL, save to both Phase 1 & Phase 2 keys
          if (urlToken) {
            console.log('💾 Saving URL token to localStorage...')
            localStorage.setItem('kodkids_auth_token', urlToken)
            localStorage.setItem('juniorcodelab_token', urlToken)
          }

          // Parse user data
          let userData = null

          // Try Phase 2 user first
          if (phase2User) {
            console.log('👤 Using existing Phase 2 user data')
            userData = JSON.parse(phase2User)
          }
          // Try Phase 1 email
          else if (phase1Email) {
            console.log('👤 Creating user from Phase 1 email')
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
              console.log('🔐 Decoding JWT token...')
              const payload = JSON.parse(atob(activeToken.split('.')[1]))
              console.log('📦 Token payload:', payload)

              userData = {
                id: payload.sub || payload.user_id || payload.userId,
                email: payload.email || 'student@juniorcodelab.com',
                name: payload.email?.split('@')[0] || payload.name || 'Student',
                subscription: phase1Subscription || 'inactive'
              }
              console.log('👤 User data created:', userData)
              localStorage.setItem('juniorcodelab_user', JSON.stringify(userData))
            } catch (e) {
              console.error('❌ Failed to decode token:', e)
              // Fallback to basic user
              userData = {
                email: phase1Email || 'student@juniorcodelab.com',
                name: phase1Email?.split('@')[0] || 'Student',
                subscription: phase1Subscription || 'inactive'
              }
              console.log('👤 Using fallback user data:', userData)
            }
          }

          console.log('✅ User authenticated:', userData)
          setUser(userData)

          // Clean URL AFTER everything is set
          if (urlToken) {
            console.log('🧹 Cleaning URL (removing token)...')
            window.history.replaceState({}, '', window.location.pathname)
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
