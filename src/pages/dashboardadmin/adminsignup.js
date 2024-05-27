import React, { useState } from 'react';
import './admin.css';
import axios from 'axios';
import AdminLogin from './adminsignin';
import { useNavigate } from 'react-router-dom';

function AdminSignup() {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState({
        admin_name: '',
        admin_email: '',
        admin_password: ''
    });

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const [signupData, setSignupData] = useState({
        admin_name: '',
        admin_email: '',
        admin_password: ''
    });

    const handleSignupChange = (event) => {
        setSignupData({ ...signupData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        // Perform form validation
        if (!signupData.admin_name.match(/^[A-Za-z\s]+$/)) {
            newErrors.admin_name = "Name should contain only letters and spaces.";
        }

        if (!signupData.admin_email.includes('@')) {
            newErrors.admin_email = "Email should contain '@'.";
        }

        if (signupData.admin_password.length < 6) {
            newErrors.admin_password = "Password should be at least 6 characters long.";
        }

        // Check if any field is empty
        for (let field in signupData) {
            if (signupData[field].trim() === '') {
                newErrors[field] = "This field is required.";
            }
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        axios.post('http://localhost:8084/admin/signup', signupData)
            .then((res) => {
                // Store admin ID in local storage
                if (res.data.ID_admin) {
                    localStorage.setItem('ID_admin', res.data.ID_admin);
                    navigate('/dashboardadmin/adminsignup');
                    window.location.reload(); // Refresh the page after navigation
                } else {
                    alert('Signup failed. Please try again.');
                }
            })
            .catch((err) => {
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
        <div className='admin-all'>
            <div className={`admin-container ${isActive ? "active" : ""}`} id="container">
                <div className="admin-form-container admin-sign-up">
                    <form onSubmit={handleSignupSubmit}>
                        <h1>Create Admin Account</h1>
                        <input type="text" placeholder="Admin Name" name="admin_name" value={signupData.admin_name} onChange={handleSignupChange} />
                        {errors.admin_name && <span className="error">{errors.admin_name}</span>}
                        <input type="email" placeholder="Email" name="admin_email" value={signupData.admin_email} onChange={handleSignupChange} />
                        {errors.admin_email && <span className="error">{errors.admin_email}</span>}
                        <input type="password" placeholder="Password" name="admin_password" value={signupData.admin_password} onChange={handleSignupChange} />
                        {errors.admin_password && <span className="error">{errors.admin_password}</span>}
                        <button type="submit">Continue</button>
                    </form>
                </div>

                <AdminLogin />

                <div className="admin-toggle-container">
                    <div className="admin-toggle">
                        <div className={`admin-toggle-panel admin-toggle-left ${isActive ? "" : "active"}`}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to manage the dashboard</p>
                            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className={`admin-toggle-panel admin-toggle-right ${isActive ? "active" : ""}`}>
                            <h1>Welcome, Friend!</h1>
                            <p>Enter your personal details to manage the dashboard</p>
                            <button className="hidden" onClick={handleRegisterClick}>Sign Up</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AdminSignup;
