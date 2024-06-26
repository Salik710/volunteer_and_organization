// EditProfileModal.js
import React from 'react';

const EditProfileModal = ({ formValues, onChange, onSubmit, onCancel }) => {
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen">
        <div className="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg w-full">
          <form onSubmit={onSubmit} className="space-y-4 p-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={formValues.name}
                onChange={onChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Profile URL</label>
              <input
                type="text"
                name="profileUrl"
                value={formValues.profileUrl}
                onChange={onChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formValues.email}
                onChange={onChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                value={formValues.description}
                onChange={onChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="text"
                name="phone"
                value={formValues.phone}
                onChange={onChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Address</label>
              <input
                type="text"
                name="address"
                value={formValues.address}
                onChange={onChange}
                className="mt-1 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2"
              />
            </div>
            <div className="flex justify-end mt-4 space-x-2">
              <button
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfileModal;
