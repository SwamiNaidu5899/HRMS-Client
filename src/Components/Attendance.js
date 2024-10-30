import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Attendance = () => {
    const [attendanceStatus, setAttendanceStatus] = useState('');
    const [isPresentDisabled, setPresentDisabled] = useState(false);
    const [isAbsentDisabled, setAbsentDisabled] = useState(false);

    const handleAttendance = (status) => {
        const user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            const users = JSON.parse(localStorage.getItem('users'));
            const currentUser = users.find(u => u.email === user.email);
            if (currentUser) {
                currentUser.attendance.push({ date: new Date().toLocaleDateString(), status });
                localStorage.setItem('users', JSON.stringify(users));
                setAttendanceStatus(status);
                toast.success(`Marked as ${status}!`);
                
                // Disable buttons accordingly
                if (status === 'Present') {
                    setPresentDisabled(false);
                    setAbsentDisabled(true);
                } else {
                    setAbsentDisabled(false);
                    setPresentDisabled(true);
                }
            }
        } else {
            toast.error('Please login to mark attendance');
        }
    };

    return (
        <div className="attendance-container">
            <h1>Attendance</h1>
            <div className="button-group">
                <button 
                    onClick={() => handleAttendance('Present')} 
                    disabled={isPresentDisabled}
                    className={`attendance-button ${isPresentDisabled ? 'disabled' : ''}`}
                >
                    Present
                </button>
                <button 
                    onClick={() => handleAttendance('Absent')} 
                    disabled={isAbsentDisabled}
                    className={`attendance-button ${isAbsentDisabled ? 'disabled' : ''}`}
                >
                    Absent
                </button>
            </div>
            {attendanceStatus && <p className="attendance-status">Status: {attendanceStatus}</p>}
        </div>
    );
};

export default Attendance;
