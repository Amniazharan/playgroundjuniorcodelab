import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { usePhase1AuthTransfer } from './hooks/usePhase1AuthTransfer'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedPlayground from './components/ProtectedPlayground'
import Dashboard from './pages/Dashboard'
import ExerciseWorkspace from './pages/ExerciseWorkspace'

function AppContent() {
  // CRITICAL: Initialize Phase 1 auth transfer BEFORE rendering routes
  const { isAuthInitialized, authError } = usePhase1AuthTransfer()

  // Show loading while auth is being initialized
  if (!isAuthInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
          <p className="mt-4 text-gray-600">Initializing authentication...</p>
        </div>
      </div>
    )
  }

  // Show error if auth transfer failed
  if (authError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="text-6xl mb-4">⚠️</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Authentication Error
          </h1>
          <p className="text-gray-600 mb-6">
            {authError}
          </p>
          <a
            href="https://juniorcodelab.com"
            className="inline-block bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
          >
            Return to Phase 1
          </a>
        </div>
      </div>
    )
  }

  // Render app normally after auth is initialized
  // CRITICAL: Double layer protection
  // 1. ProtectedRoute - checks authentication (session exists)
  // 2. ProtectedPlayground - checks subscription from DATABASE
  return (
    <ProtectedPlayground>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/exercise/:id"
          element={
            <ProtectedRoute>
              <ExerciseWorkspace />
            </ProtectedRoute>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </ProtectedPlayground>
  )
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App