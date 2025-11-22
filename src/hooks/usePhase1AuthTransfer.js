

import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export function usePhase1AuthTransfer() {
  const [isAuthInitialized, setIsAuthInitialized] = useState(false)
  const [authError, setAuthError] = useState(null)

  useEffect(() => {
    const handlePhase1Auth = async () => {
      try {
        console.log('🔍 [Phase2] Checking for Phase 1 auth transfer...')

        // Check if there's existing session first
        const { data: { session: existingSession } } = await supabase.auth.getSession()

        if (existingSession) {
          console.log('✅ [Phase2] Existing session found, no need to transfer')
          console.log('👤 [Phase2] User:', existingSession.user.email)
          setIsAuthInitialized(true)
          return
        }

        // Get URL parameters
        const urlParams = new URLSearchParams(window.location.search)
        const authParam = urlParams.get('auth')

        if (!authParam) {
          console.log('ℹ️ [Phase2] No auth parameter found in URL')
          setIsAuthInitialized(true)
          return
        }

        console.log('🔐 [Phase2] Auth parameter found! Processing...')
        console.log('📏 [Phase2] Auth param length:', authParam.length)

        // Decode the base64 auth data
        let authData
        try {
          const decodedString = atob(authParam)
          authData = JSON.parse(decodedString)
          console.log('📦 [Phase2] Decoded auth data:', {
            user_email: authData.user_email,
            user_id: authData.user_id,
            subscription_status: authData.subscription_status,
            expires_at: authData.expires_at,
            expires_in: authData.expires_at ? Math.round((authData.expires_at - Date.now() / 1000) / 60) + ' minutes' : 'unknown',
            has_access_token: !!authData.access_token,
            has_refresh_token: !!authData.refresh_token
          })
        } catch (decodeError) {
          console.error('❌ [Phase2] Failed to decode auth parameter:', decodeError)
          setAuthError('Invalid authentication data format')
          setIsAuthInitialized(true)
          return
        }

        // Validate required fields
        if (!authData.access_token || !authData.refresh_token) {
          console.error('❌ [Phase2] Missing required tokens in auth data')
          setAuthError('Incomplete authentication data')
          setIsAuthInitialized(true)
          return
        }

        // Check if token is expired
        if (authData.expires_at && authData.expires_at < Date.now() / 1000) {
          console.warn('⚠️ [Phase2] Access token has expired, will attempt refresh...')
        }

        // Set the session in Phase 2's Supabase client
        console.log('🔄 [Phase2] Setting Supabase session...')
        const { data, error } = await supabase.auth.setSession({
          access_token: authData.access_token,
          refresh_token: authData.refresh_token
        })

        if (error) {
          console.error('❌ [Phase2] Failed to set session:', error)
          setAuthError(error.message)

          // If token expired, try to use refresh token
          if (error.message.includes('expired') && authData.refresh_token) {
            console.log('🔄 [Phase2] Attempting to refresh session...')
            const { data: refreshData, error: refreshError } = await supabase.auth.refreshSession({
              refresh_token: authData.refresh_token
            })

            if (refreshError) {
              console.error('❌ [Phase2] Failed to refresh session:', refreshError)
              setAuthError('Session expired. Please login again from Phase 1.')
            } else {
              console.log('✅ [Phase2] Session refreshed successfully!')
              console.log('👤 [Phase2] User:', refreshData.user?.email)

              // Store additional user data in localStorage for easy access
              localStorage.setItem('kodkids_user_email', authData.user_email)
              localStorage.setItem('kodkids_user_id', authData.user_id)
              localStorage.setItem('kodkids_subscription_status', authData.subscription_status)

              setAuthError(null)
            }
          }
        } else {
          console.log('✅ [Phase2] Session set successfully!')
          console.log('👤 [Phase2] User:', data.user?.email)
          console.log('🔑 [Phase2] Session expires at:', new Date(data.session.expires_at * 1000).toLocaleString())

          // Store additional user data in localStorage
          localStorage.setItem('kodkids_user_email', authData.user_email)
          localStorage.setItem('kodkids_user_id', authData.user_id)
          localStorage.setItem('kodkids_subscription_status', authData.subscription_status)
        }

        // Clean up URL by removing auth parameter (security best practice)
        console.log('🧹 [Phase2] Cleaning up URL...')
        const newUrl = window.location.pathname + window.location.hash
        window.history.replaceState({}, document.title, newUrl)
        console.log('✨ [Phase2] URL cleaned')

      } catch (error) {
        console.error('❌ [Phase2] Unexpected error during auth transfer:', error)
        setAuthError('Authentication transfer failed: ' + error.message)
      } finally {
        setIsAuthInitialized(true)
      }
    }

    handlePhase1Auth()
  }, []) // Run once on mount

  return { isAuthInitialized, authError }
}
