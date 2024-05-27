import React, { useState, useEffect } from 'react';
import feather from 'feather-icons';
import Nav from '../../component/centernav';
import '../../css/centerdash.css';

const Centernotif = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'follower', message: 'Emna Sahraoui has followed you' },
    { id: 2, type: 'request', message: 'Emna Sahraoui has joined your course' },
  ]);

  useEffect(() => {
    feather.replace();
  }, [notifications]);

  const handleClearAll = () => {
    setNotifications([]);
  };

  const handleDismiss = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
  };

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="container-lg">
          <div className="row">
            <div className="col-lg-12">
              <div className="pagetitle">
                <br></br>
                <button id="clear-all-btn" className="add-course-btn" onClick={handleClearAll}>Clear all</button>
              </div>
            </div>
          </div>
          <div className="row mt-5">
            {notifications.map(notification => (
              <div className="col-lg-12" key={notification.id}>
                <div className={`alert notification-${notification.type}`} role="alert">
                  <button
                    type="button"
                    className="close close-notification"
                    aria-label="Close"
                    onClick={() => handleDismiss(notification.id)}
                  >
                    <span aria-hidden="true" data-feather="x"></span>
                  </button>
                  <strong>{`${notification.type.charAt(0).toUpperCase() + notification.type.slice(1)} Notification - `}</strong>
                  {notification.message}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Centernotif;
