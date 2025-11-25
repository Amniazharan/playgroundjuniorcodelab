import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, profile, loading, authChecked } = useAuth()

  // Show loading state
  if (loading || !authChecked) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '1rem' }}>🔐</div>
          <p style={{ fontSize: '18px', color: '#6b7280' }}>Verifying subscription...</p>
        </div>
      </div>
    )
  }

  // Check if user is authenticated
  if (!user) {
    // Redirect to Phase 1 login
    window.location.href = 'https://kodkids.netlify.app/Login'
    return null
  }

  // Check if user is subscribed
  if (profile?.subscription_status !== 'active') {
    // Redirect to Phase 1 subscribe page
    window.location.href = 'https://kodkids.netlify.app/Subscribe'
    return null
  }

  // User is authenticated and subscribed
  return children
}
