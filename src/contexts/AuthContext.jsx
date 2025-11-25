import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [authChecked, setAuthChecked] = useState(false)

  useEffect(() => {
    // Initialize authentication from URL or localStorage
    const initAuth = async () => {
      try {
        // 1. Check URL parameter first (from Phase 1 redirect)
        const urlParams = new URLSearchParams(window.location.search)
        const authParam = urlParams.get('auth')

        if (authParam) {
          console.log('🔐 Found auth data in URL')

          try {
            // Decode auth data from URL
            const authData = JSON.parse(atob(authParam))
            console.log('📦 Decoded auth data:', authData)

            // Verify token with Supabase
            const { data: { user: verifiedUser }, error } = await supabase.auth.setSession({
              access_token: authData.access_token,
              refresh_token: authData.refresh_token
            })

            if (error) {
              console.error('❌ Token verification failed:', error)
              throw error
            }

            if (verifiedUser) {
              console.log('✅ User verified:', verifiedUser.email)

              // Set user first (non-blocking)
              setUser(verifiedUser)

              // Fetch profile with subscription status (with timeout)
              console.log('📡 Fetching profile from database...')

              const timeoutPromise = new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
              )

              const profilePromise = supabase
                .from('profiles')
                .select('*')
                .eq('id', verifiedUser.id)
                .single()

              const { data: profileData, error: profileError } = await Promise.race([
                profilePromise,
                timeoutPromise
              ]).catch(err => {
                console.error('❌ Profile fetch error:', err)
                return { data: null, error: err }
              })

              if (profileError) {
                console.error('❌ Profile fetch failed:', profileError)
                console.error('🔍 Error details:', {
                  message: profileError.message,
                  code: profileError.code,
                  details: profileError.details,
                  hint: profileError.hint
                })

                // IMPORTANT: Don't block if profile fetch fails
                // Set default profile with 'inactive' status
                console.warn('⚠️ Using fallback: subscription_status = inactive')
                setProfile({
                  id: verifiedUser.id,
                  email: verifiedUser.email,
                  subscription_status: 'inactive'
                })

                // Alert and redirect
                alert('⚠️ Tidak dapat verify subscription status.\n\nAnda akan diredirect ke halaman utama.')
                window.location.href = 'https://kodkids.netlify.app/Subscribe'
                return
              } else {
                console.log('✅ Profile loaded successfully:', profileData)
                setProfile(profileData)

                // Check subscription status
                if (profileData.subscription_status !== 'active') {
                  console.log('❌ User not subscribed. Status:', profileData.subscription_status)
                  alert('⚠️ Playground hanya untuk pengguna berbayar!\n\nAnda akan diredirect ke halaman subscribe.')
                  // Redirect back to Phase 1 subscribe page
                  window.location.href = 'https://kodkids.netlify.app/Subscribe'
                  return
                }

                console.log('✅ Subscription verified: ACTIVE')
              }

              // Clean URL (remove auth parameter for security)
              console.log('🧹 Cleaning URL...')
              window.history.replaceState({}, document.title, window.location.pathname)
            }
          } catch (decodeError) {
            console.error('❌ Failed to decode auth data:', decodeError)
            console.error('🔍 Decode error details:', {
              message: decodeError.message,
              stack: decodeError.stack
            })

            // Redirect to login if decode fails
            alert('⚠️ Invalid authentication data.\n\nSila login semula.')
            window.location.href = 'https://kodkids.netlify.app/Login'
            return
          }
        } else {
          // 2. Check existing session
          console.log('🔍 No auth param in URL. Checking existing session...')
          const { data: { session }, error: sessionError } = await supabase.auth.getSession()

          if (sessionError) {
            console.error('❌ Session error:', sessionError)
          }

          if (session?.user) {
            console.log('✅ Found existing session:', session.user.email)
            setUser(session.user)

            // Fetch profile with timeout
            console.log('📡 Fetching profile for existing session...')

            const timeoutPromise = new Promise((_, reject) =>
              setTimeout(() => reject(new Error('Profile fetch timeout')), 10000)
            )

            const profilePromise = supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            const { data: profileData, error: profileError } = await Promise.race([
              profilePromise,
              timeoutPromise
            ]).catch(err => {
              console.error('❌ Profile fetch error:', err)
              return { data: null, error: err }
            })

            if (profileError) {
              console.error('❌ Profile fetch failed:', profileError)
              console.error('🔍 Error details:', {
                message: profileError.message,
                code: profileError.code,
                details: profileError.details,
                hint: profileError.hint
              })

              // Redirect if cannot fetch profile
              alert('⚠️ Tidak dapat verify subscription.\n\nSila login semula.')
              window.location.href = 'https://kodkids.netlify.app/Subscribe'
              return
            }

            if (profileData) {
              console.log('✅ Profile loaded:', profileData)
              setProfile(profileData)

              // Check subscription
              if (profileData.subscription_status !== 'active') {
                console.log('❌ User not subscribed. Status:', profileData.subscription_status)
                alert('⚠️ Subscription anda telah tamat atau tidak aktif!\n\nAnda akan diredirect ke halaman subscribe.')
                window.location.href = 'https://kodkids.netlify.app/Subscribe'
                return
              }

              console.log('✅ Subscription verified: ACTIVE')
            }
          } else {
            // No authentication found
            console.log('❌ No authentication found (no session, no auth param)')
            alert('⚠️ Anda perlu login terlebih dahulu!\n\nAnda akan diredirect ke halaman login.')
            window.location.href = 'https://kodkids.netlify.app/Login'
            return
          }
        }
      } catch (error) {
        console.error('❌ Auth initialization error:', error)
        alert('⚠️ Masalah authentication! Sila login semula.')
        window.location.href = 'https://kodkids.netlify.app/Login'
      } finally {
        setLoading(false)
        setAuthChecked(true)
      }
    }

    initAuth()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔄 Auth state changed:', event)

        if (event === 'SIGNED_OUT') {
          setUser(null)
          setProfile(null)
          window.location.href = 'https://kodkids.netlify.app/Login'
        } else if (session?.user) {
          setUser(session.user)

          // Fetch profile
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', session.user.id)
            .single()

          if (profileData) {
            setProfile(profileData)

            // Check subscription
            if (profileData.subscription_status !== 'active') {
              alert('⚠️ Subscription anda tidak aktif!')
              window.location.href = 'https://kodkids.netlify.app/Subscribe'
            }
          }
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const value = {
    user,
    profile,
    loading,
    authChecked,
    isSubscribed: profile?.subscription_status === 'active'
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && authChecked && children}
    </AuthContext.Provider>
  )
}
