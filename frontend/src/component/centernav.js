import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import feather from 'feather-icons';
import axios from 'axios';
import '../pages/centerdashboard/linknav.css'

function Nav() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [centerData, setCenterData] = useState({});
  const [welcomeNotification, setWelcomeNotification] = useState(null);

  useEffect(() => {
    feather.replace();

    const centerId = localStorage.getItem('ID_center');
    if (centerId) {
      setWelcomeNotification("Welcome to our website!"); // Set welcome notification

      setTimeout(() => {
        setWelcomeNotification(null); // Remove the notification after 5 seconds
      }, 5000);

      const fetchNotifications = async () => {
        try {
          const response = await axios.get(`http://localhost:8084/notifications/${centerId}`);
          setNotifications(response.data);
        } catch (error) {
          console.error('Error fetching notifications:', error);
        }
      };

      const fetchCenterData = async () => {
        try {
          const response = await axios.get(`http://localhost:8084/center/${centerId}`);
          setCenterData(response.data);
        } catch (error) {
          console.error('Error fetching center data:', error);
        }
      };

      fetchNotifications();
      fetchCenterData();
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('ID_center');
    navigate('/');
  };

  return (
    <div id="main-wrapper" data-theme="light" data-layout="vertical" data-navbarbg="skin6" data-sidebartype="full" data-sidebar-position="fixed" data-header-position="fixed" data-boxed-layout="full">
      <header className="topbar" data-navbarbg="skin6">
        <nav className="navbar top-navbar navbar-expand-md">
          <div className="navbar-header" data-logobg="skin6">
            <a className="nav-toggler waves-effect waves-light d-block d-md-none" href="javascript:void(0)">
              <i className="ti-menu ti-close"></i>
            </a>
            <div className="navbar-brand">
              <NavLink to="/centerdashboard/profile">
                <b className="logo-icon">
                  <img src="/img/LOGO.png" className="logo" />
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
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle pl-md-3 position-relative" href="javascript:void(0)" id="bell" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span><i data-feather="bell" className="svg-icon"></i></span>
                  <span className="badge badge-primary notify-no rounded-circle">{notifications.length}</span>
                </a>
                <div className="dropdown-menu dropdown-menu-left mailbox animated bounceInDown">
                  <ul className="list-style-none">
                    <li>
                      <div className="message-center notifications position-relative">
                        {notifications.map((notification, index) => (
                          <a key={index} href="javascript:void(0)" className="message-item d-flex align-items-center border-bottom px-3 py-2">
                            <div className="btn btn-primary rounded-circle btn-circle"><i data-feather="bell" className="text-white"></i></div>
                            <div className="w-75 d-inline-block v-middle pl-2">
                              <h6 className="message-title mb-0 mt-1">Notification</h6>
                              <span className="font-12 text-nowrap d-block text-muted">{notification.message}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                    </li>
                    <li>
                      <NavLink className="nav-link pt-3 text-center text-dark" to="/notifications">
                        <p>Check all notifications</p>
                        <i className="fa fa-angle-right"></i>
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </li>
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
                  <img src={centerData.center_pic ? `http://localhost:8084${centerData.center_pic}` : ""} alt="user" className="user-avatar" width="40" />
                  <span className="ml-2 d-none d-lg-inline-block">
                    <span>Hello,</span> <span className="text-dark">{centerData.Center_fullname}</span> <i data-feather="chevron-down" className="svg-icon"></i>
                  </span>
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
              <NavLink to="/centerdashboard/profile" className="sidebar-link" aria-expanded="false" activeClassName="selected">
                <i data-feather="user" className="feather-icon"></i>
                <span className="hide-menu">Profile</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/centerdashboard/courses" className="sidebar-link" aria-expanded="false" activeClassName="selected">
                <i data-feather="layers" className="feather-icon"></i>
                <span className="hide-menu">Courses</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/centerdashboard/allevents" className="sidebar-link" aria-expanded="false" activeClassName="selected">
                <i data-feather="calendar" className="feather-icon"></i>
                <span className="hide-menu">Events</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/centerdashboard/requestcenter" className="sidebar-link" aria-expanded="false" activeClassName="selected">
                <i data-feather="user-plus" className="feather-icon"></i>
                <span className="hide-menu">Requests</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/centerdashboard/followed" className="sidebar-link" aria-expanded="false" activeClassName="selected">
                <i data-feather="user-check" className="feather-icon"></i>
                <span className="hide-menu">Followed Users</span>
              </NavLink>
            </li>
            <li className="sidebar-item">
              <NavLink to="/centerdashboard/centernotifs" className="sidebar-link" aria-expanded="false" activeClassName="selected">
                <i data-feather="bell" className="feather-icon"></i>
                <span className="hide-menu">Notifications</span>
              </NavLink>
            </li>
            <li className="list-divider"></li>
            <li className="sidebar-item">
              <a className="sidebar-link sidebar-link" href="javascript:void(0)" aria-expanded="false" onClick={handleLogout}>
                <i data-feather="log-out" className="feather-icon"></i>
                <span className="hide-menu">Logout</span>
              </a>
            </li>
          </ul>
        </nav>
      </aside>
    </div>
  );
}

export default Nav;
