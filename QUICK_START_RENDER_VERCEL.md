# 🚀 Quick Start: Deploy in 10 Minutes

## Prerequisites
- GitHub account
- MongoDB Atlas account (free)
- Render account (free)
- Vercel account (free)

---

## Step-by-Step

### 1️⃣ MongoDB Atlas (2 min)
```
1. mongodb.com/cloud/atlas → Sign up
2. Create free cluster
3. Database Access → Create user (save password!)
4. Network Access → Add 0.0.0.0/0
5. Connect → Copy connection string
```

### 2️⃣ Push to GitHub (1 min)
```bash
cd "d:\MCA\Sem 1\Web Designing\Eventra Project"
git init
git add .
git commit -m "Deploy"
git remote add origin https://github.com/YOUR_USERNAME/eventra.git
git push -u origin main
```

### 3️⃣ Deploy Backend - Render (3 min)
```
1. render.com → Sign up with GitHub
2. New + → Web Service
3. Connect your repo
4. Settings:
   - Root Directory: backend
   - Build: npm install
   - Start: npm start
5. Environment Variables:
   - MONGODB_URI: (paste your Atlas string)
   - JWT_SECRET: MyStrongKey1234
   - NODE_ENV: production
6. Create Web Service
7. Copy URL: https://eventra-backend.onrender.com
```

### 4️⃣ Deploy Frontend - Vercel (2 min)
```
1. vercel.com → Sign up with GitHub
2. New Project → Import your repo
3. Settings:
   - Root Directory: frontend
   - Framework: Create React App
4. Environment Variable:
   - REACT_APP_API_URL: https://eventra-backend.onrender.com/api
5. Deploy
6. Copy URL: https://eventra.vercel.app
```

### 5️⃣ Update Backend CORS (1 min)
```
1. Render → Your backend → Environment
2. Add variable:
   - FRONTEND_URL: https://eventra.vercel.app
3. Save (auto-redeploys)
```

### 6️⃣ Test (1 min)
```
1. Visit your Vercel URL
2. Register a student account
3. Login and test
```

---

## 🎉 Done!

**Your URLs:**
- Frontend: `https://eventra.vercel.app`
- Backend: `https://eventra-backend.onrender.com`

**Admin Login:**
- Email: `admin@eventra.com`
- Password: `Admin@123`

---

## ⚠️ Important Notes

1. **Render Free Tier**: Backend sleeps after 15 min
   - First request takes 30-60 seconds
   
2. **Auto-Deploy**: Push to GitHub = auto-deploy both services

3. **Logs**: 
   - Render: Dashboard → Logs
   - Vercel: Dashboard → Deployments → Function Logs

---

## 🔧 Quick Fixes

**CORS Error?**
→ Add `FRONTEND_URL` to Render backend env vars

**Backend Slow?**
→ Normal for free tier (wakes up in 30-60s)

**Can't Login?**
→ Check `REACT_APP_API_URL` ends with `/api`

**Database Error?**
→ Verify MongoDB Atlas IP whitelist: `0.0.0.0/0`
