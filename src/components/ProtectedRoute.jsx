import { useAuth, getLoginUrl, getSubscribeUrl } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, profile, loading, isSubscribed } = useAuth()

  console.log('🛡️ [PROTECTED] Route check:', {
    loading,
    hasUser: !!user,
    userEmail: user?.email,
    isSubscribed,
    subscriptionStatus: profile?.subscription_status
  })

  // Loading state
  if (loading) {
    console.log('🛡️ [PROTECTED] Showing loading screen')
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
          <p style={{ fontSize: '18px', color: '#6b7280' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // Not authenticated - redirect to login
  if (!user) {
    console.log('🛡️ [PROTECTED] No user - redirecting to login')
    console.log('🛡️ [PROTECTED] Redirect URL:', getLoginUrl())
    window.location.href = getLoginUrl()
    return null
  }

  // Not subscribed - show subscribe page
  if (!isSubscribed) {
    console.log('🛡️ [PROTECTED] User not subscribed - showing subscribe page')
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '600px', padding: '2rem' }}>
          <div style={{ fontSize: '64px', marginBottom: '1rem' }}>✨</div>
          <h1 style={{ fontSize: '28px', marginBottom: '1rem', fontWeight: 'bold' }}>
            Premium Subscription Required
          </h1>
          <p style={{ fontSize: '16px', marginBottom: '0.5rem', opacity: 0.9 }}>
            Hi {user.email}!
          </p>
          <p style={{ fontSize: '16px', marginBottom: '2rem', opacity: 0.9 }}>
            Playground hanya untuk premium members
          </p>
          {profile && (
            <p style={{
              fontSize: '14px',
              marginBottom: '2rem',
              background: 'rgba(255,255,255,0.2)',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              display: 'inline-block'
            }}>
              Current status: <strong>{profile.subscription_status || 'inactive'}</strong>
            </p>
          )}
          <a
            href={getSubscribeUrl()}
            style={{
              display: 'inline-block',
              background: 'white',
              color: '#764ba2',
              padding: '0.75rem 2rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600',
              fontSize: '16px'
            }}
          >
            Subscribe Now
          </a>
        </div>
      </div>
    )
  }

  // All good - show playground
  console.log('🛡️ [PROTECTED] All checks passed - rendering playground')
  return children
}
