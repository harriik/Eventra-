# Deploying EVENTRA to Vercel

## Prerequisites
- GitHub account
- Vercel account (sign up at vercel.com)
- MongoDB Atlas account (for production database)

## Step 1: Prepare MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (free tier is fine)
3. Go to **Database Access** → Create a database user with username and password
4. Go to **Network Access** → Add IP Address → Allow access from anywhere (`0.0.0.0/0`)
5. Go to **Database** → Connect → Connect your application
6. Copy the connection string (looks like: `mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eventra`)

## Step 2: Push Code to GitHub

1. Create a new repository on GitHub
2. Initialize git in your project root:
```bash
cd "d:\MCA\Sem 1\Web Designing\Eventra Project"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/eventra.git
git push -u origin main
```

## Step 3: Deploy Backend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset**: Other
   - **Root Directory**: `backend`
   - **Build Command**: Leave empty
   - **Output Directory**: Leave empty
5. Add Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: `MyStrongKey1234` (or generate a secure random string)
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
6. Click **Deploy**
7. Copy your backend URL (e.g., `https://eventra-backend.vercel.app`)

## Step 4: Deploy Frontend to Vercel

1. In Vercel Dashboard, click **Add New** → **Project**
2. Import the same GitHub repository
3. Configure project:
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
4. Add Environment Variables:
   - `REACT_APP_API_URL`: Your backend URL + `/api` (e.g., `https://eventra-backend.vercel.app/api`)
5. Click **Deploy**
6. Your frontend will be live at `https://eventra-frontend.vercel.app`

## Step 5: Update Backend CORS

After deployment, update your backend `server.js` to allow your frontend domain:

```javascript
app.use(cors({
  origin: ['https://eventra-frontend.vercel.app', 'http://localhost:3000'],
  credentials: true
}));
```

Commit and push this change - Vercel will auto-deploy.

## Step 6: Seed Database (Optional)

Run the seed script locally pointing to your production database:

```bash
cd backend
# Update .env with production MONGODB_URI temporarily
npm run seed
# Revert .env back to local settings
```

## Troubleshooting

### Backend Issues
- Check Vercel Function Logs in the dashboard
- Ensure MongoDB Atlas IP whitelist includes `0.0.0.0/0`
- Verify all environment variables are set correctly

### Frontend Issues
- Check browser console for API URL errors
- Ensure `REACT_APP_API_URL` includes `/api` at the end
- Clear browser cache and hard refresh

### CORS Errors
- Update backend CORS to include your frontend Vercel URL
- Redeploy backend after CORS changes

## Custom Domain (Optional)

1. Go to your Vercel project → **Settings** → **Domains**
2. Add your custom domain
3. Update DNS records as instructed by Vercel

## Environment Variables Reference

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster0.xxxxx.mongodb.net/eventra?retryWrites=true&w=majority
JWT_SECRET=your_secure_random_string_here
NODE_ENV=production
```

### Frontend (.env)
```
REACT_APP_API_URL=https://your-backend-url.vercel.app/api
```

## Important Notes

- Vercel serverless functions have a 10-second timeout on free tier
- MongoDB Atlas free tier has 512MB storage limit
- Keep your JWT_SECRET secure and never commit it to GitHub
- Use GitHub Secrets for sensitive data in CI/CD

## Support

For issues, check:
- Vercel Logs: Project → Deployments → Click deployment → View Function Logs
- MongoDB Atlas Logs: Database → Monitoring
- Browser Console: F12 → Console tab
