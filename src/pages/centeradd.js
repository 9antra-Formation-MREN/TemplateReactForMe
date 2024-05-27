import React from 'react';
import '../css/homepage.css';
import '../css/centeradd.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from '../component/header';
import Footer from '../component/footer';
import ADD from '../img/hero/addcou.png';
import ppl from '../img/section/ppl.png';
import v1 from '../img/section/v1.png';
import v2 from '../img/section/v2.png';
import v3 from '../img/section/v3.png';
import doc from '../img/hero/doc.png';
import ins from '../img/hero/ins.png';
import cus from '../img/hero/cus.png';
import emp from '../img/hero/emp.png';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Centeradd() {
  return (
    <>
       <Header/>
       <div className="add-header">
        <img src={ADD} alt="header" />
        <div className='add-title'>
            <h1>Empower Your Expertise<br />
                with FOR ME</h1>
            <p>Where Instructors Connect, Courses  Flourish,<br /> and Learners Thrive.</p>
            <Link to="/signupcenter" className="bouton-add">Join us</Link>
        </div>
      </div>
      
      <div className="features-training-centers-container">
        <div className="features-training-centers-image-section">
          <img src={ppl} alt="People" className="features-training-centers-people-image" />
        </div>
        <div className="training-features-section">
          <h2>Features for Training Centers</h2>
          <div className="features-training-centers-feature-item">
            <img src={v1} alt="Visibility Icon" className="features-training-centers-feature-icon" />
            <div>
              <h3>Enhanced Visibility</h3>
              <p>Reach a vast audience of eager learners actively seeking courses in your area of expertise. Stand out among competitors and increase your training center's exposure.</p>
            </div>
          </div>
          <div className="features-training-centers-feature-item">
            <img src={v2} alt="Promotion Icon" className="features-training-centers-feature-icon" />
            <div>
              <h3>Tailored Promotion</h3>
              <p>Use advanced targeting tools to tailor course details like descriptions, pricing, and schedules to meet the preferences of potential learners.</p>
            </div>
          </div>
          <div className="features-training-centers-feature-item">
            <img src={v3} alt="Insights Icon" className="features-training-centers-feature-icon" />
            <div>
              <h3>Data-Driven Insights</h3>
              <p>Track enrollment trends, monitor feedback, and optimize courses with comprehensive analytics in our partner dashboard.</p>
            </div>
          </div>
       
          <Link to="/signupcenter" className="features-training-centers-join-now-button">Join us Now</Link>
        </div>
      </div>

      <div className="course-submission-container">
        <h2 className="course-submission-title">Course Submission Process</h2>
        <div className="course-submission-steps">
          <div className="course-submission-step">
            <img src={ins} alt="Account Icon" className="course-submission-icon" />
            <p>1. Create an account with FOR ME to gain access to your own center’s dashboard.</p>
          </div>
          <div className="course-submission-step">
            <img src={emp} alt="Instruction Icon" className="course-submission-icon" />
            <p>2. Fill out course title, description, duration, pricing, schedule, and any prerequisites or special requirements.</p>
          </div>
          <div className="course-submission-step">
            <img src={doc} alt="Upload Icon" className="course-submission-icon" />
            <p>3. Enhance your listing with images, videos, or promotional materials to showcase your training center and attract learners.</p>
          </div>
          <div className="course-submission-step">
            <img src={cus} alt="Review Icon" className="course-submission-icon" />
            <p>4. Once details are filled, submit your course for our team’s review to ensure quality and maximize visibility.</p>
          </div>
        </div>
      </div>

      <Footer/>
    </>
  );
}

export default Centeradd;
