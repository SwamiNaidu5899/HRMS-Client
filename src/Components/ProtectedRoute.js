// ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (!currentUser || currentUser.role !== 'admin') {
        // Redirect to home if not admin
        return <Navigate to="/" />;
    }

    return children;
};

export default ProtectedRoute;
