# EVENTRA Quick Start Guide

## 🚀 Getting Started in 5 Minutes

### 1. Prerequisites Check
- ✅ Node.js installed (v14+)
- ✅ MongoDB running (local or Atlas)

### 2. Backend Setup (Terminal 1)
```bash
cd backend
npm install
# Create .env file with:
# MONGODB_URI=mongodb://localhost:27017/eventra
# JWT_SECRET=your_secret_key
# PORT=5000
npm run seed  # Creates test accounts
npm run dev   # Starts server on port 5000
```

### 3. Frontend Setup (Terminal 2)
```bash
cd frontend
npm install
npm start  # Starts on port 3000
```

### 4. Login
Open http://localhost:3000 and use:
- **Admin**: admin@eventra.com / admin123
- **Coordinator**: coordinator1@eventra.com / coord123
- **Student**: student1@eventra.com / student123

## 📋 Feature Checklist

### ✅ Student Features
- [x] Register/Login
- [x] View events list
- [x] View event details
- [x] Enroll in events
- [x] View enrollments with participant IDs
- [x] Track attendance status

### ✅ Coordinator Features
- [x] Login
- [x] View assigned events
- [x] View participants list
- [x] Mark attendance (Present/Absent)
- [x] View attendance statistics

### ✅ Admin Features
- [x] Login
- [x] Create main events
- [x] Create sub-events
- [x] Assign coordinators
- [x] View all participants
- [x] View reports and statistics
- [x] Dashboard with analytics

## 🎯 Common Tasks

### Create a New Event (Admin)
1. Login as admin
2. Go to "Create Main Event"
3. Fill in event details
4. Click "Create Event"

### Enroll in Event (Student)
1. Login as student
2. Go to "Browse Events"
3. Click on an event
4. Click "Enroll in Event"

### Mark Attendance (Coordinator)
1. Login as coordinator
2. Go to "Mark Attendance"
3. Select an event
4. Click "Present" or "Absent" for each participant

## 🔧 Troubleshooting

**Backend won't start?**
- Check MongoDB is running
- Verify .env file exists
- Check port 5000 is available

**Frontend won't start?**
- Check Node.js version
- Delete node_modules and reinstall
- Check port 3000 is available

**Can't login?**
- Run `npm run seed` again in backend
- Clear browser localStorage
- Check JWT_SECRET is set

## 📚 Next Steps

1. Customize events and users
2. Add your own data
3. Deploy to production
4. Add more features

---

For detailed documentation, see README.md and SETUP.md


