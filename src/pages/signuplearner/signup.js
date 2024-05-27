import React, { useState } from 'react';
import './sign.css';
import axios from 'axios';
import Login from './login';
import { Link, useNavigate } from 'react-router-dom';

function Signup({ setLearnerId }) {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(false);
    const [errors, setErrors] = useState({
        learner_fullname: '',
        learner_email: '',
        learner_password: ''
    });

    const handleRegisterClick = () => {
        setIsActive(true);
    };

    const handleLoginClick = () => {
        setIsActive(false);
    };

    const [signupData, setSignupData] = useState({
        learner_fullname: '',
        learner_email: '',
        learner_password: ''
    });

    const handleSignupChange = (event) => {
        setSignupData({ ...signupData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const handleSignupSubmit = (event) => {
        event.preventDefault();

        const newErrors = {};

        // Perform form validation
        if (!signupData.learner_fullname.match(/^[A-Za-z\s]+$/)) {
            newErrors.learner_fullname = "Name should contain only letters and spaces.";
        }

        if (!signupData.learner_email.includes('@')) {
            newErrors.learner_email = "Email should contain '@'.";
        }

        if (signupData.learner_password.length < 6) {
            newErrors.learner_password = "Password should be at least 6 characters long.";
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

        axios.post('http://localhost:8084/signup', signupData)
            .then(res => {
                setLearnerId(res.data.learner_id);
                navigate('/welcome');
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
        <div className='all'>
            <div className={`containersignup ${isActive ? "active" : ""}`} id="containersignup">
                <div className="form-container sign-up">
                    <form onSubmit={handleSignupSubmit}>
                        <h1>Create Account</h1>
                        <input type="text" placeholder="Full name" name="learner_fullname" value={signupData.learner_fullname} onChange={handleSignupChange} />
                        {errors.learner_fullname && <span className="error">{errors.learner_fullname}</span>}
                        <input type="email" placeholder="Email" name="learner_email" value={signupData.learner_email} onChange={handleSignupChange} />
                        {errors.learner_email && <span className="error">{errors.learner_email}</span>}
                        <input type="password" placeholder="Password" name="learner_password" value={signupData.learner_password} onChange={handleSignupChange} />
                        {errors.learner_password && <span className="error">{errors.learner_password}</span>}
                        <button type="submit">Continue</button>
                    </form>
                </div>

                <Login />

                <div className="toggle-container">
                    <div className="toggle">
                        <div className={`toggle-panel toggle-left ${isActive ? "" : "active"}`}>
                            <h1>Welcome Back!</h1>
                            <p>Enter your personal details to use all of site features</p>
                            <button className="hidden" onClick={handleLoginClick}>Sign In</button>
                        </div>
                        <div className={`toggle-panel toggle-right ${isActive ? "active" : ""}`}>
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

export default Signup;
