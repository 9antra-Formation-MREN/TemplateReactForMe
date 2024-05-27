import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Adminnav from '../../component/adminnav';
import { NavLink } from 'react-router-dom';
import feather from 'feather-icons';
import './Users.css'; // Make sure to style the buttons and layout as needed

function Users() {
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    const adminId = localStorage.getItem('ID_admin');
    console.log('Admin ID from localStorage:', adminId);

    if (token && adminId) {
      axios.get(`http://localhost:8084/admin/${adminId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
        .then((response) => {
          console.log('Admin data fetched:', response.data);
          setAdminName(response.data.admin_name);
        })
        .catch((error) => {
          console.error('Error fetching admin data:', error);
        });
    }

    // Replace feather icons
    feather.replace();
  }, []);

  return (
    <div>
      <Adminnav />
      <div className="welcome-container">
        <h1 className="mr-5 mb-5">Bienvenue {adminName}!</h1>
        <div className="buttonuser-container">
          <NavLink to="/dashboardadmin/centerss" className="buttonuser">
            <div className="userbutton-content">
              <i data-feather="target"></i>
              <span>Training Centers</span>
            </div>
          </NavLink>
          <NavLink to="/dashboardadmin/learners" className="buttonuser">
            <div className="userbutton-content">
              <i data-feather="book-open"></i>
              <span>Learners</span>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Users;
