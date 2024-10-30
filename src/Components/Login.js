import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const user = users.find(user => user.email === email && user.password === password);
        
        if (user) {
            const loginTime = new Date().toLocaleString(); // Get current date and time
            user.loginTime = loginTime; // Set login time in user object
            
            // Update users in local storage with login time
            const updatedUsers = users.map(u => 
                u.email === email ? { ...u, loginTime } : u
            );
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            localStorage.setItem('currentUser', JSON.stringify(user));
            
            toast.success(`Welcome back, ${user.name}!`);
            if (user.role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } else {
            toast.error("Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="auth-container">
            <h1>Login</h1>
            <form onSubmit={handleLogin} className="auth-form">
                <input 
                    type="email" 
                    placeholder="Email" 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
                <input 
                    type="password" 
                    placeholder="Password" 
                    onChange={(e) => setPassword(e.target.value)} 
                    required 
                />
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
