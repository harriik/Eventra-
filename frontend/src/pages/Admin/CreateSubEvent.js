import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { eventsAPI, adminAPI } from '../../services/api';
import { toast } from 'react-toastify';

const CreateSubEvent = () => {
  const navigate = useNavigate();
  const [mainEvents, setMainEvents] = useState([]);
  const [coordinators, setCoordinators] = useState([]);
  const [formData, setFormData] = useState({
    main_event: '',
    title: '',
    description: '',
    date: '',
    venue: '',
    coordinator_id: ''
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [eventsResponse, usersResponse] = await Promise.all([
        eventsAPI.getAll({ main_event: null }),
        adminAPI.getUsers({ role: 'coordinator' })
      ]);
      setMainEvents(eventsResponse.data);
      setCoordinators(usersResponse.data);
    } catch (error) {
      toast.error('Failed to load data');
      console.error(error);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const submitData = {
        ...formData,
        coordinator_id: formData.coordinator_id || undefined
      };
      await eventsAPI.createSubEvent(submitData);
      toast.success('Sub-event created successfully!');
      navigate('/admin/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to create sub-event');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Get main event name from selected event ID
  const getMainEventName = () => {
    const mainEvent = mainEvents.find(e => e._id === formData.main_event);
    return mainEvent?.title || '';
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Create Sub-Event</h1>
            <p className="mt-2 text-gray-600">Add a sub-event to a symposium</p>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-md">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="main_event" className="block text-sm font-medium text-gray-700">
                  Main Event (Symposium)
                </label>
                <select
                  id="main_event"
                  name="main_event"
                  required
                  value={formData.main_event}
                  onChange={(e) => {
                    setFormData({
                      ...formData,
                      main_event: e.target.value
                    });
                  }}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a main event</option>
                  {mainEvents.map((event) => (
                    <option key={event._id} value={event.title}>
                      {event.title}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                  Sub-Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="4"
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                  Date
                </label>
                <input
                  type="datetime-local"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                  Venue
                </label>
                <input
                  type="text"
                  id="venue"
                  name="venue"
                  required
                  value={formData.venue}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label htmlFor="coordinator_id" className="block text-sm font-medium text-gray-700">
                  Coordinator (Optional)
                </label>
                <select
                  id="coordinator_id"
                  name="coordinator_id"
                  value={formData.coordinator_id}
                  onChange={handleChange}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">No coordinator assigned</option>
                  {coordinators.map((coord) => (
                    <option key={coord._id} value={coord._id}>
                      {coord.name} ({coord.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex space-x-4">
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                >
                  {loading ? 'Creating...' : 'Create Sub-Event'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/admin/dashboard')}
                  className="flex-1 bg-gray-200 text-gray-800 px-6 py-3 rounded-lg hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateSubEvent;

