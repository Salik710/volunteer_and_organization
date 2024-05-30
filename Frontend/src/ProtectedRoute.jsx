import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ userTypeAuth, element }) => {

        const token = localStorage.getItem('token');
    // if (!token) {
    //     return <Navigate to="/" replace />;
    // }
    const storedUserType = localStorage.getItem('userType');
    if (storedUserType !== userTypeAuth) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default ProtectedRoute;
