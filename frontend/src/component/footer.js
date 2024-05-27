import React from 'react';
import logo from '../img/LOGO/logo.png';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="containerfooter">
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="logo-foot">
            <img src={logo} alt="Logo" />
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="customers">
            <h5>Customers</h5>
            <Link to="/about"><p>Learner</p></Link>
            <Link to="/about"><p>Training centers</p></Link>
            <div className="d-flex justify-content-center">
              <div className="boutonfooter">
                <Link to="/centeradd" className="ADD"><h6>Add your course</h6></Link>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="services">
            <h5>Services</h5>
            <Link to="/courses"><p>Courses</p></Link>
            <Link to="/training-centers"><p>Training centers</p></Link>
            <Link to="/events"><p>Events</p></Link>
            <Link to="/about"><p>About</p></Link>
            <Link to="/contact"><p>Contact</p></Link>
          </div>
        </div>
        <div className="col-lg-3 col-md-6 mb-4">
          <div className="follow-us">
            <h5>Follow Us</h5>
            <div className="socialmedia d-flex justify-content-center">
              <a href="https://www.facebook.com"><FaFacebook className="social-icon" /></a>
              <a href="https://www.instagram.com"><FaInstagram className="social-icon" /></a>
              <a href="https://www.twitter.com"><FaTwitter className="social-icon" /></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
