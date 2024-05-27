// src/components/CSignup.js
import React, { useState } from 'react';
import './Cign.css';
import axios from 'axios';
import LoginCenter from './LoginCenter';
import { useNavigate } from 'react-router-dom';

function CSignup({ setIDCenter }) {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [signupData, setSignupData] = useState({
        Center_fullname: '',
        Center_email: '',
        center_password: ''
    });
    const [errors, setErrors] = useState({
        Center_fullname: '',
        Center_email: '',
        center_password: ''
    });

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const handleSignupChange = (event) => {
        setSignupData({ ...signupData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!signupData.Center_email.includes('@')) {
            newErrors.Center_email = "Email should contain '@'.";
        }

        if (signupData.center_password.length < 6) {
            newErrors.center_password = "Password should be at least 6 characters long.";
        }

        for (let field in signupData) {
            if (signupData[field].trim() === '') {
                newErrors[field] = "This field is required.";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        axios.post('http://localhost:8084/center/signup', signupData)
            .then(res => {
                setIDCenter(res.data.ID_center);
                localStorage.setItem('ID_center', res.data.ID_center);
                navigate('/centerforms/tcwelcome');
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.message) {
                    console.error("Registration failed:", err.response.data.message);
                    alert("Registration failed: " + err.response.data.message);
                } else {
                    console.error("Registration failed:", err);
                    alert("Registration failed. Please try again later.");
                }
            });
    };

    return (
        <div className='center-all'>
            <div className={`center-container ${isActive ? "active" : ""}`} id="container">
                <div className="form-container center-sign-up">
                    <form onSubmit={handleSignupSubmit}>
                        <h1 className="center-title">Create Training Center Account</h1>
                        <input
                            type="text"
                            placeholder="Full name"
                            name="Center_fullname"
                            value={signupData.Center_fullname}
                            onChange={handleSignupChange}
                        />
                        {errors.Center_fullname && <span className="error">{errors.Center_fullname}</span>}
                        <input
                            type="email"
                            placeholder="Email"
                            name="Center_email"
                            value={signupData.Center_email}
                            onChange={handleSignupChange}
                        />
                        {errors.Center_email && <span className="error">{errors.Center_email}</span>}
                        <input
                            type="password"
                            placeholder="Password"
                            name="center_password"
                            value={signupData.center_password}
                            onChange={handleSignupChange}
                        />
                        {errors.center_password && <span className="error">{errors.center_password}</span>}
                        <button type="submit">Continue</button>
                    </form>
                </div>

                <LoginCenter />

                <div className="center-toggle-container">
                    <div className="center-toggle">
                        <div className={`center-toggle-panel center-toggle-left ${isActive ? "" : "active"}`}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className={`center-toggle-panel center-toggle-right ${isActive ? "active" : ""}`}>
                            <h1>Welcome, Friend!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CSignup;
