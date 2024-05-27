import React from 'react';
import event1 from '../img/section/EVENT.png';
import alfa from '../img/section/alfa.png';
import BLANC from '../img/section/Arrow-blanc.png';
const UpcomingEvents = () => {
  return (
    <div className="section events" id="events">
      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-12 text-center">
            <div className="section-heading ">
              
              <h1>Upcoming Events</h1>
              <h2>Stay updated with our upcoming events and get involved.</h2>
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
    </div>
  );
};

export default UpcomingEvents;
