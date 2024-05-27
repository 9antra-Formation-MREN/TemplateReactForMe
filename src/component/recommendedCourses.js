import React, { useContext, useEffect, useState } from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import AuthContext from '../component/AuthContext';
import Slider from 'react-slick';
import Bookmark from '../component/Bookmark'; // Import the Bookmark component
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import nodeImage from '../img/section/node.png';
import mongodbImage from '../img/section/mongo.png';
import angularImage from '../img/section/machine.jpeg';

const RecommendedCourses = () => {
  const { isAuthenticated } = useContext(AuthContext);
  const [recommendedCourses, setRecommendedCourses] = useState([]);

  useEffect(() => {
    if (isAuthenticated) {
      // Mock data for recommended courses
      const mockCourses = [
        {
          id: 1,
          title: 'Learn Full Stack Node.js',
          description: 'Web development',
          image: nodeImage,
        },
        {
          id: 2,
          title: 'MongoDB Course',
          description: 'Web development',
          image: mongodbImage,
        },
        {
          id: 3,
          title: 'Discover Angular',
          description: 'Web development',
          image: angularImage,
        },
        {
          id: 4,
          title: 'Learn Full Stack Node.js',
          description: 'Web development',
          image: nodeImage,
        },
        {
          id: 5,
          title: 'MongoDB Course',
          description: 'Web development',
          image: mongodbImage,
        }
      ];
      setRecommendedCourses(mockCourses);
    }
  }, [isAuthenticated]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    isAuthenticated && (
      <section className="recommended-courses-section">
        <Container>
          <h2>Recommended courses</h2>
          <p>Explore our recommended courses for you.</p>
          <div className="row justify-content-center">
            <div className="row mx-5 px-5">
              <Slider {...settings}>
                {recommendedCourses.map((course, index) => (
                  <div key={index}>
                    <Card className="course-card">
                      <div className="recommendedmark">
                     
                      </div>
                      <Card.Img variant="top" src={course.image} alt={course.title} />
                      <Card.Body>
                        <div className="elmark">
                      <Bookmark />
                      </div>
                        <div className="recom">
                          <Card.Text>{course.description}</Card.Text>
                        </div>
                        <Card.Title>{course.title}</Card.Title>
                        
                        <Button className="recombutton" href={`/course/${course.id}`}>Enroll Now</Button>
                      </Card.Body>
                    </Card>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </Container>
      </section>
    )
  );
}

export default RecommendedCourses;
