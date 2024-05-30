import React, { createContext, useContext, useState } from 'react';

// Create the User context
const UserContext = createContext();

// Custom hook to use the User context
export const useUser = () => {
  return useContext(UserContext);
};

// Provider component to wrap around parts of the app that need access to the context
export const UserProvider = ({ children }) => {
  const [userType, setUserType] = useState(''); // 'organization' or 'volunteer'
  const [userInfo, setUserInfo] = useState(null); // Store user details based on type

  return (
    <UserContext.Provider value={{ userType, setUserType, userInfo, setUserInfo }}>
      {children}
    </UserContext.Provider>
  );
};
