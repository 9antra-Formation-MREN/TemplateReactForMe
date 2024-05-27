import React, { useState } from 'react';
import './admin.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

function AdminLogin() {
    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        admin_email: '',
        admin_password: ''
    });
    const [errors, setErrors] = useState({
        admin_email: '',
        admin_password: ''
    });

    const handleLoginChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value });
        setErrors({ ...errors, [event.target.name]: '' });
    };

    const handleLoginSubmit = async (event) => {
        event.preventDefault();
        try {
            const res = await axios.post('http://localhost:8084/admin/signin', loginData);
            const token = res.data.token;
            localStorage.setItem('admin_token', token);
            const decodedToken = jwtDecode(token);
            const adminId = decodedToken.ID_admin;
            localStorage.setItem('ID_admin', adminId);
            navigate('/dashboardadmin/users');
        } catch (err) {
            if (err.response && err.response.data && err.response.data.message) {
                alert(err.response.data.message);
            } else {
                console.error("Login Error:", err);
                alert("Login Error. Please try again later.");
            }
        }
    };

    return (
        <div className="admin-form-container admin-sign-in">
            <form onSubmit={handleLoginSubmit}>
                <h1>Sign In</h1>
                <input
                    type="email"
                    placeholder="Email"
                    name="admin_email"
                    value={loginData.admin_email}
                    onChange={handleLoginChange}
                />
                {errors.admin_email && <span className="error">{errors.admin_email}</span>}
                <input
                    type="password"
                    placeholder="Password"
                    name="admin_password"
                    value={loginData.admin_password}
                    onChange={handleLoginChange}
                />
                {errors.admin_password && <span className="error">{errors.admin_password}</span>}
                <button type="submit">Sign In</button>
            </form>
        </div>
    );
}

export default AdminLogin;
