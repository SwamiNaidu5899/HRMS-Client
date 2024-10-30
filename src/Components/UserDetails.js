import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const UserDetails = () => {
    const [user, setUser] = useState(null);
    const [leaveRequests, setLeaveRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        
        // Check if user is logged in
        if (!currentUser) {
            toast.error('You need to be logged in to view this page.');
            navigate('/login');
            return;
        }

        // Check if the user is an admin
        if (currentUser.role === 'admin') {
            toast.error('Admins cannot access user details.');
            navigate('/admin'); // Redirect to admin panel
            return;
        }

        setUser(currentUser);

        // Get user's leave requests
        const storedLeaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
        const userLeaveRequests = storedLeaveRequests.filter(request => request.userEmail === currentUser.email);
        setLeaveRequests(userLeaveRequests);
    }, [navigate]);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Approved':
                return 'green';
            case 'Rejected':
                return 'red';
            default:
                return 'black'; // Default color for pending or unknown status
        }
    };

    return (
        <div className="user-details-container">
            {user ? (
                <>
                    <h1>User Details</h1>
                    <div className="tables-container">
                        <div className="user-info">
                            <h2>User Information</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Name</th>
                                        <td>{user.name}</td>
                                    </tr>
                                    <tr>
                                        <th>Email</th>
                                        <td>{user.email}</td>
                                    </tr>
                                    <tr>
                                        <th>Login Time</th>
                                        <td>{user.loginTime || 'N/A'}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="leave-requests">
                            <h2>Leave Requests</h2>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Reason</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaveRequests.length > 0 ? (
                                        leaveRequests.map((request, index) => (
                                            <tr key={index}>
                                                <td>{request.reason}</td>
                                                <td>{request.startDate}</td>
                                                <td>{request.endDate}</td>
                                                <td style={{ color: getStatusColor(request.status) }}>{request.status}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="4">No leave requests found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};

export default UserDetails;
