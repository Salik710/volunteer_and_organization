import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance'; 
import VolunteerCard from './VolunteerCard';
import { toast } from 'react-toastify';


const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [volunteers, setVolunteers] = useState([]);
  const [formValues, setFormValues] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizationEmail: '',
    organizationName: '',
    duration: { hours: 0, minutes: 0 },
  });

  useEffect(() => {
    fetchEvent();
    fetchVolunteers();
  }, []);

  const fetchEvent = async () => {
    try {
      const response = await axiosInstance.get(`/event/${id}`);
      setEvent(response.data);
      setFormValues(response.data);
    } catch (error) {
      console.error('Error fetching event:', error);
    }
  };

  const fetchVolunteers = async () => {
    try {
      const response = await axiosInstance.get(`/event/${id}/volunteers`);
      setVolunteers(response.data.volunteers);
    } catch (error) {
      console.error('Error fetching volunteers:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.put(`/event/${id}`, formValues);
      setEvent(formValues);
      setEditMode(false);
      toast.success('Event updated successfully');
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Failed to update event');
    }
  };
  const userEmail = localStorage.getItem('userEmail');

  const handleDeleteEvent = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        await axiosInstance.delete(`/event/${id}`);
        toast.success('Event deleted successfully');
        navigate(`/organization/${userEmail}`, { replace: true });
      } catch (error) {
        console.error('Error deleting event:', error);
        toast.error('Failed to delete event');
      }
    }
  };

  if (!event) return <div>Loading...</div>;

  return (
    <div className="bg-[#064439] min-w-full min-h-screen mt-14 p-6">
      <div className="max-w-4xl mx-auto p-6 bg-[#EEE7CE] shadow-lg rounded-lg prompt-regular">
        {editMode ? (
          <form onSubmit={handleFormSubmit}>
            {/* ... (form elements here) */}
            <div className="flex justify-between">
              <button type="submit" className="bg-[#064439] text-[#EEE7CE] px-4 py-2 rounded hover:bg-[#05372d]">
                Save
              </button>
              <button type="button" onClick={() => setEditMode(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="text-black">
            <h1 className="text-3xl text-[#064439] merriweather-bold mb-4">{event.title}</h1>
            <p className="mb-4">{event.description}</p>
            <p className="mb-4">
              <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="mb-4">
              <strong>Time:</strong> {event.time}
            </p>
            <p className="mb-4">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="mb-4">
              <strong>Organization:</strong> {event.organizationName} ({event.organizationEmail})
            </p>
            <p className="mb-4">
              <strong>Duration:</strong> {event.duration.hours} hours {event.duration.minutes} minutes
            </p>
            <div className="flex justify-between">
              <button onClick={() => setEditMode(true)} className="bg-[#064439] text-[#EEE7CE] px-4 py-2 rounded hover:bg-[#05372d]">
                Edit
              </button>
              <button onClick={handleDeleteEvent} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                Delete
              </button>
            </div>
          </div>
        )}
          </div>
          <div className=" mt-6 max-w-4xl mx-auto p-6 bg-[#EEE7CE] shadow-lg rounded-lgr">
          <h2 className="text-2xl merriweather-bold mb-4">Registered Volunteers</h2>
          {volunteers.length > 0 ? (
            volunteers.map((volunteer) => (
              <VolunteerCard key={volunteer.email} volunteer={volunteer}  eventId = {id}/>
            ))
          ) : (
            <p>No volunteers registered for this event.</p>
          )}
      </div>
    </div>
  );
};

export default EventDetails;
