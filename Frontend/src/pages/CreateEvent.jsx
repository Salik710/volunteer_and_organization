import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateEvent = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    organizationEmail: localStorage.getItem('userEmail'),
    durationHours: 0,
    durationMinutes: 0,
  });

  const [thumbnail, setThumbnail] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleFileChange = (e) => {
    e.preventDefault();
    setThumbnail(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let thumbnailUrl = '';
      // if (thumbnail) {
      //   const thumbnailForm = new FormData();
      //   thumbnailForm.append('thumbnail', thumbnail);

      //   // Create a new Axios instance for the thumbnail upload
      //   const uploadRes = await axios.post('/cloud/thumbnail', thumbnailForm, {
      //     baseURL: 'http://localhost:5000',
      //     headers: {
      //       'Content-Type': 'multipart/form-data'
      //     }
      //   });
      //   thumbnailUrl = uploadRes.data.thumbnailUrl;
      //}

      const eventFormData = { ...formData, thumbnailUrl };

      const response = await axiosInstance.post('/event', eventFormData);
      console.log('Event created:', response.data);
      toast.success('Event created successfully!');
    } catch (error) {
      console.error('There was an error creating the event!', error);
      toast.error('Failed to create event');
    }
  };

  return (
    <div className="min-h-screen mt-14 bg-[#064439] flex items-center justify-center p-6">
      <div className="bg-white rounded-lg shadow-md p-8 w-full max-w-3xl">
        <h1 className="text-2xl merriweather-bold mb-6 text-[#064439]">Create Event</h1>
        <form onSubmit={handleSubmit}>
          {[
            { label: 'Title', name: 'title', type: 'text' },
            { label: 'Description', name: 'description', type: 'textarea' },
            { label: 'Location', name: 'location', type: 'text' },
            { label: 'Date & Time', name: 'dateTime', type: 'group', fields: [
              { name: 'date', type: 'date' },
              { name: 'time', type: 'time' },
            ]},
            { label: 'Duration', name: 'duration', type: 'group', fields: [
              { name: 'durationHours', type: 'number', label: 'Hours' },
              { name: 'durationMinutes', type: 'number', label: 'Minutes' },
            ]},
          ].map((field) => (
            <div className="mb-4" key={field.name}>
              <label
                htmlFor={field.name}
                className="block prompt-bold text-[#064439] mb-1"
              >
                {field.label}
              </label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064439]"
                ></textarea>
              ) : field.type === 'group' ? (
                <div className="flex flex-col sm:flex-row">
                  {field.fields.map(subField => (
                    <div key={subField.name} className="mb-4 sm:mb-0 sm:mr-4">
                      <label
                        htmlFor={subField.name}
                        className="block prompt-bold text-[#064439] mb-1"
                      >
                        {subField.label}
                      </label>
                      <input
                        type={subField.type}
                        id={subField.name}
                        name={subField.name}
                        value={formData[subField.name]}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064439]"
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <input
                  type={field.type}
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064439]"
                />
              )}
            </div>
          ))}
          <div className="mb-4">
            <label htmlFor="thumbnail" className="block prompt-bold text-[#064439] mb-1">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={handleFileChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#064439]"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-[#064439] text-[#EEE7CE] merriweather-bold rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-[#EEE7CE]"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
