# EVENTRA Setup Guide

## Quick Start

Follow these steps to get EVENTRA up and running:

### Step 1: Install MongoDB

**Option A: Local MongoDB**
- Download and install MongoDB from [https://www.mongodb.com/try/download/community](https://www.mongodb.com/try/download/community)
- Start MongoDB service on your system
- Default connection: `mongodb://localhost:27017/eventra`

**Option B: MongoDB Atlas (Cloud)**
- Create a free account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
- Create a cluster and get your connection string
- Update `MONGODB_URI` in backend `.env` file

### Step 2: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Edit .env file and set:
# - MONGODB_URI (your MongoDB connection string)
# - JWT_SECRET (any random string for production)
# - PORT (default: 5000)

# Seed database with sample data (creates admin, coordinator, student accounts)
npm run seed

# Start backend server
npm run dev
```

Backend will run on `http://localhost:5000`

### Step 3: Frontend Setup

```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start frontend development server
npm start
```

Frontend will run on `http://localhost:3000`

### Step 4: Access the Application

1. Open your browser and go to `http://localhost:3000`
2. Use the test accounts created by the seed script:
   - **Admin**: admin@eventra.com / admin123
   - **Coordinator**: coordinator1@eventra.com / coord123
   - **Student**: student1@eventra.com / student123

## Troubleshooting

### MongoDB Connection Issues

**Error: "MongoDB connection error"**
- Make sure MongoDB is running (check service status)
- Verify connection string in `.env` file
- For MongoDB Atlas, check network access settings
- Ensure firewall allows connections on port 27017 (local) or 27017-27019 (Atlas)

### Port Already in Use

**Error: "Port 5000 already in use"**
- Change PORT in backend `.env` file to a different port (e.g., 5001)
- Update frontend `.env` file to match the new backend port

### CORS Errors

**Error: "CORS policy" in browser console**
- Ensure backend is running
- Check that frontend proxy is set correctly in `package.json`
- Verify API_URL in frontend `.env` matches backend URL

### Authentication Issues

**Error: "Token is not valid"**
- Clear browser localStorage
- Log out and log back in
- Check JWT_SECRET is set in backend `.env`

### Module Not Found Errors

**Error: "Cannot find module"**
- Delete `node_modules` folder
- Delete `package-lock.json`
- Run `npm install` again

## Development Workflow

### Backend Development
```bash
cd backend
npm run dev  # Auto-reloads on file changes
```

### Frontend Development
```bash
cd frontend
npm start  # Auto-reloads on file changes
```

### Database Reset
```bash
cd backend
# Option 1: Drop and recreate (CAUTION: Deletes all data)
# Connect to MongoDB and drop the database, then run seed again

# Option 2: Just reseed (adds new data, may create duplicates)
npm run seed
```

## Production Deployment

### Backend
1. Set `NODE_ENV=production` in `.env`
2. Use a process manager like PM2: `pm2 start server.js`
3. Set up reverse proxy (nginx) if needed
4. Use environment variables for sensitive data

### Frontend
1. Build the production bundle: `npm run build`
2. Serve the `build` folder using a static file server
3. Configure API URL for production backend
4. Set up HTTPS for security

## Environment Variables Reference

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/eventra
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
NODE_ENV=development
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

## Test Accounts

After running `npm run seed` in the backend:

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@eventra.com | admin123 |
| Coordinator | coordinator1@eventra.com | coord123 |
| Coordinator | coordinator2@eventra.com | coord123 |
| Student | student1@eventra.com | student123 |
| Student | student2@eventra.com | student123 |
| Student | student3@eventra.com | student123 |

## API Testing

You can test the API endpoints using:
- Postman
- curl
- Browser DevTools
- Thunder Client (VS Code extension)

Example API call:
```bash
# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@eventra.com","password":"admin123"}'

# Get events (with token)
curl -X GET http://localhost:5000/api/events \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## Next Steps

1. Customize the application for your needs
2. Add more events and users
3. Configure email notifications (optional)
4. Set up file uploads for event images (optional)
5. Add more features as needed

## Support

For issues or questions:
1. Check the README.md for detailed documentation
2. Review the code comments
3. Check MongoDB logs for database issues
4. Check browser console for frontend errors
5. Check terminal for backend errors

---

Happy coding! 🚀

