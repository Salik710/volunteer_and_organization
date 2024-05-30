import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

const EventCard = ({ event, userType, userEmail }) => {
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);
  const [organizationName, setOrganizationName] = useState('');

  const checkRegistration = (email) => {
    const isUserRegistered = event.volunteers.some(volunteer => volunteer === email);
    setIsRegistered(isUserRegistered);
  };

  const fetchOrganizationName = async (email) => {
    try {
      const response = await axiosInstance.get(`/organization/${email}`);
      setOrganizationName(response.data.name);
    } catch (error) {
      console.error('Error fetching organization name:', error);
    }
  };

  useEffect(() => {
    checkRegistration(userEmail);
  }, [userEmail]);

  useEffect(() => {
    fetchOrganizationName(event.organizationEmail);
  }, [event.organizationEmail]);

  const handleRegister = async () => {
    if (userType === 'volunteer') {
      try {
        await axiosInstance.post('/registration', {
          volunteerEmail: userEmail,
          eventId: event._id,
        });
        toast.success('Successfully Registered from the event!');
        setIsRegistered(true);
      } catch (error) {
        console.error('Error registering for the event:', error);
        toast.success('Successfully Registered from the event!');
      }
    } else {
      if (window.confirm('Please log in to register for events.')) {
        navigate('/registerLogin/volunteer');
      }
    }
  };

  const handleUnregister = async () => {
    try {
      await axiosInstance.delete('/registration', {
        data: { volunteerEmail: userEmail, eventId: event._id },
      });
      toast.success('Successfully unregistered from the event!');
      setIsRegistered(false);
    } catch (error) {
      console.error('Error unregistering from the event:', error);
      toast.error('Failed to unregister from the event.');
    }
  };

  return (
    <div className="min-w-full max-w-4xl mx-auto bg-[#EEE7CE] rounded-xl shadow-md overflow-hidden md:max-w-5xl">
      <div className="md:flex">
        <div className="md:w-1/2 flex items-center justify-center bg-[#EEE7CE] md:mt-0 mt-3">
          <img className="h-[95%] w-[95%] rounded-xl object-cover" src="https://via.placeholder.com/320x240" alt="Event Thumbnail" />
        </div>
        <div className="md:w-1/2 p-8">
          <div className="flex items-center mb-4">
            <img className="h-12 w-12 rounded-full mr-4" src="https://via.placeholder.com/48" alt="Organization Profile" />
            <div>
              <div className="text-lg font-semibold text-[#064439]">{organizationName || 'Loading...'}</div>
              <div className="text-sm text-gray-500">{event.organizationEmail}</div>
            </div>
          </div>
          <div className="mb-4">
            <h2 className="text-lg leading-tight font-medium text-black">{event.title}</h2>
            <div className="flex items-center mt-2 text-gray-700">
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M6 2a1 1 0 00-1 1v1H3a1 1 0 100 2h1v6H3a1 1 0 000 2h2v1a1 1 0 102 0v-1h6v1a1 1 0 102 0v-1h2a1 1 0 000-2h-1V6h1a1 1 0 100-2h-2V3a1 1 0 00-1-1H6zm8 8H6V6h8v4z"></path>
              </svg>
              <span className="font-semibold">Date: {new Date(event.date).toLocaleDateString()}</span>
              <span className="ml-4">Duration: 3hrs</span>
            </div>
            <div className="flex items-center mt-2 text-gray-700">
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12.293 9.293a1 1 0 011.414 0l2 2a1 1 0 11-1.414 1.414L13 11.414V16a1 1 0 11-2 0v-4.586l-1.293 1.293a1 1 0 01-1.414-1.414l2-2z"></path>
              </svg>
              <span className="font-semibold">Time: {event.time}</span>
            </div>
            <div className="flex items-center mt-2 text-gray-700">
              <svg className="h-5 w-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path d="M12 2a7 7 0 00-4.086 12.649L5 17v1h1l2.351-2.915A7 7 0 1012 2zm0 2a5 5 0 110 10 5 5 0 010-10z"></path>
              </svg>
              <span className="font-semibold">Location: {event.location}</span>
            </div>
          </div>
          <div className="mb-4">
            <p className="mt-2 text-gray-700 font-semibold">Description:</p>
            <p className="mt-1 text-gray-700">{event.description}</p>
          </div>
          {userType !== 'organization' && (
            <button
              className="mt-4 px-4 py-2 bg-[#064439] text-[#EEE7CE] rounded-full hover:bg-[#05372d]"
              onClick={isRegistered ? handleUnregister : handleRegister}
            >
              {isRegistered ? 'Unregister' : 'Register'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
