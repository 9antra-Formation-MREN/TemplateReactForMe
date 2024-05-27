import React from 'react'
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../css/homepage.css';
import '../css/events.css';
import event1 from '../img/section/EVENT.png';
import alfa from '../img/section/alfa.png';
import Header from '../component/header';
import Footer from '../component/footer';
import Train from '../img/section/SAB.png';
import SearchBar from '../component/searchbar';
import BLANC from '../img/section/Arrow-blanc.png';



function Events() {
  return (
    <>
    <div className="searchcour"><SearchBar></SearchBar></div>
      <Header />
      <div className='title-event'>
      <h1> Discover Events </h1>
      <p>Explore the events of our featured training centers.</p>
     </div>
      <div className="pict">
        <img src={Train} alt="Tailored Course Recommendations" />
      </div>
     
     <div className='eventpart '>
     <div className="section events" id="events">
      <div className="container mt-5">
        <div className="row">
          
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
                      <h6>24 Feb 2036</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>30 Hours</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>$320</h6>
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
                      <h6>12 Mar 2036</h6>
                    </li>
                    <li>
                      <span>Duration:</span>
                      <h6>48 Hours</h6>
                    </li>
                    <li>
                      <span>Price:</span>
                      <h6>$440</h6>
                    </li>
                  </ul>
                  <Link to={`/eventdetails`} className="arrow-button">
              <i>
                <img src={BLANC} alt="Arrow Button" />
              </i>
            </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
    <Footer/>
    </>
  )
}

export default Events
