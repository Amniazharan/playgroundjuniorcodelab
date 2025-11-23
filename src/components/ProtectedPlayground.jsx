/**
 * ============================================================================
 * SUBSCRIPTION PROTECTION SYSTEM - PHASE 2
 * ============================================================================
 *
 * MASALAH: Anyone dengan link boleh access playground tanpa subscription
 * SOLUTION: Verify subscription status dari DATABASE (bukan localStorage)
 *
 * SECURITY LAYERS:
 * 1. Check session exists (already done by ProtectedRoute)
 * 2. Fetch profile from DATABASE to verify subscription
 * 3. Cross-check localStorage vs database
 * 4. Block if subscription_status !== 'active'
 * ============================================================================
 */

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

/**
 * Hook to verify user has ACTIVE subscription from DATABASE
 */
export function useSubscriptionVerification() {
  const [isVerifying, setIsVerifying] = useState(true)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [subscriptionError, setSubscriptionError] = useState(null)
  const [user, setUser] = useState(null)
  const [subscriptionStatus, setSubscriptionStatus] = useState(null)

  useEffect(() => {
    const verifySubscription = async () => {
      try {
        console.log('🔒 [SubscriptionCheck] Verifying subscription access...')

        // 1. Check if user is authenticated (session)
        const { data: { session }, error: sessionError } = await supabase.auth.getSession()

        if (sessionError || !session) {
          console.error('❌ [SubscriptionCheck] No valid session')
          setSubscriptionError('Sila login dari Phase 1 (juniorcodelab.com)')
          setIsSubscribed(false)
          setIsVerifying(false)
          return
        }

        console.log('✅ [SubscriptionCheck] Session valid:', session.user.email)
        setUser(session.user)

        // 2. CRITICAL: Fetch profile from DATABASE (cannot be bypassed)
        console.log('📡 [SubscriptionCheck] Fetching profile from database...')
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('subscription_status, email, id, full_name')
          .eq('id', session.user.id)
          .single()

        if (profileError) {
          console.error('❌ [SubscriptionCheck] Failed to fetch profile:', profileError)

          // Check if RLS is blocking the query
          if (profileError.code === 'PGRST116') {
            console.error('⚠️ [SubscriptionCheck] RLS might be blocking - no rows returned')
            setSubscriptionError('Ralat akses data. Sila cuba login semula.')
          } else {
            setSubscriptionError('Ralat mengambil data profil. Sila cuba lagi.')
          }

          setIsSubscribed(false)
          setIsVerifying(false)
          return
        }

        console.log('📦 [SubscriptionCheck] Profile data:', {
          id: profile.id,
          email: profile.email,
          subscription_status: profile.subscription_status
        })

        setSubscriptionStatus(profile.subscription_status)

        // 3. CRITICAL: Verify subscription status from DATABASE
        if (profile.subscription_status !== 'active') {
          console.warn('⚠️ [SubscriptionCheck] User NOT subscribed')
          console.warn('📊 [SubscriptionCheck] Status:', profile.subscription_status)
          setSubscriptionError('Premium subscription diperlukan untuk akses Playground')
          setIsSubscribed(false)
          setIsVerifying(false)
          return
        }

        // 4. Cross-check: Verify localStorage matches database (detect tampering)
        const localSubStatus = localStorage.getItem('kodkids_subscription_status')
        if (localSubStatus && localSubStatus !== profile.subscription_status) {
          console.warn('⚠️ [SubscriptionCheck] localStorage mismatch detected!')
          console.warn('📊 [SubscriptionCheck] localStorage:', localSubStatus)
          console.warn('📊 [SubscriptionCheck] Database:', profile.subscription_status)
          console.warn('✅ [SubscriptionCheck] Using database value (source of truth)')

          // Update localStorage with correct value from database
          localStorage.setItem('kodkids_subscription_status', profile.subscription_status)
        }

        console.log('✅ [SubscriptionCheck] Subscription verified: ACTIVE')
        console.log('🎉 [SubscriptionCheck] User has access to playground')
        setIsSubscribed(true)
        setSubscriptionError(null)

      } catch (error) {
        console.error('❌ [SubscriptionCheck] Unexpected error:', error)
        setSubscriptionError('Ralat semasa verify subscription. Sila login semula.')
        setIsSubscribed(false)
      } finally {
        setIsVerifying(false)
      }
    }

    verifySubscription()
  }, [])

  return { isVerifying, isSubscribed, subscriptionError, user, subscriptionStatus }
}

/**
 * ProtectedPlayground Component
 * Wraps playground content and only shows it to subscribed users
 */
export default function ProtectedPlayground({ children }) {
  const { isVerifying, isSubscribed, subscriptionError, user, subscriptionStatus } = useSubscriptionVerification()

  // LOADING STATE - While verifying subscription
  if (isVerifying) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{
          fontSize: '64px',
          marginBottom: '1rem',
          animation: 'pulse 2s infinite'
        }}>
          🔐
        </div>
        <h2 style={{
          fontSize: '24px',
          marginBottom: '0.5rem',
          fontWeight: '600'
        }}>
          Verifying Subscription Access...
        </h2>
        <p style={{ opacity: 0.9, fontSize: '16px' }}>
          Checking your subscription status from database
        </p>
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; transform: scale(1); }
            50% { opacity: 0.5; transform: scale(0.95); }
          }
        `}</style>
      </div>
    )
  }

  // BLOCKED STATE - Not subscribed or verification failed
  if (!isSubscribed || subscriptionError) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        color: 'white',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: '96px', marginBottom: '1.5rem' }}>
          🔒
        </div>
        <h1 style={{
          fontSize: 'clamp(28px, 6vw, 48px)',
          marginBottom: '1rem',
          fontWeight: 'bold'
        }}>
          Premium Access Required
        </h1>
        <p style={{
          fontSize: 'clamp(16px, 4vw, 20px)',
          marginBottom: '0.5rem',
          maxWidth: '600px',
          opacity: 0.95
        }}>
          {subscriptionError || 'Playground hanya untuk Premium Members sahaja'}
        </p>

        {subscriptionStatus && subscriptionStatus !== 'active' && (
          <p style={{
            fontSize: '14px',
            marginBottom: '2rem',
            opacity: 0.85,
            background: 'rgba(255, 255, 255, 0.2)',
            padding: '0.5rem 1rem',
            borderRadius: '8px'
          }}>
            Status semasa: <strong>{subscriptionStatus}</strong>
          </p>
        )}

        <div style={{
          background: 'rgba(255, 255, 255, 0.2)',
          backdropFilter: 'blur(10px)',
          borderRadius: '16px',
          padding: '1.5rem',
          marginBottom: '2rem',
          maxWidth: '500px',
          width: '90%'
        }}>
          <h3 style={{
            fontSize: '18px',
            marginBottom: '1rem',
            fontWeight: '600'
          }}>
            ✨ Premium Features:
          </h3>
          <ul style={{
            listStyle: 'none',
            padding: 0,
            textAlign: 'left',
            fontSize: '16px',
            lineHeight: '2'
          }}>
            <li>✅ Interactive Code Playground</li>
            <li>✅ Real-time Python Execution</li>
            <li>✅ AI Coding Assistant</li>
            <li>✅ 40+ Premium Lessons</li>
            <li>✅ Graphics & Game Development</li>
          </ul>
        </div>

        <div style={{
          display: 'flex',
          gap: '1rem',
          flexWrap: 'wrap',
          justifyContent: 'center',
          marginBottom: '1.5rem'
        }}>
          <a
            href="https://juniorcodelab.com/Subscribe"
            style={{
              background: 'white',
              color: '#f5576c',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none',
              boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 6px 20px rgba(0,0,0,0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.2)'
            }}
          >
            🚀 Subscribe Sekarang - RM95/Tahun
          </a>

          <a
            href="https://juniorcodelab.com"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '1rem 2rem',
              borderRadius: '12px',
              fontSize: '18px',
              fontWeight: 'bold',
              textDecoration: 'none',
              border: '2px solid white',
              transition: 'all 0.3s',
              display: 'inline-block'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.3)'
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
          >
            ← Kembali ke Dashboard
          </a>
        </div>

        {user && (
          <p style={{
            marginTop: '1rem',
            opacity: 0.8,
            fontSize: '14px'
          }}>
            Logged in sebagai: <strong>{user.email}</strong>
          </p>
        )}

        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: 'rgba(0, 0, 0, 0.2)',
          borderRadius: '8px',
          fontSize: '12px',
          maxWidth: '500px',
          width: '90%'
        }}>
          <p style={{ margin: 0, opacity: 0.9 }}>
            💡 <strong>Tip:</strong> Subscription status verified dari database.
            LocalStorage tidak boleh diubah untuk bypass security.
          </p>
        </div>
      </div>
    )
  }

  // AUTHORIZED STATE - User is subscribed, show playground
  console.log('✅ [ProtectedPlayground] Rendering playground for subscribed user')
  return children
}
