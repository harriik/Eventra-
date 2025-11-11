import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';

const Home = () => {
  const { isAuthenticated, user } = useAuth();

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'admin':
        return '/admin/dashboard';
      case 'coordinator':
        return '/coordinator/dashboard';
      case 'student':
        return '/student/dashboard';
      default:
        return '/';
    }
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold text-gray-900 mb-4">
              Welcome to EVENTRA
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Multi-Role Symposium Event Management System
            </p>
            {isAuthenticated ? (
              <Link
                to={getDashboardPath()}
                className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
              >
                Go to Dashboard
              </Link>
            ) : (
              <div className="flex justify-center space-x-4">
                <Link
                  to="/student/register"
                  className="inline-block bg-indigo-600 text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-700 transition"
                >
                  Student Registration
                </Link>
                <Link
                  to="/student/login"
                  className="inline-block bg-white text-indigo-600 border-2 border-indigo-600 px-8 py-3 rounded-lg text-lg font-semibold hover:bg-indigo-50 transition"
                >
                  Student Login
                </Link>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">👨‍🎓</div>
              <h3 className="text-xl font-bold mb-2">For Students</h3>
              <p className="text-gray-600 mb-4">
                Register for events, enroll in multiple symposiums, and track your participation.
              </p>
              <Link
                to="/student/register"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register Now →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">👨‍💼</div>
              <h3 className="text-xl font-bold mb-2">For Coordinators</h3>
              <p className="text-gray-600 mb-4">
                Manage event participants, mark attendance, and view attendance statistics.
              </p>
              <Link
                to="/coordinator/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Coordinator Login →
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">👨‍💻</div>
              <h3 className="text-xl font-bold mb-2">For Administrators</h3>
              <p className="text-gray-600 mb-4">
                Create events, manage registrations, and view comprehensive reports.
              </p>
              <Link
                to="/admin/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Admin Login →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;


