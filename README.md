# 🚀 JuniorCodeLab Playground (Phase 2)

Interactive coding playground untuk Junior Code Lab dengan visual block-based programming menggunakan Blockly.

---

## 📁 Project Structure

```
kodkids-playground/
├── src/
│   ├── lib/
│   │   ├── supabaseClient.js       # Supabase config (same as Phase 1)
│   │   └── codeExecutors.js        # Exercise execution logic
│   ├── contexts/
│   │   └── AuthContext.jsx         # Authentication with Supabase
│   ├── components/
│   │   └── ProtectedRoute.jsx      # Route protection
│   ├── pages/
│   │   ├── Dashboard.jsx           # Main dashboard
│   │   └── ExerciseWorkspace.jsx   # Exercise interface
│   ├── data/
│   │   └── exercises.js            # Exercise definitions
│   └── App.jsx                     # Main app with routing
├── .env.local                      # Environment variables
├── DEPLOYMENT_GUIDE.md             # Complete deployment guide
├── CREDENTIALS_SUMMARY.md          # Credentials flow documentation
└── README.md                       # This file
```

---

## 🔧 Tech Stack

- **React 18** - UI framework
- **Vite 6** - Build tool
- **Blockly 11** - Visual coding blocks
- **Supabase** - Authentication & database
- **React Router DOM 6** - Routing
- **Tailwind CSS 3** - Styling
- **Framer Motion** - Animations

---

## 🔐 Authentication

Phase 2 menggunakan **Supabase Authentication** dengan credentials yang sama seperti Phase 1:

- Token validation dengan Supabase Auth
- Cross-domain authentication via URL parameter
- Automatic session management
- Protected routes untuk semua pages

**Documentation:**
- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Full deployment guide
- [CREDENTIALS_SUMMARY.md](CREDENTIALS_SUMMARY.md) - Credentials flow

---

## 🎯 Features

### 11 Interactive Exercises:
1. 🍕 Pizza Maker
2. 🍔 Burger Builder
3. 🍦 Ice Cream Shop
4. ⛄ Snowman Builder
5. 🌸 Garden Creator
6. 🌈 Rainbow Painter
7. 🐠 Aquarium Designer
8. 🚀 Rocket Launch
9. 🎂 Cake Decorator
10. 🦋 Butterfly Garden
11. ⚡ Circuit Builder

### Exercise Features:
- Visual block-based programming (Blockly)
- Real-time code generation
- Live output canvas
- Step-by-step instructions
- Multiple difficulty levels

---

## 🚀 Quick Start

### Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev
```

### Build
```bash
# Build for production
npm run build

# Preview build
npm run preview
```

### Deploy
```bash
# Deploy to Netlify
netlify deploy --prod
```

---

## 🔗 Integration with Phase 1

Phase 1 passes authentication token via URL:

```javascript
// Phase 1: Redirect to Phase 2 with token
window.location.href = `https://playgroundjuniorcodelab.netlify.app?token=${session.access_token}`
```

Phase 2 validates token dengan Supabase and creates session.

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete flow.

---

## 📝 Environment Variables

Create `.env.local` (copy from `.env.example`):

```bash
cp .env.example .env.local
```

Then add your credentials:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

**Security Notes:**
- ✅ `.env.local` is in `.gitignore` (not committed)
- ✅ Use same credentials as Phase 1
- ✅ Never commit `.env.local` to git
- ✅ For Netlify deployment, add env vars in Netlify dashboard

---

## 🧪 Testing

### Manual Testing:
1. Clear browser cache
2. Login to Phase 1 (juniorcodelab.com)
3. Click "Playground" button
4. Should redirect to Phase 2 with authentication
5. Dashboard loads with user info

### Check Console Logs:
```
✅ Token found! Source: URL
🔐 Validating token with Supabase...
✅ Supabase session validated!
👤 User authenticated: {...}
✅ ProtectedRoute: AUTHENTICATED
```

---

## 📊 Status

- ✅ Authentication: Supabase (same as Phase 1)
- ✅ Token validation: Working
- ✅ Cross-domain auth: Working
- ✅ Protected routes: Working
- ✅ 11 exercises: Complete
- ✅ Production ready: YES

---

## 🔗 Links

- **Phase 1:** https://juniorcodelab.com
- **Phase 2:** https://playgroundjuniorcodelab.netlify.app
- **Supabase:** Configured in `.env.local` (not in git)

---

## 📚 Documentation

- [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) - Complete deployment & testing guide
- [CREDENTIALS_SUMMARY.md](CREDENTIALS_SUMMARY.md) - Credentials flow documentation

---

**Version:** 1.0.0
**Last Updated:** 2025-11-22
**Status:** Production Ready 🚀
