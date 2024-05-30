import React from 'react';
import axiosInstance from '../../axiosInstance';
import { toast } from 'react-toastify';

const VolunteerCard = ({ volunteer, eventId }) => {
  const onDelete = async (volunteerEmail, eventId) => {
    try {
      const confirmed = window.confirm('Are you sure you want to delete this volunteer?');
      if (confirmed) {
        await axiosInstance.delete(`/registration`, { data: { volunteerEmail, eventId } });
        toast.success('successfully deleted registration.');
        window.location.reload(); // Refresh the page after deletion
      }
    } catch (error) {
      toast.error('Error deleting registration:', error);
      // Handle error, maybe show an error message
    }
  };

  return (
    <div className="flex items-center justify-between py-4 border-b border-gray-200">
      <div className="flex items-center">
        <img
          src="https://via.placeholder.com/150"
          alt="Profile"
          className="w-12 h-12 rounded-full border-2 border-green-400"
        />
        <div className="ml-4">
          <h2 className="text-lg font-semibold text-gray-800">{volunteer.name}</h2>
          <p className="text-sm text-gray-500">{volunteer.phone}</p>
        </div>
      </div>
      <button onClick={() => onDelete(volunteer.email, eventId)} className="flex items-center text-red-600 hover:text-red-800">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default VolunteerCard;
