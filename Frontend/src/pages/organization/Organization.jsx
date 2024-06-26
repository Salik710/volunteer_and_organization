import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axiosInstance';
import Profile from './organizationProfile';
import EditProfileModal from './OrganizationProfilEditModal';
import EventCard from '../volunteer/EventCard';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Organization = () => {
  const { email } = useParams();
  const [organization, setOrganization] = useState(null);
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    profileUrl: '',
    email: '',
    description: '',
    phone: '',
    address: ''
  });

  useEffect(() => {
    const fetchOrganizationDetails = async () => {
      try {
        const response = await axiosInstance.get(`/organization/${email}`);
        setOrganization(response.data);
        setFormValues(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching organization details:', error);
        setError('Error fetching organization details.');
        setLoading(false);
      }
    };
    fetchOrganizationDetails();
  }, [email]);

  useEffect(() => {
    const fetchOrganizationEvents = async () => {
      try {
        const response = await axiosInstance.get(`/event/organization/${email}`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching organization events:', error);
        setError('Error fetching organization events.');
      }
    };
    fetchOrganizationEvents();
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
      await axiosInstance.put(`/organization/${email}`, formValues);
      setOrganization(formValues);
      toast.success('Successfully Updated Organization details');
      setEditMode(false);
    } catch (error) {
      console.error('Error updating organization details:', error);
      toast.error('Error updating organization details');
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

  if (!organization) {
    toast.error('Organization details not found.');
  }

  return (
    <div className="mx-auto p-6 bg-[#064439] shadow-lg rounded-lg">
      <Profile organization={organization} onEdit={handleEditClick} />
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
          <h2 className="text-2xl merriweather-bold mb-4 text-white">My Events</h2>
          {events.length === 0 ? (
            <p className="text-white">No events found.</p>
          ) : (
            <div className="flex flex-col gap-5">
              {events.map((event) => (
                <Link to={`/event/${event._id}`} key={event._id}>
                  <EventCard event={event} userType={'organization'} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Organization;
