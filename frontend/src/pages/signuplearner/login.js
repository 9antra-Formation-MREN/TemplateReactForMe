// src/pages/login.js
import React, { useState, useContext } from 'react';
import './sign.css';
import axios from 'axios';
import AuthContext from '../../component/AuthContext';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function Login() {
    const [Values, setValues] = useState({
        learner_email: '',
        learner_password: ''
    });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate(); // Initialize useNavigate

    const handleChange = (event) => {
        setValues({ ...Values, [event.target.name]: event.target.value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        // If all validations pass, submit the form
        axios.post('http://localhost:8084/signin', Values)
            .then(res => {
                console.log("Login Successful!");
                alert("Login Successful!");
                login(); // Set the user as logged in
                navigate('/'); // Redirect to homepage
            })
            .catch(err => {
                console.error("Login failed:", err.response.data.message);
                alert("Login failed: " + err.response.data.message);
            });
    }

    return (
        <div className="form-container sign-in">
            <form onSubmit={handleSubmit}>
                <h1>Sign In</h1>
                <input type="email" placeholder="Email" name="learner_email" value={Values.learner_email} onChange={handleChange} />
                <input type="password" placeholder="Password" name="learner_password" value={Values.learner_password} onChange={handleChange} />
                <button>Sign In</button>
            </form>
        </div>
    );
}

export default Login;
