import { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const initAuth = async () => {
      try {
        console.log('🔍 [AuthContext] Memulakan inisialisasi pengesahan...')

        // Semak parameter URL terlebih dahulu
        const urlParams = new URLSearchParams(window.location.search)
        const authParam = urlParams.get('auth')

        if (authParam) {
          console.log('🔐 [AuthContext] Parameter auth dijumpai dalam URL')

          try {
            const authData = JSON.parse(atob(authParam))
            console.log('📦 [AuthContext] Data auth dinyahkod:', {
              email: authData.user_email,
              hasToken: !!authData.access_token
            })

            // Tetapkan session
            console.log('🔄 [AuthContext] Menetapkan session...')
            const { data: sessionData, error: sessionError } = await supabase.auth.setSession({
              access_token: authData.access_token,
              refresh_token: authData.refresh_token
            })

            console.log('📦 [AuthContext] Hasil session:', {
              hasUser: !!sessionData?.user,
              hasError: !!sessionError
            })

            if (sessionError) {
              console.error('❌ [AuthContext] Ralat session:', sessionError)
              setError('Gagal mengesahkan session')
              setLoading(false)
              return
            }

            const verifiedUser = sessionData?.user
            console.log('👤 [AuthContext] Pengguna disahkan:', verifiedUser?.email)

            if (verifiedUser) {
              console.log('✅ [AuthContext] Pengguna berjaya disahkan:', verifiedUser.email)
              setUser(verifiedUser)

              // Ambil profile
              console.log('📡 [AuthContext] Mengambil profile dari database...')
              console.log('🔑 [AuthContext] ID Pengguna:', verifiedUser.id)

              try {
                const { data: profileData, error: profileError } = await supabase
                  .from('profiles')
                  .select('*')
                  .eq('id', verifiedUser.id)
                  .single()

                console.log('📦 [AuthContext] Hasil pengambilan profile:', {
                  hasData: !!profileData,
                  hasError: !!profileError
                })

                if (profileError) {
                  console.error('❌ [AuthContext] Ralat profile:', profileError)
                  console.error('📋 [AuthContext] Butiran ralat:', {
                    message: profileError.message,
                    code: profileError.code,
                    hint: profileError.hint
                  })
                  setError(`Ralat profile: ${profileError.message}`)
                } else {
                  console.log('✅ [AuthContext] Profile berjaya dimuatkan!')
                  console.log('📊 [AuthContext] Data profile:', {
                    email: profileData.email,
                    subscription_status: profileData.subscription_status
                  })
                  setProfile(profileData)
                }
              } catch (fetchError) {
                console.error('❌ [AuthContext] Pengecualian pengambilan profile:', fetchError)
                setError(`Pengambilan profile gagal: ${fetchError.message}`)
              }

              // Bersihkan URL
              console.log('🧹 [AuthContext] Membersihkan URL...')
              window.history.replaceState({}, document.title, window.location.pathname)
              console.log('✨ [AuthContext] URL telah dibersihkan')
            }
          } catch (decodeError) {
            console.error('❌ [AuthContext] Ralat penyahkodan:', decodeError)
            setError('Data auth tidak sah')
          }
        } else {
          // Semak session sedia ada
          console.log('🔍 [AuthContext] Memeriksa session sedia ada...')
          const { data: { session } } = await supabase.auth.getSession()

          if (session?.user) {
            console.log('✅ [AuthContext] Session dijumpai:', session.user.email)
            setUser(session.user)

            // Ambil profile
            const { data: profileData, error: profileError } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', session.user.id)
              .single()

            if (profileError) {
              console.error('❌ [AuthContext] Ralat profile:', profileError)
              setError(`Ralat profile: ${profileError.message}`)
            } else {
              console.log('✅ [AuthContext] Profile dimuatkan')
              setProfile(profileData)
            }
          } else {
            console.log('ℹ️ [AuthContext] Tiada session dijumpai')
            setError('Tiada pengesahan dijumpai')
          }
        }
      } catch (error) {
        console.error('❌ [AuthContext] Ralat inisialisasi:', error)
        setError(error.message)
      } finally {
        console.log('🏁 [AuthContext] Menetapkan loading = false')
        setLoading(false)
        console.log('✅ [AuthContext] Inisialisasi pengesahan selesai!')
      }
    }

    initAuth()

    // Dengar perubahan auth (tetapi abaikan semasa muatan awal)
    let isInitialLoad = true
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('🔄 [AuthContext] Event auth:', event, '(awal:', isInitialLoad, ')')

      // Langkau pengendalian semasa setup auth awal
      if (isInitialLoad && event === 'SIGNED_IN') {
        console.log('⏭️ [AuthContext] Melangkau SIGNED_IN semasa muatan awal')
        isInitialLoad = false
        return
      }

      if (event === 'SIGNED_OUT') {
        console.log('🚪 [AuthContext] Pengguna telah log keluar')
        setUser(null)
        setProfile(null)
      } else if (event === 'TOKEN_REFRESHED' && session?.user) {
        console.log('🔄 [AuthContext] Token telah diperbaharui')
        setUser(session.user)

        const { data: profileData } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single()

        if (profileData) {
          setProfile(profileData)
        }
      }
    })

    return () => subscription.unsubscribe()
  }, [])

  const logout = async () => {
    try {
      console.log('🚪 [AuthContext] Sedang log keluar...')
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      setError(null)
      console.log('✅ [AuthContext] Berjaya log keluar')
      window.location.href = 'https://juniorcodelab.com/Login'
    } catch (error) {
      console.error('❌ [AuthContext] Ralat log keluar:', error)
    }
  }

  const value = {
    user,
    profile,
    loading,
    error,
    logout,
    isAuthenticated: !!user,
    isSubscribed: profile?.subscription_status === 'active'
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
