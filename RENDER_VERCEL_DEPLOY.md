# Deploy EVENTRA: Backend on Render + Frontend on Vercel

## 🎯 Overview
- **Backend**: Render (Free tier with persistent server)
- **Frontend**: Vercel (Free tier with CDN)
- **Database**: MongoDB Atlas (Free tier)

---

## Step 1: Setup MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a **free cluster**
3. **Database Access** → Create user:
   - Username: `eventra_user`
   - Password: (generate strong password)
4. **Network Access** → Add IP: `0.0.0.0/0` (allow from anywhere)
5. **Database** → Connect → **Connect your application**
6. Copy connection string:
   ```
   mongodb+srv://eventra_user:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/eventra?retryWrites=true&w=majority
   ```

---

## Step 2: Push Code to GitHub

```bash
cd "d:\MCA\Sem 1\Web Designing\Eventra Project"
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/eventra.git
git push -u origin main
```

---

## Step 3: Deploy Backend to Render

### 3.1 Create Render Account
- Go to [render.com](https://render.com)
- Sign up with GitHub

### 3.2 Create Web Service
1. Click **New +** → **Web Service**
2. Connect your GitHub repository
3. Configure:
   - **Name**: `eventra-backend`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### 3.3 Add Environment Variables
Click **Environment** → Add:

| Key | Value |
|-----|-------|
| `MONGODB_URI` | Your MongoDB Atlas connection string |
| `JWT_SECRET` | `MyStrongKey1234` (or generate secure random string) |
| `NODE_ENV` | `production` |
| `PORT` | `5000` |

### 3.4 Deploy
- Click **Create Web Service**
- Wait 5-10 minutes for deployment
- Copy your backend URL: `https://eventra-backend.onrender.com`

**Important**: Free tier sleeps after 15 min of inactivity. First request may take 30-60 seconds.

---

## Step 4: Deploy Frontend to Vercel

### 4.1 Create Vercel Account
- Go to [vercel.com](https://vercel.com)
- Sign up with GitHub

### 4.2 Import Project
1. Click **Add New** → **Project**
2. Import your GitHub repository
3. Configure:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`

### 4.3 Add Environment Variable
Click **Environment Variables** → Add:

| Key | Value |
|-----|-------|
| `REACT_APP_API_URL` | `https://eventra-backend.onrender.com/api` |

**Note**: Replace with your actual Render backend URL

### 4.4 Deploy
- Click **Deploy**
- Wait 2-3 minutes
- Your frontend URL: `https://eventra-frontend.vercel.app`

---

## Step 5: Update Backend CORS

### 5.1 Add Frontend URL to Render
1. Go to Render dashboard → Your backend service
2. **Environment** → Add variable:
   - Key: `FRONTEND_URL`
   - Value: `https://eventra-frontend.vercel.app`
3. Click **Save Changes** (auto-redeploys)

---

## Step 6: Seed Database (Optional)

Run locally pointing to production database:

```bash
cd backend

# Temporarily update .env with production MongoDB URI
# Then run:
npm run seed

# Revert .env back to local settings
```

---

## Step 7: Test Your Deployment

1. Visit your frontend URL: `https://eventra-frontend.vercel.app`
2. Click **Register** → Create student account
3. Login and test features
4. Try admin login:
   - Email: `admin@eventra.com`
   - Password: `Admin@123`

---

## 🔧 Troubleshooting

### Backend Issues

**Problem**: "Application failed to respond"
- Check Render logs: Dashboard → Your service → Logs
- Verify MongoDB connection string is correct
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`

**Problem**: Backend is slow on first request
- Normal for Render free tier (server sleeps after 15 min)
- Consider upgrading to paid tier for always-on server

### Frontend Issues

**Problem**: "Network Error" or CORS errors
- Verify `REACT_APP_API_URL` in Vercel environment variables
- Check it ends with `/api`
- Ensure `FRONTEND_URL` is set in Render backend

**Problem**: Changes not reflecting
- Vercel: Redeploy from dashboard
- Clear browser cache (Ctrl+Shift+R)

### Database Issues

**Problem**: "MongoServerError: bad auth"
- Check username/password in connection string
- Verify database user exists in MongoDB Atlas

**Problem**: Connection timeout
- Ensure Network Access allows `0.0.0.0/0`
- Check connection string format

---

## 📊 Service URLs

After deployment, save these URLs:

- **Frontend**: `https://your-app.vercel.app`
- **Backend**: `https://your-backend.onrender.com`
- **Database**: MongoDB Atlas cluster

---

## 🔐 Environment Variables Summary

### Render (Backend)
```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/eventra
JWT_SECRET=MyStrongKey1234
NODE_ENV=production
PORT=5000
FRONTEND_URL=https://your-frontend.vercel.app
```

### Vercel (Frontend)
```
REACT_APP_API_URL=https://your-backend.onrender.com/api
```

---

## 💡 Tips

1. **Render Free Tier**: Server sleeps after 15 min inactivity
   - First request takes 30-60 seconds to wake up
   - Consider using a uptime monitor (like UptimeRobot) to keep it awake

2. **Vercel**: Instant deployments on every git push
   - Auto-deploys when you push to GitHub
   - Preview deployments for pull requests

3. **MongoDB Atlas**: 512MB free storage
   - Monitor usage in Atlas dashboard
   - Set up alerts for storage limits

4. **Custom Domains**: Both Render and Vercel support custom domains
   - Render: Dashboard → Settings → Custom Domain
   - Vercel: Dashboard → Settings → Domains

---

## 🚀 Auto-Deployment

Both services auto-deploy on git push:

```bash
# Make changes
git add .
git commit -m "Update feature"
git push origin main

# Render and Vercel will auto-deploy
```

---

## 📞 Support

- **Render Docs**: [render.com/docs](https://render.com/docs)
- **Vercel Docs**: [vercel.com/docs](https://vercel.com/docs)
- **MongoDB Atlas**: [docs.atlas.mongodb.com](https://docs.atlas.mongodb.com)

---

## ✅ Deployment Checklist

- [ ] MongoDB Atlas cluster created
- [ ] Database user created
- [ ] Network access configured (`0.0.0.0/0`)
- [ ] Code pushed to GitHub
- [ ] Backend deployed to Render
- [ ] Backend environment variables set
- [ ] Backend URL copied
- [ ] Frontend deployed to Vercel
- [ ] Frontend environment variable set (`REACT_APP_API_URL`)
- [ ] Backend CORS updated with frontend URL
- [ ] Database seeded (optional)
- [ ] Tested registration and login
- [ ] Admin login tested

🎉 **Your app is live!**
