import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import '../pages/centerdashboard/linknav.css'
import feather from 'feather-icons';

function Adminnav() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      const decodedToken = jwtDecode(token);
      const adminId = decodedToken.ID_admin;
      localStorage.setItem('ID_admin', adminId);
      axios.get(`http://localhost:8084/admin/${adminId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
      .then((response) => {
        setAdminName(response.data.admin_name);
      })
      .catch((error) => {
        console.error('Error fetching admin data:', error);
      });
    } else {
      console.error('Admin token not found in localStorage');
      navigate('/dashboardadmin/adminsignin');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('ID_admin');
    navigate('/dashboardadmin/adminsignup');
  };
  feather.replace();

  return (
    <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
      <header className="topbar" data-navbarbg="skin6">
        <nav className="navbar top-navbar navbar-expand-md">
          <div className="navbar-header" data-logobg="skin6">
            <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
              <i className="ti-menu ti-close"></i>
            </a>
            <div className="navbar-brand">
              <NavLink to="/dashboard">
                <b className="logo-icon">
                  <img src="/img/LOGO.png" alt="homepage" className="logo" />
                </b>
              </NavLink>
            </div>
            <a className="topbartoggler d-block d-md-none waves-effect waves-light" href="javascript:void(0)"
              data-toggle="collapse" data-target="#navbarSupportedContent"
              aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <i className="ti-more"></i>
            </a>
          </div>
          <div className="navbar-collapse collapse" id="navbarSupportedContent">
            <ul className="navbar-nav float-left mr-auto ml-3 pl-1"></ul>
            <ul className="navbar-nav float-right">
              <li className="nav-item d-none d-md-block">
                <a className="nav-link" href="javascript:void(0)">
                  <form>
                    <div className="customize-input">
                      <input className="form-control custom-shadow custom-radius border-0 bg-white" type="search" placeholder="Search" aria-label="Search" />
                      <i className="form-control-icon" data-feather="search"></i>
                    </div>
                  </form>
                </a>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="javascript:void(0)" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="mr-5 d-none d-lg-inline-block"><span>Hello,</span> <span className="text-dark">{adminName}</span> <i data-feather="chevron-down" className="svg-icon"></i></span>
                </a>
                <div className="dropdown-menu dropdown-menu-right user-dd animated flipInY">
                  <a className="dropdown-item" href="javascript:void(0)" onClick={handleLogout}>
                    <i data-feather="power" className="svg-icon mr-2 ml-1"></i>Logout
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </nav>
      </header>
      <aside className="left-sidebar" data-sidebarbg="skin6">
        <nav className="sidebar-nav">
          <ul id="sidebarnav">
            <li className="sidebar-item">
              <NavLink to="/dashboardadmin/users" className="sidebar-link">
                <i data-feather="users" className="feather-icon"></i><span className="hide-menu">Users</span>
              </NavLink>
              <ul aria-expanded="false" className="collapse">
                <li className="sidebar-item"><NavLink to="/dashboardadmin/learners" className="sidebar-link"><span className="hide-menu">Learners</span></NavLink></li>
                <li className="sidebar-item"><NavLink to="/dashboardadmin/centerss" className="sidebar-link"><span className="hide-menu">Training Centers</span></NavLink></li>
              </ul>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboardadmin/requests" className="sidebar-link">
                <i data-feather="alert-circle" className="feather-icon"></i><span className="hide-menu">Requests</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboardadmin/fetchcourses" className="sidebar-link">
                <i data-feather="layers" className="feather-icon"></i><span className="hide-menu">Courses</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/dashboardadmin/events" className="sidebar-link">
                <i data-feather="calendar" className="feather-icon"></i><span className="hide-menu">Events</span>
              </NavLink>
            </li>
            <li className="list-divider"></li>
            <li className="sidebar-item">
              <a className="sidebar-link sidebar-link" href="javascript:void(0)" onClick={handleLogout}>
                <i data-feather="log-out" className="feather-icon"></i><span className="hide-menu">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Adminnav;
