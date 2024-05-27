import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../css/courses.css';
import '../css/homepage.css';
import '../css/training.css';
import Header from '../component/header';
import Footer from '../component/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Train from '../img/section/SAB.png';
import Slide from '../img/section/Slider.png';
import Popup from '../component/filter';
import uxImage from '../img/section/UX.png';
import reactJsImage from '../img/section/reactjs.jpeg';
import machineLearningImage from '../img/section/machine.jpeg';
import centerImage from '../img/section/center.png';
import Bookmark from '../component/Bookmark'; 
import SearchBar from '../component/searchbar';

function Allcourses() {
  const [showPopup, setShowPopup] = useState(false);
  const [filter, setFilter] = useState('All'); // Initialize filter state

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };

  // Function to handle filter button clicks
  const handleFilter = (filterType) => {
    setFilter(filterType);
  };

  // Filtered courses based on the current filter
  const filteredCourses = (filter) => {
    switch (filter) {
      case 'All':
        return [
          <CourseCard
            key="1"
            image={uxImage}
            category="UI/UX Design"
            title="Learn UI/UX: The Basics"
            center="Proservices Training Company"
            description="Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products."
          />,
          <CourseCard
            key="2"
            image={reactJsImage}
            category="React"
            title="Full Course React JS"
            center="Proservices Training Company"
            description="Dive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products."
          />,
          <CourseCard
            key="3"
            image={machineLearningImage}
            category="Machine Learning"
            title="Machine Learning Specialization"
            center="Proservices Training Company"
            description="Discover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningUnlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.."
          />,
          <CourseCard
            key="4"
            image={uxImage}
            category="UI/UX Design"
            title="Learn UI/UX: The Basics"
            center="Proservices Training Company"
            description="Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products."
          />,
          <CourseCard
            key="5"
            image={reactJsImage}
            category="React"
            title="Full Course React JS"
            center="Proservices Training Company"
            description="Dive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactUnlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.."
          />,
          <CourseCard
            key="6"
            image={machineLearningImage}
            category="Machine Learning"
            title="Machine Learning Specialization"
            center="Proservices Training Company"
            description="Discover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learning.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products."
          />
        ];
      case 'Latest':
      
        return [
          <CourseCard
          key="3"
          image={machineLearningImage}
          category="Machine Learning"
          title="Machine Learning Specialization"
          center="Proservices Training Company"
          description="Discover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learning.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products."
        />,
        <CourseCard
        key="5"
        image={reactJsImage}
        category="React"
        title="Full Course React JS"
        center="Proservices Training Company"
        description="Dive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products.Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products."
      />
        

        ];
      case 'Popular':
        
        return [
          <CourseCard
          key="2"
          image={reactJsImage}
          category="React"
          title="Full Course React JS"
          center="Proservices Training Company"
          description="Dive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React."
        />,
        <CourseCard
            key="1"
            image={uxImage}
            category="UI/UX Design"
            title="Learn UI/UX: The Basics"
            center="Proservices Training Company"
            description="Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital products."
          />

        ];
      default:
        return [];
    }
  };

  return (
    <>
    <div className="searchcour"><SearchBar></SearchBar></div>
      <Header />
      <div className="pict">
        <img src={Train} alt="Tailored Course Recommendations" />
      </div>
      <div className="containertcourse">
        <div className="titre-centre3">
          <h1>Featured courses</h1>
          <p>Explore the offerings and achievements of our featured training centers.</p>
        </div>
      </div>
      <div className="filtre">
        <button className="btn" onClick={() => handleFilter('All')}>All</button>
        <button className="btn" onClick={() => handleFilter('Latest')}>Latest</button>
        <button className="btn" onClick={() => handleFilter('Popular')}>Popular</button>
        <button className="btn" onClick={togglePopup}>
          <img src={Slide} alt="Slider" />
        </button>
        {/* Conditionally render the pop-up */}
        {showPopup && <Popup onClose={togglePopup} />}
      </div>

      <div className="courses-section section-padding40 fix card-container">
        <div className="row justify-content-center">
          {filteredCourses(filter)}
        </div>
      </div>

      <Footer />
    </>
  );
}

const CourseCard = ({ image, category, title, center, description }) => {
  return (
<>

    <div className="col-lg-3 col-md-5 mb-4 p-2 deplacement">
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
                        <img src={centerImage} className="mb-2" height="20px" alt={center} />
                        <h4 className="mb-2">{center}</h4>
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

export default Allcourses;
