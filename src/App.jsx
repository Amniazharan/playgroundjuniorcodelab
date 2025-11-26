import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import ExerciseWorkspace from './pages/ExerciseWorkspace'
import CodingTerms from './pages/CodingTerms'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
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
          <Route
            path="/coding-terms"
            element={
              <ProtectedRoute>
                <CodingTerms />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
