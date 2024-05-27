import React from 'react';
import Button from '../learnerform/Button';
import './tcwelc.css';
import { Link } from 'react-router-dom';
import wlcmcenter from '../../img/pictures/training.png';

const Tcwelcome = ({ centerId }) => {
  return (
    <div className='pagebackground'>
      <div className="training-center">
        <div className="row">
          <div className="col-md-6">
            <div className="button-container">
              <div className="button-wrapper">
                {/* First Button */}
                <button className='buttons' style={{ marginRight: '20px' }}>
                  <Link to="/" style={{ textDecoration: 'none', color: 'inherit' }}></Link>
                </button>
                {/* Second Button */}
                <button className='buttons' style={{ marginRight: '20px' }}>
                  <Link to="/Tcform1" style={{ textDecoration: 'none', color: 'inherit' }}></Link>
                </button>
                {/* Third Button */}
                <button className='buttons'>
                  <Link to="/Tcform2" style={{ textDecoration: 'none', color: 'inherit' }}></Link>
                </button>
              </div>
            </div>
            <h1>Welcome to For me</h1>
            <p>We're here to boost your training center's visibility and engagement with learners looking for tailored learning experiences.
              By filling out this form, you're on your way to showcasing your courses to interested students, whether they're advancing careers
              or exploring new interests.
              Let's kickstart your journey to connect with eager learners and elevate your training center's presence.
            </p>
            <div className="w-25">
              <img src={wlcmcenter} alt="Welcome" />
            </div>
            <div className="col-md-12 mb-3 wlecome">
              <Link to="/centerforms/tcform1">
                <Button color="primary">Continue</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tcwelcome;
