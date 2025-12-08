# Quick Deployment Checklist

## ✅ Pre-Deployment

- [ ] MongoDB Atlas cluster created
- [ ] Database user created with password
- [ ] Network access set to `0.0.0.0/0`
- [ ] Connection string copied
- [ ] GitHub repository created
- [ ] Vercel account created

## 🚀 Deploy in 5 Minutes

### 1. Push to GitHub
```bash
cd "d:\MCA\Sem 1\Web Designing\Eventra Project"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/eventra.git
git push -u origin main
```

### 2. Deploy Backend
1. Go to vercel.com → New Project
2. Import your repo
3. Root Directory: `backend`
4. Add env vars:
   - `MONGODB_URI`: `mongodb+srv://user:pass@cluster.mongodb.net/eventra`
   - `JWT_SECRET`: `MyStrongKey1234`
   - `NODE_ENV`: `production`
5. Deploy → Copy URL

### 3. Deploy Frontend
1. Vercel → New Project
2. Same repo
3. Root Directory: `frontend`
4. Add env var:
   - `REACT_APP_API_URL`: `https://your-backend.vercel.app/api`
5. Deploy

### 4. Update Backend CORS
Add to backend `.env` on Vercel:
- `FRONTEND_URL`: `https://your-frontend.vercel.app`

Redeploy backend.

### 5. Test
- Visit your frontend URL
- Register a student account
- Login and test features

## 🎉 Done!

Your app is live at:
- Frontend: `https://your-frontend.vercel.app`
- Backend: `https://your-backend.vercel.app`

## 📝 Default Admin Login
After seeding:
- Email: `admin@eventra.com`
- Password: `Admin@123`
