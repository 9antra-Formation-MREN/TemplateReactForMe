import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import uxImage from '../img/section/UX.png';
import reactJsImage from '../img/section/reactjs.jpeg';
import machineLearningImage from '../img/section/machine.jpeg';
import Bookmark from './Bookmark'; // Import the Bookmark component
import centerImage from '../img/section/center.png';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const CoursesCarousel = () => {
    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        desktop: {
            breakpoint: { max: 1024, min: 768 },
            items: 3,
            slidesToSlide: 3 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 768, min: 580 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 580, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div className="courses-area section-padding40 fix">
            <Container>
                <div className="section-tittle text-center mb-60">
                    <h2>Discover Popular Courses</h2>
                    <h3>Explore our most popular courses offered.</h3>
                </div>
                <Carousel
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    transitionDuration={500}
                    containerClass="carousel-container"
                    removeArrowOnDeviceType={["tablet", "mobile"]}
                    dotListClass="custom-dot-list-style"
                    itemClass="carousel-item-padding-40-px"
                >
                    <CourseCard
                        image={uxImage}
                        category="UI/UX Design"
                        title="Learn UI/UX: The Basics"
                        center="Proservices Training Company"
                        description="Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital productsDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React."
                    />
                    <CourseCard
                        image={reactJsImage}
                        category="React"
                        title="Full Course React JS"
                        center="Proservices Training Company"
                        description="Dive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React."
                    />
                    <CourseCard
                        image={machineLearningImage}
                        category="Machine Learning"
                        title="Machine Learning Specialization"
                        center="Proservices Training Company"
                        description="Discover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React."
                    />
                    <CourseCard
                        image={uxImage}
                        category="UI/UX Design"
                        title="Learn UI/UX: The Basics"
                        center="Proservices Training Company"
                        description="Unlock the secrets of exceptional user experiences with our UI/UX design training program. Dive into the fundamentals of UI/UX design to create intuitive, visually appealing digital productsDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React."
                    />
                    <CourseCard
                        image={reactJsImage}
                        category="React"
                        title="Full Course React JS"
                        center="Proservices Training Company"
                        description="Dive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React."
                    />
                    <CourseCard
                        image={machineLearningImage}
                        category="Machine Learning"
                        title="Machine Learning Specialization"
                        center="Proservices Training Company"
                        description="Discover the world of machine learning in our course! Learn to build predictive models, extract insights from data, and delve into advanced topics like deep learningDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using ReactDive into the world of React with our comprehensive course! Discover how to build dynamic and interactive web interfaces using React."
                    />
                </Carousel>
            </Container>
        </div>
    );
};

const CourseCard = ({ image, category, title, center, description }) => {
    return (
        <div className="carousel-item-padding-40-px">
            <div className="properties__card">
                <div className="properties__img overlay1">
                    <img src={image} alt={title} />
                </div>
                <div className="properties__caption">
                    <div className="category d-flex align-items-center">
                        <p>{category}</p>
                        <div className="emna-course ms-auto d-flex align-items-center">
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
                    <a href="#" className="discover">Enroll Now</a>
                </div>
            </div>
        </div>
    );
};

export default CoursesCarousel;
