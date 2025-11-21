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
        // Try localStorage first (same domain)
        const storedToken = localStorage.getItem('juniorcodelab_token')
        const storedUser = localStorage.getItem('juniorcodelab_user')

        // Also check URL params (for cross-domain access)
        const urlParams = new URLSearchParams(window.location.search)
        const urlToken = urlParams.get('token')

        const activeToken = urlToken || storedToken

        if (activeToken) {
          setToken(activeToken)

          // If we got token from URL, save to localStorage
          if (urlToken) {
            localStorage.setItem('juniorcodelab_token', urlToken)
            // Clean URL
            window.history.replaceState({}, '', window.location.pathname)
          }

          // Parse user data
          if (storedUser) {
            setUser(JSON.parse(storedUser))
          } else if (urlToken) {
            // Decode token to get user info (assuming JWT)
            try {
              const payload = JSON.parse(atob(activeToken.split('.')[1]))
              const userData = {
                id: payload.userId || payload.sub,
                name: payload.name || 'Student',
                email: payload.email || ''
              }
              setUser(userData)
              localStorage.setItem('juniorcodelab_user', JSON.stringify(userData))
            } catch (e) {
              console.error('Failed to decode token:', e)
            }
          }
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
