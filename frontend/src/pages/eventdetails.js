import React, { useState } from 'react';
import { Calendar, Clock, MapPin } from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/homepage.css';
import '../css/eventdetails.css';
import Header from '../component/header';
import Footer from '../component/footer';
import Train from '../img/section/SAB.png';
import event1 from '../img/section/EVENT.png';
import centerImage from '../img/section/center.png';
import Arrow from '../img/section/arrow.png';
import arrowDown from '../img/section/down.png'; 
import arrowUp from '../img/section/up.png'; 


const scheduleItems = [
  {
    time: '9:00 AM ',
    title: 'Opening conference',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
  },
  {
    time: '12:00 AM ',
    title: 'Break time',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
  },
  {
    time: '12:30 AM ',
    title: 'Workshops',
    description: 'There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don\'t look even slightly believable.',
  },
];

function Eventdetails() {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Header />
      <div className='title-event mt-5'>
      <h1> Event Details</h1>
    
     </div>
      <div className="pict">
        <img src={Train} alt="Tailored Course Recommendations" />
      </div>
     
      <div className="event-detail-card">
        <div className="row">
          <div className="col-lg-6">
            <img src={event1} alt="Web Development" className="event-detail-image" />
          </div>
          <div className="col-lg-6">
            <div className="event-detail-content">
              <h2>Explore the world of the web development</h2>
              <div className="event-detail-center">
                <img src={centerImage} alt="Proservices Training Company" className="event-detail-center-img" />
                <p>Posted by Proservices Training Company</p>
              </div>
              <p className="event-detail-description">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form,
                by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum.
              </p>
              <div className="event-detail-details">
                <p><Calendar className="iconevent" /> Fri 01 Feb 2024</p>
                <p><Clock className="iconevent" /> 9:00</p>
                <p><MapPin className="iconevent" /> ISAMM, Manouba</p>
              </div>
              <div className="event-detail-buttons">
                <button className="btn-detail-interested">Interested</button>
                <button className="btn-detail-participate">Participate</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="event-schedule-container">
        <h2 className="event-schedule-title1">Event Schedule</h2>
        {scheduleItems.map((item, index) => (
          <div key={index} className="event-schedule-item">
            <div className="event-schedule-header" onClick={() => toggleAccordion(index)}>
              <div className="event-schedule-time">{item.time}</div>
              <div className="event-schedule-title">{item.title}</div>
              <img
                src={activeIndex === index ? arrowUp : arrowDown}
                alt="Toggle Arrow"
                className="event-schedule-arrow"
              />
            </div>
            {activeIndex === index && item.description && (
              <div className="event-schedule-description">
                {item.description}
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer />
    </>
  );
}

export default Eventdetails;
