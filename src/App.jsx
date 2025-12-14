import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import ExerciseWorkspace from './pages/ExerciseWorkspace'
import CodingTerms from './pages/CodingTerms'
import SpellingWorkspace from './pages/SpellingWorkspace'
import SentenceWorkspace from './pages/SentenceWorkspace'
import StoryWorkspace from './pages/StoryWorkspace'

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
            path="/spelling/:id"
            element={
              <ProtectedRoute>
                <SpellingWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/sentence/:id"
            element={
              <ProtectedRoute>
                <SentenceWorkspace />
              </ProtectedRoute>
            }
          />
          <Route
            path="/story/:id"
            element={
              <ProtectedRoute>
                <StoryWorkspace />
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
