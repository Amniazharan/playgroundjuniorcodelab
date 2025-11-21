# 🔗 Phase 1 & Phase 2 Integration Guide

## Overview

Phase 2 (Playground) sekarang protected dengan authentication. Users perlu login di Phase 1 sebelum boleh access playground.

---

## 🔐 Authentication Flow

```
Phase 1 (juniorcodelab.com)
  ↓ User logs in
  ↓ Gets JWT token
  ↓ Clicks "Playground" link
  ↓
Phase 2 (playground.juniorcodelab.com)
  ↓ Checks for token
  ↓ If valid → Allow access ✅
  ↓ If invalid → Redirect to login ❌
```

---

## 📦 Phase 1 Implementation (Add to your main site)

### 1. Add Playground Link/Button

#### Option A: In Navigation Menu
```jsx
// Example: In your Header/Navigation component
<nav>
  <a href="/">Home</a>
  <a href="/courses">Courses</a>
  <a href="/about">About</a>

  {/* Add this */}
  {isLoggedIn && (
    <a
      href={`https://playground.juniorcodelab.com?token=${userToken}`}
      className="playground-link"
    >
      🎮 Playground
    </a>
  )}
</nav>
```

#### Option B: As Button in Dashboard
```jsx
// Example: In student dashboard
<div className="dashboard">
  <h1>Welcome, {user.name}!</h1>

  {/* Add this */}
  <button
    onClick={() => {
      const token = localStorage.getItem('juniorcodelab_token')
      window.open(`https://playground.juniorcodelab.com?token=${token}`, '_blank')
    }}
    className="playground-button"
  >
    🎮 Open Playground
  </button>
</div>
```

#### Option C: As Card/Feature Box
```jsx
// Example: In courses page
<div className="features-grid">
  <div className="feature-card">
    <h3>📚 Video Lessons</h3>
    <p>Learn coding basics</p>
  </div>

  {/* Add this */}
  <div className="feature-card">
    <h3>🎮 Interactive Playground</h3>
    <p>Practice with visual coding blocks</p>
    <a
      href={`https://playground.juniorcodelab.com?token=${userToken}`}
      className="btn-primary"
    >
      Start Coding
    </a>
  </div>
</div>
```

---

## 🔑 Token Handling

### Method 1: URL Parameter (Recommended for cross-domain)

**Phase 1 sends token in URL:**
```javascript
// In Phase 1
const openPlayground = () => {
  const token = localStorage.getItem('juniorcodelab_token')
  const playgroundUrl = `https://playground.juniorcodelab.com?token=${token}`
  window.open(playgroundUrl, '_blank')
}
```

**Phase 2 receives & stores:**
```javascript
// Already implemented in AuthContext.jsx
// Automatically reads token from URL → saves to localStorage → cleans URL
```

### Method 2: localStorage (Same domain only)

If both sites on same domain (e.g., subdomain):
```javascript
// Phase 1: Just navigate
window.location.href = 'https://playground.juniorcodelab.com'

// Phase 2: Reads from localStorage automatically
// (Already implemented in AuthContext.jsx)
```

---

## 🛡️ Token Structure

Phase 2 expects JWT token dengan structure:

```javascript
{
  "userId": "user123",        // or "sub"
  "name": "Ahmad Bin Ali",
  "email": "ahmad@example.com",
  "iat": 1234567890,
  "exp": 1234567890
}
```

**Generate token in Phase 1:**
```javascript
// Example using jsonwebtoken library
const jwt = require('jsonwebtoken')

const token = jwt.sign(
  {
    userId: user.id,
    name: user.name,
    email: user.email
  },
  process.env.JWT_SECRET,
  { expiresIn: '7d' }
)
```

---

## 📝 Phase 1 Code Examples

### Full Integration Example (React)

```jsx
// components/PlaygroundButton.jsx
import { useState } from 'react'

export default function PlaygroundButton() {
  const [isLoading, setIsLoading] = useState(false)

  const openPlayground = () => {
    setIsLoading(true)

    try {
      // Get token from your auth system
      const token = localStorage.getItem('juniorcodelab_token')

      if (!token) {
        alert('Please login first')
        return
      }

      // Open playground with token
      const playgroundUrl = `https://playground.juniorcodelab.com?token=${token}`

      // Open in new tab
      window.open(playgroundUrl, '_blank')

      // Or same window:
      // window.location.href = playgroundUrl
    } catch (error) {
      console.error('Failed to open playground:', error)
      alert('Failed to open playground. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      onClick={openPlayground}
      disabled={isLoading}
      className="playground-button"
    >
      {isLoading ? 'Opening...' : '🎮 Open Playground'}
    </button>
  )
}
```

### With Authentication Check

```jsx
// components/PlaygroundLink.jsx
import { useAuth } from '../contexts/AuthContext'

export default function PlaygroundLink() {
  const { user, token, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <div className="playground-locked">
        <p>🔒 Login to access Playground</p>
        <a href="/login">Login Now</a>
      </div>
    )
  }

  return (
    <a
      href={`https://playground.juniorcodelab.com?token=${token}`}
      target="_blank"
      rel="noopener noreferrer"
      className="playground-link"
    >
      🎮 Go to Playground
    </a>
  )
}
```

---

## 🎨 Styling Examples

### Tailwind CSS
```jsx
<a
  href={`https://playground.juniorcodelab.com?token=${token}`}
  className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-500 to-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:shadow-lg transition-all"
>
  <span>🎮</span>
  <span>Open Playground</span>
</a>
```

### Regular CSS
```css
.playground-button {
  background: linear-gradient(to right, #f97316, #0ea5e9);
  color: white;
  padding: 12px 24px;
  border-radius: 8px;
  font-weight: 600;
  border: none;
  cursor: pointer;
  transition: all 0.3s;
}

.playground-button:hover {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
  transform: translateY(-2px);
}
```

---

## 🔄 Return to Phase 1

When user clicks "Logout" in Phase 2, they're redirected back to Phase 1:

```javascript
// Already implemented in AuthContext.jsx logout()
logout: () => {
  // Clear tokens
  localStorage.removeItem('juniorcodelab_token')
  localStorage.removeItem('juniorcodelab_user')

  // Redirect to Phase 1
  window.location.href = 'https://juniorcodelab.com'
}
```

**Optional: Add return URL**
```javascript
window.location.href = 'https://juniorcodelab.com/dashboard'
```

---

## 🧪 Testing Integration

### Test Scenario 1: Logged In User
1. Login di Phase 1
2. Click "Playground" button
3. ✅ Should open playground with token
4. ✅ Playground loads dashboard
5. ✅ User name appears in header

### Test Scenario 2: Not Logged In
1. Try access `playground.juniorcodelab.com` directly
2. ✅ Should redirect to Phase 1 login
3. ✅ Shows "Authentication Required" message

### Test Scenario 3: Token Expired
1. Login with old/expired token
2. ✅ Should redirect to Phase 1 login
3. ✅ User prompted to login again

### Test Scenario 4: Logout Flow
1. Click "Logout" in Phase 2
2. ✅ Cleared from localStorage
3. ✅ Redirected to Phase 1
4. ✅ Cannot access playground without re-login

---

## 🔧 Troubleshooting

### Issue: Token not passing to Phase 2
**Check:**
- Token exists in localStorage: `localStorage.getItem('juniorcodelab_token')`
- URL constructed correctly: Check browser console
- CORS settings if applicable

**Solution:**
```javascript
// In Phase 1, add console log
const token = localStorage.getItem('juniorcodelab_token')
console.log('Token:', token ? 'exists' : 'missing')
console.log('Playground URL:', `https://playground.juniorcodelab.com?token=${token}`)
```

### Issue: Redirect loop
**Cause:** Token invalid or not recognized

**Check in Phase 2 console:**
```javascript
// Should see these logs in AuthContext
console.log('Stored token:', localStorage.getItem('juniorcodelab_token'))
console.log('URL token:', new URLSearchParams(window.location.search).get('token'))
```

### Issue: User data not showing
**Check token payload:**
```javascript
// In browser console (Phase 2)
const token = localStorage.getItem('juniorcodelab_token')
const payload = JSON.parse(atob(token.split('.')[1]))
console.log('Token payload:', payload)
```

**Expected:**
```json
{
  "userId": "...",
  "name": "...",
  "email": "..."
}
```

---

## 🚀 Deployment Checklist

**Phase 1 (Main Site):**
- [ ] Add Playground button/link
- [ ] Pass token in URL or localStorage
- [ ] Test button works for logged-in users
- [ ] Hide button for non-logged-in users
- [ ] Update navigation/dashboard

**Phase 2 (Playground):**
- [x] Authentication context implemented
- [x] Protected routes setup
- [x] Token validation working
- [x] Logout redirects to Phase 1
- [ ] Deploy updated build
- [ ] Test authentication flow

**Testing:**
- [ ] Test login flow
- [ ] Test playground access
- [ ] Test logout
- [ ] Test expired token handling
- [ ] Test cross-browser compatibility

---

## 📋 Quick Integration Checklist

Copy paste this into Phase 1:

```jsx
// 1. Import/Get token
const token = localStorage.getItem('juniorcodelab_token')

// 2. Add button/link (choose one approach)
<a href={`https://playground.juniorcodelab.com?token=${token}`}>
  🎮 Playground
</a>

// Done! Phase 2 handles the rest.
```

---

## 🎯 Example: Complete Integration

```jsx
// Phase 1: components/Dashboard.jsx
import { useAuth } from '../contexts/AuthContext'

export default function StudentDashboard() {
  const { user, token } = useAuth()

  return (
    <div className="dashboard">
      <h1>Welcome, {user.name}!</h1>

      <div className="dashboard-cards">
        {/* Existing cards */}
        <div className="card">
          <h3>📚 My Courses</h3>
          <a href="/courses">View Courses</a>
        </div>

        <div className="card">
          <h3>📊 Progress</h3>
          <a href="/progress">View Progress</a>
        </div>

        {/* NEW: Playground Card */}
        <div className="card playground-card">
          <div className="card-icon">🎮</div>
          <h3>Interactive Playground</h3>
          <p>Practice coding with visual blocks</p>
          <a
            href={`https://playground.juniorcodelab.com?token=${token}`}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            Start Coding →
          </a>
        </div>
      </div>
    </div>
  )
}
```

---

## 🔗 URLs

- **Phase 1 (Main Site):** https://juniorcodelab.com
- **Phase 2 (Playground):** https://playground.juniorcodelab.com
- **Login with redirect:** `https://juniorcodelab.com/login?redirect=https://playground.juniorcodelab.com`

---

## 📞 Support

**Questions?**
- Check browser console for errors
- Verify token exists in localStorage
- Test with valid JWT token
- Ensure deployment successful

**Integration working when:**
- ✅ Logged-in users can access playground
- ✅ Non-logged-in users redirected to login
- ✅ User name shows in playground header
- ✅ Logout returns to Phase 1

---

**Status:** ✅ Phase 2 Authentication READY
**Next:** Add Playground link to Phase 1
