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

              // Fetch profile with subscription status
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', verifiedUser.id)
                .single()

              if (profileError) {
                console.error('❌ Profile fetch failed:', profileError)
              } else {
                console.log('👤 Profile loaded:', profileData)
                setProfile(profileData)

                // Check subscription status
                if (profileData.subscription_status !== 'active') {
                  console.log('❌ User not subscribed')
                  alert('⚠️ Playground hanya untuk pengguna berbayar!\n\nAnda akan diredirect ke halaman subscribe.')
                  // Redirect back to Phase 1 subscribe page
                  window.location.href = 'https://kodkids.netlify.app/Subscribe'
                  return
                }
              }

              setUser(verifiedUser)

              // Clean URL (remove auth parameter for security)
              window.history.replaceState({}, document.title, window.location.pathname)
            }
          } catch (decodeError) {
            console.error('❌ Failed to decode auth data:', decodeError)
          }
        } else {
          // 2. Check existing session
          console.log('🔍 Checking existing session...')
          const { data: { session } } = await supabase.auth.getSession()

          if (session?.user) {
            console.log('✅ Found existing session:', session.user.email)
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
                console.log('❌ User not subscribed')
                alert('⚠️ Subscription anda telah tamat atau tidak aktif!\n\nAnda akan diredirect ke halaman subscribe.')
                window.location.href = 'https://kodkids.netlify.app/Subscribe'
                return
              }
            }
          } else {
            // No authentication found
            console.log('❌ No authentication found')
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
