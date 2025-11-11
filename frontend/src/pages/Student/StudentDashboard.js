import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { useAuth } from '../../context/AuthContext';

const StudentDashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Student Dashboard</h1>
            <p className="mt-2 text-gray-600">Welcome back, {user?.name}!</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/student/events"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-indigo-600 text-4xl mb-4">📅</div>
              <h3 className="text-xl font-bold mb-2">Browse Events</h3>
              <p className="text-gray-600">
                View all available symposiums and events
              </p>
            </Link>

            <Link
              to="/student/enrollments"
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition"
            >
              <div className="text-indigo-600 text-4xl mb-4">📋</div>
              <h3 className="text-xl font-bold mb-2">My Enrollments</h3>
              <p className="text-gray-600">
                View your registered events and participant IDs
              </p>
            </Link>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-indigo-600 text-4xl mb-4">👤</div>
              <h3 className="text-xl font-bold mb-2">Profile</h3>
              <div className="text-gray-600 space-y-1">
                <p><strong>Name:</strong> {user?.name}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>College:</strong> {user?.college}</p>
                <p><strong>Mobile:</strong> {user?.mobile}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;


