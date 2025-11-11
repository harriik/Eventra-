import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar';
import { eventsAPI, registrationsAPI } from '../../services/api';
import { toast } from 'react-toastify';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [subEvents, setSubEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    fetchEventDetails();
  }, [id]);

  const fetchEventDetails = async () => {
    try {
      const eventResponse = await eventsAPI.getById(id);
      const eventData = eventResponse.data;
      setEvent(eventData);
      
      // Only fetch sub-events if this is a main event (main_event is null)
      if (!eventData.main_event) {
        try {
          const subEventsResponse = await eventsAPI.getByMainEvent(eventData.title);
          setSubEvents(subEventsResponse.data);
        } catch (error) {
          console.error('Failed to load sub-events:', error);
          setSubEvents([]);
        }
      } else {
        setSubEvents([]);
      }
    } catch (error) {
      toast.error('Failed to load event details');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEnroll = async (eventId) => {
    setEnrolling(true);
    try {
      await registrationsAPI.enroll(eventId);
      toast.success('Successfully enrolled in event!');
      navigate('/student/enrollments');
    } catch (error) {
      const message = error.response?.data?.message || 'Failed to enroll';
      toast.error(message);
    } finally {
      setEnrolling(false);
    }
  };

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading event details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!event) {
    return (
      <div>
        <Navbar />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <p className="text-gray-600">Event not found</p>
            <Link to="/student/events" className="text-indigo-600 mt-4 inline-block">
              Back to Events
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            to="/student/events"
            className="text-indigo-600 hover:text-indigo-800 mb-4 inline-block"
          >
            ← Back to Events
          </Link>

          <div className="bg-white p-8 rounded-lg shadow-md mb-6">
            <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
            <p className="text-gray-600 mb-6">{event.description}</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{new Date(event.date).toLocaleDateString()}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Venue</p>
                <p className="font-semibold">{event.venue}</p>
              </div>
            </div>
            <button
              onClick={() => handleEnroll(event._id)}
              disabled={enrolling}
              className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {enrolling ? 'Enrolling...' : event.main_event ? 'Enroll in Event' : 'Enroll in Main Event'}
            </button>
          </div>

          {subEvents.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Sub-Events</h2>
              <div className="space-y-4">
                {subEvents.map((subEvent) => (
                  <div key={subEvent._id} className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold mb-2">{subEvent.title}</h3>
                    <p className="text-gray-600 mb-4">{subEvent.description}</p>
                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div>
                        <p className="text-sm text-gray-500">Date</p>
                        <p className="font-semibold">{new Date(subEvent.date).toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Venue</p>
                        <p className="font-semibold">{subEvent.venue}</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleEnroll(subEvent._id)}
                      disabled={enrolling}
                      className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition disabled:opacity-50"
                    >
                      {enrolling ? 'Enrolling...' : 'Enroll in Sub-Event'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

