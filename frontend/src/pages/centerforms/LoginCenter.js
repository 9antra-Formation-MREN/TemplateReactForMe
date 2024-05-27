// src/components/LoginCenter.js
import React, { useState } from 'react';
import './Cign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function LoginCenter() {
    const navigate = useNavigate();
    const [Values, setValues] = useState({
        Center_email: '',
        center_password: ''
    });

    const handleChange = (event) => {
        setValues({ ...Values, [event.target.name]: event.target.value });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        axios.post('http://localhost:8084/center/signin', Values)
            .then(res => {
                console.log("Login Successful!");
                localStorage.setItem('ID_center', res.data.ID_center);
                sendNotification(res.data.ID_center);
                navigate('/centerdashboard/profile');
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    console.error("Login failed:", err.response.data.message);
                    alert("Login failed: " + err.response.data.message);
                } else {
                    console.error("Login failed:", err);
                    alert("Login failed. Please try again later.");
                }
            });
    };

    const sendNotification = (centerId) => {
        axios.post(`http://localhost:8084/center/login-notification/${centerId}`)
            .then(res => {
                console.log("Notification sent successfully");
            })
            .catch(err => {
                console.error("Failed to send notification:", err);
            });
    };

    return (
        <div className="form-container center-sign-in">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="Center_email"
                    value={Values.Center_email}
                    onChange={handleChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="center_password"
                    value={Values.center_password}
                    onChange={handleChange}
                />
                <button>Sign In</button>
            </form>
        </div>
    );
}

export default LoginCenter;
