import React from 'react';
import Button from './Button.js';
import './welcome.css';
import { Link } from 'react-router-dom';
import wlcm from '../../img/pictures/hi.png';

const Startlearner = ({ learnerId }) => {
  return (
    <div className="start-form">
      <div className="col-md-6">
        <div className="button-container">
          <div className="button-wrapper">
            {/* First Button */}
            <button className='buttons' style={{ marginRight: '20px' }}>
              <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}></Link>
            </button>
            {/* Second Button */}
            <button className='buttons' style={{ marginRight: '20px' }}>
              <Link to="/learner1" style={{ textDecoration: 'none', color: 'inherit' }}></Link>
            </button>
            {/* Third Button */}
            <button className='buttons'>
              <Link to="/learner2" style={{ textDecoration: 'none', color: 'inherit' }}></Link>
            </button>
          </div>
        </div>

        <h1>Welcome to For me</h1>
        <p>We're dedicated to helping you find the perfect learning experience tailored to your interests and preferences.
          By completing this form, you're taking the first step towards discovering courses that match your goals, whether it's
          advancing your career, exploring new hobbies, or expanding your knowledge. Let's get started on your learning journey!!
        </p>
        <div className="w-25">
          <img src={wlcm} alt="Welcome" />
        </div>
        <div className="col-md-12 mb-3">
          <Button className="buttonWithPadding">
            <Link to={`/learner1/${learnerId}`} style={{ textDecoration: 'none', color: 'inherit' }}>Continue</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Startlearner;
