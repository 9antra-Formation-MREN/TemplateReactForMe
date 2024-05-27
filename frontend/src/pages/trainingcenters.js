import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/training.css';
import '../css/homepage.css';
import Header from '../component/header';
import Footer from '../component/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Train from '../img/section/SAB.png';
import Slide from '../img/section/Slider.png';

import c1 from '../img/section/hlc.png'; 
import c2 from '../img/section/propser.png'; 
import Popuptraining from '../component/filtertrainingcenter';
import SearchBar from '../component/searchbar';

const allCenters = [
  { id: 1, image: c1, title: 'HLC Training Center', content: 'HLC offers a variety of professional training programs in areas such as software development, data science, and cybersecurity.' },
  { id: 2, image: c2, title: 'Proservices Training Company', content: 'which offers continuing professional training in different areas: Test and validation, Marketing, Design, Project Management.' },
  { id: 3, image: c1, title: 'HLC Training Center', content: 'HLC offers a variety of professional training programs in areas such as software development, data science, and cybersecurity.' },
  { id: 4, image: c2, title: 'Proservices Training Company', content: 'which offers continuing professional training in different areas: Test and validation, Marketing, Design, Project Management.' },
  { id: 5, image: c1, title: 'HLC Training Center', content: 'HLC offers a variety of professional training programs in areas such as software development, data science, and cybersecurity.' },
  { id: 6, image: c2, title: 'Proservices Training Company', content: 'which offers continuing professional training in different areas: Test and validation, Marketing, Design, Project Management.' },
  { id: 7, image: c1, title: 'HLC Training Center', content: 'HLC offers a variety of professional training programs in areas such as software development, data science, and cybersecurity.' },
  { id: 8, image: c2, title: 'Proservices Training Company', content: 'which offers continuing professional training in different areas: Test and validation, Marketing, Design, Project Management.' }
];

function Tcenters() {
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState('All');

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  const filteredCenters = () => {
    switch (filter) {
      case 'Latest':
        return allCenters.slice(0, 3);
      case 'Popular':
        return allCenters.slice(0, 2);
      default:
        return allCenters;
    }
  };

  return (
    <>
    <div className="searchcour"><SearchBar></SearchBar></div>
      <Header />
      <div className='backgroundt'>
        <div className="pict">
          <img src={Train} alt="Tailored Course Recommendations" />
        </div>
        <div className='containert'>
          <div className='titre-centretrain'>
            <h1>Featured training centers</h1>
            <p>Explore the offerings and achievements of our featured training centers.</p>
          </div>
        </div>

        <div className='filtre'>
          <button className='btn' onClick={() => handleFilter('All')}>All</button>
          <button className='btn' onClick={() => handleFilter('Latest')}>Latest</button>
          <button className='btn' onClick={() => handleFilter('Popular')}>Popular</button>
          <button className='btn' onClick={togglePopup}><img src={Slide} alt="Slider" /></button>
          {showPopup && <Popuptraining onClose={togglePopup} />}
        </div>

        <div className="card-container-center">
          <div className="row">
            {filteredCenters().map(center => (
              <div key={center.id} className="col-md-6 col-lg-3 mb-4">
                <div className="card">
                  <img className="card-img-top img-fluid clickable-image" src={center.image} alt={center.title} />
                  <div className="card-body">
                    <h3 className="card__title">{center.title}</h3>
                    <p className="card__content">{center.content}</p>
                    <div className="card__arrow">
                    <Link to='/trainingdetails'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25" width="25">
                          <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='view'>
          <button className='viewmore'>View more</button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Tcenters;
