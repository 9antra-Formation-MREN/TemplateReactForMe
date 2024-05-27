import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <section className="slider-area">
        

            <div className="slider-active">
                
                {/* Single Slider */}
                <div className="single-slider slider-height d-flex align-items-center">
                    <div className="container mt-5">
                        <div className="row">
                            
                            <div className=" col-lg-6 col-sm-8">
                                
                                <div  className="hero__caption" >
                                    
                                    <h2 data-animation="fadeInLeft" data-delay="0.2s" className="mr-5">For Me is the perfect match FOR YOU</h2>
                                    <p data-animation="fadeInLeft" data-delay="0.4s">Where Learners and Training Centers Align for 
                                        Your Personalized Learning Journey</p>
                                     
                                </div>
                                <Link to="/courses" style={{ '--clr': '#7808d0' }} className="button">
            <span className="button__icon-wrapper">
                <svg width="10" className="button__icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15">
                    <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                </svg>
                
                <svg className="button__icon-svg button__icon-svg--copy" xmlns="http://www.w3.org/2000/svg" width="10" fill="none" viewBox="0 0 14 15">
                    <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
                </svg>
            </span>
            Explore All
        </Link>
                            </div>
                        </div>
                    </div>          
                </div>
            </div>
        </section>
    );
};

export default Home;
