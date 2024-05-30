import React from 'react';

const Profile = ({ volunteer, onEdit }) => {
  // Format date of birth
  const formattedDateOfBirth = new Date(volunteer.dateOfBirth).toLocaleDateString();

  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-40 bg-gray-700 flex items-center justify-center">
        <div className="w-32 h-32 relative overflow-hidden rounded-full border-4 border-white">
          <img className="object-cover object-center h-full w-full" src="https://via.placeholder.com/150" alt="Profile" />
        </div>
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold">{volunteer.name}</h2>
        <p className="text-gray-500">{volunteer.email}</p>
      </div>
      <div className="p-4 border-t mx-8 mt-2">
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Phone:</p>
          <p className="text-gray-500">{volunteer.phone}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Address:</p>
          <p className="text-gray-500">{volunteer.address}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Date of Birth:</p>
          <p className="text-gray-500">{formattedDateOfBirth}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Aadhaar Number:</p>
          <p className="text-gray-500">{volunteer.aadhaarNumber}</p>
        </div>
        <button onClick={onEdit} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Edit Profile</button>
      </div>
    </div>
  );
};

export default Profile;
