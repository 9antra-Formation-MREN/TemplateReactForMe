import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../component/centernav';
import axios from 'axios';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import ParticipantsModal from './participants';
import '../../css/centerdash.css';
import prosperImg from '../../img/section/user1.jpeg';
import prosperImg2 from '../../img/section/user2.jpeg';


function Courses() {
  const [courses, setCourses] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  // Sample static participants data
  const participants = [
    {
      profile_pic: prosperImg,
      name: "test",
      phone: "123-456-7890",
      email: "emna@example.com",
      occupation: "Software Engineer",
      level: "Advanced"
    },
    {
      profile_pic: prosperImg2,
      name: "test",
      phone: "987-654-3210",
      email: "saba@example.com",
      occupation: "Data Scientist",
      level: "Intermediate"
    }
    // Add more participants as needed
  ];

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const centerId = localStorage.getItem('ID_center');
        if (!centerId) {
          console.error('Center ID is not found in localStorage');
          return;
        }

        const response = await axios.get(`http://localhost:8084/center/${centerId}/courses`);
        console.log('Courses fetched successfully:', response.data);
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
        if (error.response) {
          console.error('Server responded with status code:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    };

    fetchCourses();
  }, []);

  const handleAddCourseClick = () => {
    navigate('/centerdashboard/addcourse');
  };

  const handleCardImageClick = (courseId) => {
    navigate(`/centerdashboard/coursesdetails/${courseId}`);
  };

  const handleDeleteCourse = async (courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2C599D',
      cancelButtonColor: '#FB9B50',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8084/courses/${courseId}`);
          if (response.status === 200) {
            setCourses(courses.filter(course => course.ID_course !== courseId));
            Swal.fire(
              'Deleted!',
              'Your course has been deleted.',
              'success'
            );
          }
        } catch (error) {
          console.error('Error deleting course:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the course.',
            'error'
          );
        }
      }
    });
  };

  const handleViewParticipants = () => {
    setIsModalOpen(true);
  };

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return { color: 'grey' };
      case 'approved':
        return { color: '#2C599D' };
      case 'rejected':
        return { color: '#FB9B50' };
      default:
        return {};
    }
  };

  useEffect(() => {
    feather.replace();
  }, [courses]);

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="pagetitle">
          <br />
          <button onClick={handleAddCourseClick} className="add-course-btn">Add Your Course</button>
          <br /><br />
          {courses.length === 0 ? (
            <p>No courses available. Please add a course.</p>
          ) : (
            <div className="course-card-container">
              {courses.map((course, index) => (
                <div className="course-card" key={index}>
                  <img
                    className="course-card-img"
                    src={course.course_pic ? `http://localhost:8084${course.course_pic}` : "img/img.jpg"}
                    alt="Card image cap"
                    onClick={() => handleCardImageClick(course.ID_course)}
                  />
                  <div className="course-card-body">
                    <h4 className="course-card-title">{course.Course_title}</h4>
                    <div className="course-card-button-group">
                      <button
                        type="button"
                        className="course-card-btn-view"
                        onClick={handleViewParticipants}
                      >
                        View participants
                      </button>
                      <button
                        type="button"
                        className="course-card-btn-edit"
                        onClick={() => handleCardImageClick(course.ID_course)}
                      >
                        <i className="icon5" data-feather="edit-2"></i>
                      </button>
                      <button
                        type="button"
                        className="course-card-btn-delete"
                        onClick={() => handleDeleteCourse(course.ID_course)}
                      >
                        <i className="icon5" data-feather="trash-2"></i>
                      </button>
                    </div>
                    <p className="course-card-status" style={getStatusStyle(course.status)}>{course.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {isModalOpen && (
        <ParticipantsModal participants={participants} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default Courses;
