import React, { useState, useEffect } from 'react';
import axiosInstance from '../axiosInstance';
import EventCard from './volunteer/EventCard';
import BannerImage from '../assets/plant.jpeg'; // Adjust the path as needed

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axiosInstance.get('/event');
        setEvents(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Error fetching events.');
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const userType = localStorage.getItem('userType');
  const userEmail = localStorage.getItem('userEmail');

  return (
    <div className='mt-5 bg-[#064439]'>
      <div className="relative h-72 w-full">
        <img src={BannerImage} alt="Banner" className="object-cover w-full h-full" />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center items-center">
          <h1 className="text-4xl font-bold text-white uppercase tracking-wide">All Events</h1>
          <p className="text-xl text-white mt-2">Join us in making a difference through volunteering!</p>
        </div>
      </div>

      <div className="mx-auto max-w-[80%]">
        <h2 className="text-2xl merriweather-bold py-4 text-white uppercase tracking-wide">All Events</h2>
        {events.length === 0 ? (
          <p className="text-white">No events found.</p>
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event) => (
              <EventCard key={event._id} event={event} userType={userType} userEmail={userEmail} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
