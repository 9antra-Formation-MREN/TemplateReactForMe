import React, { useContext } from 'react';
import Header from '../../component/header';
import Home from '../../component/slider';
import '../../css/homepage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import FrameImage from '../../img/section/Frame.png';
import Frame1Image from '../../img/section/Frame-1.png';
import Frame2Image from '../../img/section/Frame-2.png';
import CoursesSlider from '../../component/courses';
import TrainingCenters from '../../component/centers';
import UpcomingEvents from '../../component/events';
import Footer from '../../component/footer';
import RecommendedCourses from '../../component/recommendedCourses';
import AuthContext from '../../component/AuthContext';
import SearchBar from '../../component/searchbar';

function Homepage() {
    const { isAuthenticated } = useContext(AuthContext);
    

    return (
        <>
            <Header />
         <SearchBar></SearchBar>
            <Home />
            <div className="services-area ">
                <div className="container">
                    <div className="row justify-content-sm-center">
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="single-services mb-30">
                                <div className="features-icon">
                                    <img src={FrameImage} alt="Tailored Course Recommendations" />
                                </div>
                                <div className="features-caption">
                                    <h3>Tailored course<br /> recommendations</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="single-services mb-30">
                                <div className="features-icon">
                                    <img src={Frame1Image} alt="Diverse Trainings Options" />
                                </div>
                                <div className="features-caption">
                                    <h3>Diverse trainings <br /> options</h3>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-8">
                            <div className="single-services mb-30">
                                <div className="features-icon">
                                    <img src={Frame2Image} alt="Seamless Learning Experience" />
                                </div>
                                <div className="features-caption">
                                    <h3>Seamless learning<br /> experience</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container d-flex justify-content-center align-items-center" style={{ height: '20vh' }}>
                    <button className="more">
                        <span className="arrow"></span>
                        learn more about us
                    </button>
                </div>
            </div>
            {isAuthenticated && <RecommendedCourses />}
            <CoursesSlider />
            <TrainingCenters />
            <UpcomingEvents />
            <Footer />
        </>
    );
}

export default Homepage;
