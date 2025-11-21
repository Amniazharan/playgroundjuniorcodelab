import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth()

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  // Redirect to Phase 1 if not authenticated
  if (!isAuthenticated) {
    // Redirect to Phase 1 login with return URL
    const returnUrl = encodeURIComponent(window.location.href)
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

  return children
}
