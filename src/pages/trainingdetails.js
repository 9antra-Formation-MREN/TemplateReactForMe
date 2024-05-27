import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Bookmark from '../component/Bookmark'; // Import the Bookmark component
import { MapPin, Mail, Phone, UserPlus, UserMinus } from 'react-feather';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import '../css/homepage.css';
import '../css/trainingdetails.css';
import Header from '../component/header';
import Footer from '../component/footer';
import Train from '../img/section/SAB.png';
import Profile from '../img/section/dd.png';
import UXcourse from '../img/section/UX.png';
import Popup from '../component/filter'; // Updated import
import Slide from '../img/section/Slider.png';
import event1 from '../img/section/EVENT.png';
import alfa from '../img/section/alfa.png';
import BLANC from '../img/section/Arrow-blanc.png';
import centerImage from '../img/section/center.png';

function Trainingdetails() {
  const [isFollowed, setIsFollowed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleFollowClick = () => {
    setIsFollowed(!isFollowed);
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  return (
    <>
         <Header />
      <div className="pictrain">
        <img src={Train} alt="Tailored Course Recommendations" />
      </div>
      <div className="training-detail-overlay">
        <div className="training-detail-card">
          <div className="row">
            <div className="col-lg-8 col-md-5">
              <h2>Proservices Training Company</h2>
              <p className="description">
                Proservices Training Company is a professional training center and consulting firm in Tunisia approved by the Ministry of Vocational Training and Employment No. 12/877/22. Our firm has been present on the professional training market since 2018.
                <br /><br />
                offers continuing professional training in different areas: Test and validation, Marketing, Design, Project Management, Human Resources Management and IT Development while offering assistance and advice on a digital and practical level.
              </p>
              <button className="btn-follow" onClick={handleFollowClick}>
                {isFollowed ? <UserMinus className="iconfollow" /> : <UserPlus className="iconfollow" />} {isFollowed ? 'Following' : 'Follow'}
              </button>
              <div className="contact-info-train">
                <p><MapPin size={38} className="iconcenter" /> Tunis, rue de gabes</p>
                <p><Mail size={38} className="iconcenter" /> Proscomapany@gmail.com</p>
                <p><Phone size={38}  className="iconcenter" /> +216 55 897 454</p>
              </div>
            </div>
            <div className="col-lg-4 col-md-3 text-center">
              <img src={Profile} alt="Tailored Course Recommendations" className='prof' />
            </div>
          </div>
        </div>
      </div>
      <div className='titre-button'>
        <h1 className='discover-courses'>Discover available courses</h1>
        <div className='train-filtre'>
          <button className="btn" onClick={togglePopup}>
            <img src={Slide} alt="Slider" />
          </button>
          {showPopup && <Popup onClose={togglePopup} />}
        </div>
      </div>
      <div className="courses-section section-padding40 fix card-container ml-5">
    
        <Container>
          <Row className="justify-content-center">
            <CourseCard
              image={UXcourse}
              category="UI/UX Design"
              title="Learn UI/UX: The Basics"
              center="Proservices Training Company"
              description="Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital producDiscover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningDiscover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningts."
              price="FREE"
            />
            <CourseCard
              image={UXcourse}
              category="React"
              title="Full Course React JS"
              center="Proservices Training Company"
              description="Dive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReacDiscover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningDiscover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningt."
              price="FREE"
            />
            <CourseCard
              image={UXcourse}
              category="Machine Learning"
              title="Machine Learning Specialization"
              center="Proservices Training Company"
              description="Discover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learninDiscover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningDiscover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningg."
              price="FREE"
              
            />
          </Row>
        </Container>
        </div>
    
        <div className="container mt-5">
        <h1 className='discover-courses'>Discover available events</h1>
  
      <div className="events">
      <div className="col-lg-12 col-md-6">
            <div className="item">
              <div className="row">
                <div className="col-lg-3">
                  <div className="image">
                    <img src={event1} alt="" />
                  </div>
                </div>
                <div className="col-lg-9">
                  <ul>
                    <li>
                      <span className="category">Buisness</span>
                      <h4>Online Business workshop</h4>
                      <div className="event-center">
                    <img src={alfa} alt="" />
                    <h5> Posted by Three alfa formation</h5>
                  </div>
                    </li>
                    <li>
                      <span>Date:</span>
                      <h6>16 Feb 2036</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>22 Hours</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>$120</h6>
                    </li>
                  </ul>
                  <a href="#" className="arrow-button">
    <i>
        <img src={BLANC} alt="Arrow Button" />
    </i>
</a>
                </div>
              </div>
            </div>
          </div>
      </div>
       
      </div>
     
      
      <Footer />
    </>
  );
}

const CourseCard = ({ image, category, title, center, description }) => {
  return (
<>

    <div className="col-lg-4 col-md-5 mb-4">
      <div className="properties__card">
                <div className="properties__img overlay1">
                    <img src={image} alt={title} />
                </div>
                <div className="properties__caption">
                    <div className="category d-flex align-items-center">
                        <p>{category}</p>
                        <div className=" emna-course ms-auto d-flex align-items-center">
                            <h5 className="free-price-course">FREE</h5>
                           <div className='marque-bookmark'> <Bookmark /></div> 
                        </div>
                        
                    </div>
                    
                    <div className="course-titre">
                        <h3>{title}</h3>
                    </div>
                    <div className="center-name">
                        <img src={centerImage} height="20px" alt={center} />
                        <h4>{center}</h4>
                    </div>
                    <p>{description}</p>
                    <div className="properties__footer d-flex justify-content-between">
                        <ul>
                            <li>6-8 week course</li>
                            <li>Certified</li>
                        </ul>
                    </div>
                    <Link to={`/detailscours/`} className="discover">Enroll Now</Link>
                </div>
            </div>
    </div>
    </>
  );
};
export default Trainingdetails;
