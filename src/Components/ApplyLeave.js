import React, { useState } from 'react';
import { toast } from 'react-toastify';
import emailjs from 'emailjs-com';

const ApplyLeave = () => {
    const [reason, setReason] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const handleApplyLeave = (e) => {
        e.preventDefault();
        const user = JSON.parse(localStorage.getItem('currentUser'));
        
        if (user && reason && startDate && endDate) {
            // Prepare leave request
            const leaveRequest = {
                id: Date.now(), // Unique ID for each request
                userEmail: user.email,
                reason,
                startDate,
                endDate,
                status: 'Pending', // Initial status
            };

            // Get existing leave requests
            const leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
            leaveRequests.push(leaveRequest);
            localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));

            // Email sending logic using EmailJS
            const templateParams = {
                name: user.name,
                email: user.email,
                reason,
                startDate,
                endDate,
            };

            emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams, 'YOUR_USER_ID')
                .then((response) => {
                    console.log('SUCCESS!', response.status, response.text);
                    toast.success('Leave applied successfully! HR has been notified.');
                    // Reset fields after successful submission
                    setReason('');
                    setStartDate('');
                    setEndDate('');
                }, (error) => {
                    console.error('FAILED...', error);
                    toast.error('Error sending application. Please try again.');
                });
        } else {
            toast.error('Please fill in all fields');
        }
    };

    return (
        <div className="apply-leave-container">
            <h1>Apply for Leave</h1>
            <form onSubmit={handleApplyLeave}>
                <input 
                    type="text" 
                    placeholder="Leave Reason" 
                    value={reason} 
                    onChange={(e) => setReason(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                    required 
                />
                <input 
                    type="date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                    required 
                />
                <button type="submit">Apply</button>
            </form>
        </div>
    );
};

export default ApplyLeave;
