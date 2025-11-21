import { useAuth } from '../contexts/AuthContext'
import { useEffect, useState } from 'react'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading, token, user } = useAuth()
  const [shouldRedirect, setShouldRedirect] = useState(false)

  console.log('🛡️ ProtectedRoute Check:', {
    loading,
    isAuthenticated,
    hasToken: !!token,
    hasUser: !!user,
    userName: user?.name,
    currentPath: window.location.pathname,
    currentUrl: window.location.href,
    hasTokenInUrl: window.location.search.includes('token=')
  })

  // Check if we have token in URL - if yes, give AuthContext time to process
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      const urlParams = new URLSearchParams(window.location.search)
      const urlToken = urlParams.get('token')

      if (urlToken) {
        console.log('🕐 Token found in URL, waiting for AuthContext to process...')
        // Don't redirect yet - let AuthContext process the token first
        setTimeout(() => {
          console.log('⏰ Timeout reached, checking auth again...')
          if (!isAuthenticated) {
            console.warn('⚠️ Still not authenticated after processing token')
            setShouldRedirect(true)
          }
        }, 1000) // Give 1 second for processing
      } else {
        console.log('🚫 No token in URL, can redirect immediately')
        setShouldRedirect(true)
      }
    }
  }, [loading, isAuthenticated])

  // Show loading state
  if (loading) {
    console.log('⏳ ProtectedRoute: Still loading...')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to Phase 1 if not authenticated (but only if we should redirect)
  if (!isAuthenticated && shouldRedirect) {
    console.warn('❌ ProtectedRoute: NOT AUTHENTICATED - Redirecting to login')
    console.warn('   - Token:', token ? 'EXISTS' : 'NULL')
    console.warn('   - User:', user ? 'EXISTS' : 'NULL')

    // Redirect to Phase 1 login with return URL
    const returnUrl = encodeURIComponent(window.location.href)
    console.warn('   - Redirect to:', `https://juniorcodelab.com/login?redirect=${returnUrl}`)

    window.location.href = `https://juniorcodelab.com/login?redirect=${returnUrl}`

    // Show message while redirecting
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Required
          </h1>
          <p className="text-gray-600 mb-6">
            Kamu perlu login untuk access playground. Redirecting ke login page...
          </p>
          <a
            href={`https://juniorcodelab.com/login?redirect=${returnUrl}`}
            className="inline-block bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Go to Login
          </a>
        </div>
      </div>
    )
  }

  // If not authenticated but waiting for token processing, show loading
  if (!isAuthenticated && !shouldRedirect) {
    console.log('⏳ Processing authentication token...')
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Authenticating...</p>
        </div>
      </div>
    )
  }

  console.log('✅ ProtectedRoute: AUTHENTICATED - Rendering protected content')
  return children
}
