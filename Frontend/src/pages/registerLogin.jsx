import React, { useState } from 'react';
import axiosInstance from '../axiosInstance';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
const RegisterLogin = () => {
  const navigate = useNavigate();
  const { userType } = useParams();
  const [isRegister, setIsRegister] = useState(false); // State to toggle between register and login
  const [userDetails, setUserDetails] = useState({
    email: '',
    password: ''
  });
  const [profileDetails, setProfileDetails] = useState({
    name: '',
    description: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    aadhaarNumber: ''
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileDetails({ ...profileDetails, [name]: value });
    setUserDetails({ ...userDetails, [name]: value });
  };

  const login = async () => {
    try {
      const res = await axiosInstance.post('/user/login', { ...userDetails, userType });
      if (res.data.token) {
        localStorage.setItem('token', res.data.token);
        console.log('User logged in successfully');
        toast.success('User logged in successfully');
        localStorage.setItem('userType', userType);
        localStorage.setItem('userEmail', userDetails.email);
        navigate(`/${userType}/${userDetails.email}`, { replace: true });
      } else {
        throw new Error('Token not received');
      }
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      console.error('Login error:', error.response?.data || error.message);
      // Handle login error
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        // Create profile first
        let profile;
        let email = userDetails.email;
        if (userType === 'organization') {
          profile = await axiosInstance.post('/organization', { ...profileDetails, email });
        } else {
          profile = await axiosInstance.post('/volunteer', { ...profileDetails, email });
        }
        if (profile.data._id) {
          // Create user with the profileId
          await axiosInstance.post('/user/register', {
            ...userDetails,
            userType,
            profileId: profile.data._id
          });
          login();
          console.log('User registered and logged in successfully');
          toast.success('User registered and logged in successfully');

        } else {
          // Profile creation failed
          throw new Error('Profile creation failed');
        }
      } else {
        login();
      }
    } catch (error) {
      console.error(`${isRegister ? 'Registration' : 'Login'} error:`, error.response.data);
      toast.error(`${isRegister ? 'Registration' : 'Login'} error:`, error.response.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#EEE7CE]">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-96">
        <h2 className="text-2xl font-prompt-medium mb-4 text-center">{userType} {isRegister ? 'Register' : 'Login'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            name="email"
            value={userDetails.email}
            onChange={handleChange}
            placeholder="Email"
            required
            className="block w-full p-2 border rounded-md"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={userDetails.password}
              onChange={handleChange}
              placeholder="Password"
              required
              className="block w-full p-2 border rounded-md"
            />
            {/* Add toggle button to show/hide password */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          {isRegister && userType === 'organization' && (
            <>
              <input
                type="text"
                name="name"
                value={profileDetails.name}
                onChange={handleChange}
                placeholder="Organization Name"
                required
                className="block w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="description"
                value={profileDetails.description}
                onChange={handleChange}
                placeholder="Description"
                required
                className="block w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                value={profileDetails.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="block w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="address"
                value={profileDetails.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="block w-full p-2 border rounded-md"
              />
            </>
          )}
          {isRegister && userType === 'volunteer' && (
            <>
              <input
                type="text"
                name="name"
                value={profileDetails.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="block w-full p-2 border rounded-md"
              />
              <input
                type="date"
                name="dateOfBirth"
                value={profileDetails.dateOfBirth}
                onChange={handleChange}
                placeholder="Date Of Birth"
                required
                className="block w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="aadhaarNumber"
                value={profileDetails.aadhaarNumber}
                onChange={handleChange}
                placeholder="Aadhar Number"
                required
                className="block w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="phone"
                value={profileDetails.phone}
                onChange={handleChange}
                placeholder="Phone"
                required
                className="block w-full p-2 border rounded-md"
              />
              <input
                type="text"
                name="address"
                value={profileDetails.address}
                onChange={handleChange}
                placeholder="Address"
                required
                className="block w-full p-2 border rounded-md"
              />
            </>
          )}
          <button type="submit" className="w-full p-2 bg-green-700 text-white rounded-md hover:bg-green-800">
            {isRegister ? 'Register' : 'Login'}
          </button>
          <div className="flex justify-center">
            <button type="button" onClick={() => setIsRegister(!isRegister)} className="text-green-700 hover:text-green-800">
              {isRegister ? 'Switch to Login' : 'Switch to Register'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterLogin;
