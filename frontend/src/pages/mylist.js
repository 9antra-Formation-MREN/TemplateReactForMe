import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/mylist.css';
import { Settings, List, Bell, Menu, Calendar, Clock, MapPin } from 'react-feather';
import uxImage from '../img/section/cour.png';
import eventImage from '../img/section/EVENT.png';
import centerImage from '../img/section/center.png';
import PROF from '../img/section/prof.png';
import ALPHA from '../img/section/alfa.png';
import Checked from '../component/checkedmark';
import Header from '../component/header';

const MyList = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('Courses');

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  const courses = [
    {
      image: uxImage,
      category: 'Web development',
      title: 'Learn Full Stack Node.js',
      center: 'Facultas Teach Training Company',
      centerImage: centerImage,
      price: '900DT',
    },
    {
      image: uxImage,
      category: 'Web development',
      title: 'Learn Full Stack Node.js',
      center: 'Facultas Teach Training Company',
      centerImage: centerImage,
      price: '900DT',
    },
    {
      image: uxImage,
      category: 'Web development',
      title: 'Learn Full Stack Node.js',
      center: 'Facultas Teach Training Company',
      centerImage: centerImage,
      price: '900DT',
    },
  ];

  const events = [
    {
      image: eventImage,
      category: 'Business',
      title: 'Online Business Workshop',
      ALPHA: 'ALPHA',
      date: '15 Feb 2025',
      time: '8:00 am',
      location: 'ISAMM, Manouba',
    },
    {
      image: eventImage,
      category: 'Business',
      title: 'Online Business Workshop',
      ALPHA: 'ALPHA',
      date: '15 Feb 2025',
      time: '8:00 am',
      location: 'ISAMM, Manouba',
    },
  ];

  return (
    <>
    <Header/>
    <div className="unique-list-container">
      <div className="popo-header">
        <img src={PROF} alt="Tailored Course Recommendations" />
      </div> 
      <header className="unique-list-header">
        <button className="unique-burger-menu" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className={`unique-list-sidebar-mobile ${sidebarOpen ? 'open' : ''}`}>
        <Link to="/userprofile" className="unique-side"><Settings /> Settings</Link>
          <Link to="/mylist" className="unique-side"><List /> My List</Link>
          <Link to="/usernotif" className="unique-side"><Bell /> Notifications</Link>
        </div>
      </header>
      <main className="unique-list-main">
        <aside className="unique-list-sidebar">
        <Link to="/userprofile" className="unique-side"><Settings /> Settings</Link>
          <Link to="/mylist" className="unique-side"><List /> My List</Link>
          <Link to="/usernotif" className="unique-side"><Bell /> Notifs</Link>
        </aside>

        <section className="unique-list-content">
          <h2>My List</h2>
          <div className="unique-list-tabs">
            <button
              className={`unique-tab ${activeTab === 'Courses' ? 'active' : ''}`}
              onClick={() => handleTabClick('Courses')}
            >
              Courses
            </button>
            <button
              className={`unique-tab ${activeTab === 'Events' ? 'active' : ''}`}
              onClick={() => handleTabClick('Events')}
            >
              Events
            </button>
          </div>
          {activeTab === 'Courses' && (
            <div className="unique-list-courses">
              {courses.map((course, index) => (
                <div key={index} className="unique-list-card">
                  <img src={course.image} alt={course.title} className="unique-course-image" />
                  <div className="unique-course-details">
                    <div className='bookmark-prof'>
                      <Checked />
                    </div>
                    <div className="unique-course-category">{course.category}</div>
                    <div className="unique-center-details">
                      <img src={course.centerImage} alt={course.center} className="unique-center-image" />
                      <p>{course.center}</p>
                    </div>
                    <div className="unique-title">
                      <h4>{course.title}</h4>
                    </div>
                    <div className="prixes">
                      <p className="Prix-courses">Price: {course.price}</p>
                    </div>
                    <div className="unique-enroll-container">
                      <button className="unique-enroll-button">Enroll Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          {activeTab === 'Events' && (
            <div className="unique-list-events">
              {events.map((event, index) => (
                <div key={index} className="unique-event-card">
                  <img src={event.image} alt={event.title} className="unique-event-image" />
                  <div className="unique-event-details">
                    <div className="unique-event-category">{event.category}</div>
                    <h4 className='TITLE'>{event.title}</h4>
                    <div className='alphaaa'> <img src={ALPHA} alt="Alpha" /><p> Posted by Three alfa formation </p> </div>
                    <p className="unique-event-center"></p>
                    <p className="unique-event-info"><Calendar size={15} color={'#fb9b50'} /> {event.date}</p>
                    <p className="unique-event-info"><Clock size={15} color={'#fb9b50'} /> {event.time}</p>
                    <p className="unique-event-info"><MapPin size={15} color={'#fb9b50'} /> {event.location}</p>
                    <button className="unique-event-button">Interested</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
    </>
  );
};

export default MyList;
