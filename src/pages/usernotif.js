import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import PROF from '../img/section/prof.png';
import { Bell, Settings, List, Menu } from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../css/profile.css';
import Header from '../component/header';

const UserNotif = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'You have a new message from John.' },
    { id: 2, message: 'Your course has been approved.' },
    { id: 3, message: 'Reminder: Meeting at 3 PM.' },
  ]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleDeleteNotification = (id) => {
    setNotifications(notifications.filter((notification) => notification.id !== id));
  };

  const handleClearAll = () => {
    setNotifications([]);
  };

  return (
    <>
      <Header/>
      <div className="profile-container">
      <div className="popo-header">
        <img src={PROF} alt="Tailored Course Recommendations" />
      </div>
      <header className="profile-header">
        <button className="unique-burger-menu" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className={`profile-side-mobile ${sidebarOpen ? 'open' : ''}`}>
          <Link to="/userprofile" className="unique-side"><Settings /> Settings</Link>
          <Link to="/mylist" className="unique-side"><List /> My List</Link>
          <Link to="/usernotif" className="unique-side"><Bell /> Notifications</Link>
        </div>
      </header>
      <main className="profile-main">
        <aside className="profile-side">
          <Link to="/userprofile" className="unique-side"><Settings /> Settings</Link>
          <Link to="/mylist" className="unique-side"><List /> My List</Link>
          <Link to="/usernotif" className="unique-side"><Bell /> Notifs</Link>
        </aside>
        <section className="profile-content ">
          <h2 className="mb-4">Notifications</h2>
          <button className="btn mb-3" onClick={handleClearAll}>Clear All</button>
          <div className="list-group">
            {notifications.map((notification) => (
              <div key={notification.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                {notification.message}
                <button className="btn btn-sm btn-outline-secondary" onClick={() => handleDeleteNotification(notification.id)}>X</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      </div>
    </>
  );
};

export default UserNotif;
