import { useAuth } from '../contexts/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, profile, loading, error, isSubscribed } = useAuth()

  // Loading state
  if (loading) {
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

  // Error state
  if (error) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#fef2f2'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ fontSize: '64px', marginBottom: '1rem' }}>❌</div>
          <h1 style={{ fontSize: '24px', marginBottom: '1rem', color: '#991b1b' }}>
            Authentication Error
          </h1>
          <p style={{ fontSize: '16px', color: '#7f1d1d', marginBottom: '2rem' }}>
            {error}
          </p>
          <a
            href="https://kodkids.netlify.app/Login"
            style={{
              display: 'inline-block',
              background: '#dc2626',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Back to Login
          </a>
        </div>
      </div>
    )
  }

  // Not authenticated
  if (!user) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        background: '#f9fafb'
      }}>
        <div style={{ textAlign: 'center', maxWidth: '500px', padding: '2rem' }}>
          <div style={{ fontSize: '64px', marginBottom: '1rem' }}>🔒</div>
          <h1 style={{ fontSize: '24px', marginBottom: '1rem', color: '#111827' }}>
            Login Required
          </h1>
          <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '2rem' }}>
            You need to login to access the playground
          </p>
          <a
            href="https://kodkids.netlify.app/Login"
            style={{
              display: 'inline-block',
              background: '#3b82f6',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              textDecoration: 'none',
              fontWeight: '600'
            }}
          >
            Login Now
          </a>
        </div>
      </div>
    )
  }

  // Not subscribed
  if (!isSubscribed) {
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
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://kodkids.netlify.app/Subscribe"
              style={{
                display: 'inline-block',
                background: 'white',
                color: '#764ba2',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600'
              }}
            >
              Subscribe Now
            </a>
            <a
              href="https://kodkids.netlify.app"
              style={{
                display: 'inline-block',
                background: 'rgba(255,255,255,0.2)',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                border: '2px solid white'
              }}
            >
              Back to Home
            </a>
          </div>
        </div>
      </div>
    )
  }

  // All good - show playground
  console.log('✅ [ProtectedRoute] Access granted')
  return children
}
