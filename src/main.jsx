import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

console.log('🚀 [MAIN] Application starting...')
console.log('🚀 [MAIN] Environment:', import.meta.env.MODE)
console.log('🚀 [MAIN] App URL:', import.meta.env.VITE_APP_URL)
console.log('🚀 [MAIN] Base URL:', import.meta.env.BASE_URL)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

console.log('✅ [MAIN] React app mounted')