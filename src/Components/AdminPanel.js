import React, { useState } from 'react';

const AdminPanel = () => {
    const [users, setUsers] = useState(JSON.parse(localStorage.getItem('users')) || []);
    const [leaveRequests, setLeaveRequests] = useState(JSON.parse(localStorage.getItem('leaveRequests')) || []);
    const [currentUser, setCurrentUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const handleEdit = (user) => {
        setCurrentUser(user);
        setIsEditing(true);
    };

    const handleDelete = (email) => {
        const updatedUsers = users.filter(user => user.email !== email);
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
    };

    const handleSave = (e) => {
        e.preventDefault();
        const updatedUsers = users.map(user => {
            if (user.email === currentUser.email) {
                return currentUser;
            }
            return user;
        });
        setUsers(updatedUsers);
        localStorage.setItem('users', JSON.stringify(updatedUsers));
        setIsEditing(false);
        setCurrentUser(null);
    };

    const handleLeaveStatusChange = (id, newStatus) => {
        const updatedRequests = leaveRequests.map(request => {
            if (request.id === id) {
                return { ...request, status: newStatus };
            }
            return request;
        });
        setLeaveRequests(updatedRequests);
        localStorage.setItem('leaveRequests', JSON.stringify(updatedRequests));
    };

    return (
        <div className="admin-container">
            <h1>Admin Panel</h1>
            <h2>Number of Employees: {users.length}</h2>
            <h2>Leave Requests:</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>User Email</th>
                        <th>Reason</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request, index) => (
                        <tr key={index}>
                            <td>{request.userEmail}</td>
                            <td>{request.reason}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td>{request.status}</td>
                            <td>
                                <button onClick={() => handleLeaveStatusChange(request.id, 'Approved')}>Approve</button>
                                <button onClick={() => handleLeaveStatusChange(request.id, 'Rejected')}>Reject</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Existing user management table here */}
            <h2>Number of Employees: {users.length}</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Login Time</th>
                        <th>Attendance</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={index}>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.loginTime || 'N/A'}</td>
                            <td>
                                {user.attendance.length > 0 ? (
                                    <ul className="attendance-list">
                                        {user.attendance.map((att, i) => (
                                            <li key={i}>{att.date}: {att.status}</li>
                                        ))}
                                    </ul>
                                ) : (
                                    <span>No attendance records</span>
                                )}
                            </td>
                            <td>
                                <button onClick={() => handleEdit(user)}>Edit</button>
                                <button onClick={() => handleDelete(user.email)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {isEditing && (
                <div className="modal">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <button className="close-modal" onClick={() => setIsEditing(false)}>×</button>
                        <form onSubmit={handleSave}>
                            <input 
                                type="text" 
                                value={currentUser.name} 
                                onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} 
                                required
                            />
                            <input 
                                type="email" 
                                value={currentUser.email} 
                                onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} 
                                required
                            />
                            <button type="submit">Save</button>
                            <button type="button" onClick={() => setIsEditing(false)}>Cancel</button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminPanel;
