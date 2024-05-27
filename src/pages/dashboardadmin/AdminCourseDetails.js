import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Adminnav from '../../component/adminnav';
import Feather from 'feather-icons';
import './admin.css'; // Import your CSS file here

const AdminCourseDetails = () => {
  const { courseId } = useParams();
  const [courseDetails, setCourseDetails] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        console.error('Admin token not found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8084/admin/courses/${courseId}`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCourseDetails(response.data);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
  }, [courseId]);

  if (!courseDetails) {
    return <div>Loading...</div>;
  }

  Feather.replace();

  return (
    <div>
      <Adminnav />
      <main id="main" className="main-content"> {/* Updated classname */}
        <div className="page-title">
          
        </div>
        <section className="section profile-section"> {/* Updated classname */}
          <div className="row">
            <div className="col-lg-8">
              <div className="course-details-container"> {/* Updated classname */}
                <div className="course-details-body"> {/* Updated classname */}
                  <h5 className="center-details-card-title">Course Information</h5> {/* Updated classname */}
                
                  <p><strong className="text-secondary">Title:</strong> {courseDetails.Course_title}</p>
                  <p><strong className="text-secondary">Description:</strong> {courseDetails.course_description}</p>
                  <p><strong className="text-secondary">Instructor:</strong> {courseDetails.instructor_name}</p>
                  <p><strong className="text-secondary">Price:</strong> {courseDetails.Price}</p>
                  <p><strong className="text-secondary">Duration:</strong> {courseDetails.duration}</p>
                  <p><strong className="text-secondary" >Date:</strong> {courseDetails.date}</p>
                  <p><strong className="text-secondary">Language:</strong> {courseDetails.language}</p>
                  <p><strong className="text-secondary" >Method:</strong> {courseDetails.method}</p>
                  <p><strong className="text-secondary">Group:</strong> {courseDetails.group}</p>
                  <p><strong className="text-secondary">Level:</strong> {courseDetails.level}</p>
                  <p><strong className="text-secondary">Category:</strong> {courseDetails.category}</p>
                  <p><strong className="text-secondary">Content:</strong> {courseDetails.content}</p>
                  <p><strong className="text-secondary">Goals:</strong> {courseDetails.goals}</p>
                  <p><strong className="text-secondary">Certification:</strong> {courseDetails.certification}</p>
                  <p><strong className="text-secondary">Status:</strong> {courseDetails.status}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="course-details-container"> {/* Updated classname */}
                <div className="course-details-body text-center"> {/* Updated classname */}
                  <img
                    src={`http://localhost:8084${courseDetails.course_pic}`}
                    alt="Course"
                    className="course-details-img-fluid"
                    style={{ maxWidth: '100%' ,  }}
                  />
                  <h5 className="course-details-title mt-3">Instructor</h5> {/* Updated classname */}
                  <img
                    src={`http://localhost:8084${courseDetails.instructor_pic}`}
                    alt="Instructor"
                    className="course-details-img-fluid"
                    style={{ maxWidth: '100px', height: '100px' , borderRadius:'50px' }}
                  />
                  <p>{courseDetails.instructor_name}</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default AdminCourseDetails;
