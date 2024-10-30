import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css'; // Import your CSS file
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import ApplyLeave from './Components/ApplyLeave';
import AdminPanel from './Components/AdminPanel';
import Attendance from './Components/Attendance';
import ProtectedRoute from './Components/ProtectedRoute'; // Import the protected route
import UserDetails from './Components/UserDetails';

const App = () => {
    return (
        <Router>
            <div>
                <Navbar />
                <ToastContainer />
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/apply-leave" element={<ApplyLeave />} />
                    <Route path="/attendance" element={<Attendance />} />
                    <Route path="/user-details" element={<UserDetails />} />
                    <Route path="/admin" element={
                        <ProtectedRoute>
                            <AdminPanel />
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={<h1>Welcome to the Leave Management System</h1>} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
