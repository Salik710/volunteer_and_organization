import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import Profile from './Profile';
import EditProfileModal from './EditProfileModal';
import EventCard from './EventCard'; 
import { toast } from 'react-toastify';

const Volunteer = () => {
  const { email } = useParams();
  const [volunteer, setVolunteer] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    aadhaarNumber: ''
  });

  useEffect(() => {
    const fetchVolunteerDetails = async () => {
      try {
        const response = await axiosInstance.get(`/volunteer/${email}`);
        setVolunteer(response.data.volunteer);
        setFormValues(response.data.volunteer);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching volunteer details:', error);
        setError('Error fetching volunteer details.');
        toast.error('Error fetching volunteer details.');
        setLoading(false);
      }
    };
    fetchVolunteerDetails();
  }, [email]);

  useEffect(() => {
    const fetchVolunteerEvents = async () => {
      try {
        const response = await axiosInstance.get(`/volunteer/${email}/events`);
        setEvents(response.data.events);
      } catch (error) {
        console.error('Error fetching volunteer events:', error);
        setError('Error fetching volunteer events.');
        toast.error('Error fetching volunteer events.');
      }
    };
    fetchVolunteerEvents();
  }, [email]);

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
      await axiosInstance.put(`/volunteer/${email}`, formValues);
      setVolunteer(formValues);
      setEditMode(false);
      toast.success('Volunteer details updated successfully.');
    } catch (error) {
      console.error('Error updating volunteer details:', error);
      setError('Error updating volunteer details.');
      toast.error('Error updating volunteer details.');
    }
  };

  const handleEditClick = () => {
    setEditMode(true);
  };

  const handleCancelEdit = () => {
    setEditMode(false);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !volunteer) {
    return <div>Error: {error || 'Volunteer details not found.'}</div>;
  }

  return (
        <div className="mx-auto p-6 bg-[#064439] shadow-lg rounded-lg">
          <Profile volunteer={volunteer} onEdit={handleEditClick} />
          {editMode && (
            <EditProfileModal
              formValues={formValues}
              onChange={handleInputChange}
              onSubmit={handleFormSubmit}
              onCancel={handleCancelEdit}
            />
          )}
          <div className="mt-8">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl merriweather-bold mb-4 text-white">Registered Events</h2>
              {events.length === 0 ? (
                <p className="text-white">No events found.</p>
              ) : (
                <div className="flex flex-col gap-5">
                  {events.map((event) => (
                      <EventCard key={event._id} event={event} userType = {'volunteer'} userEmail = {email}/>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

  );
};

export default Volunteer;
