import React from 'react';

const OrganizationProfile = ({ organization, onEdit }) => {
  return (
    <div className="max-w-3xl mx-auto mt-16 bg-white shadow-xl rounded-lg text-gray-900">
      <div className="rounded-t-lg h-40 bg-gray-700 flex items-center justify-center">
        <div className="w-32 h-32 relative overflow-hidden rounded-full border-4 border-white">
          <img className="object-cover object-center h-full w-full" src="https://via.placeholder.com/150" alt="Profile" />
        </div>
      </div>
      <div className="text-center mt-2">
        <h2 className="font-semibold">{organization.name}</h2>
        <p className="text-gray-500">{organization.email}</p>
      </div>
      <div className="p-4 border-t mx-8 mt-2">
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Description:</p>
          <p className="text-gray-500">{organization.description}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Phone:</p>
          <p className="text-gray-500">{organization.phone}</p>
        </div>
        <div className="mb-4">
          <p className="text-gray-700 font-semibold">Address:</p>
          <p className="text-gray-500">{organization.address}</p>
        </div>
        <button onClick={onEdit} className="w-1/2 block mx-auto rounded-full bg-gray-900 hover:shadow-lg font-semibold text-white px-6 py-2">Edit Profile</button>
      </div>
    </div>
  );
};

export default OrganizationProfile;
