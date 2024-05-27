import React, { useEffect, useState } from 'react';
import Adminnav from '../../component/adminnav';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import feather from 'feather-icons';

function Requests() {
  const [pendingCourses, setPendingCourses] = useState([]);

  useEffect(() => {
    const fetchPendingCourses = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        console.error('Admin token not found in localStorage');
        return;
      }

      try {
        const decodedToken = jwtDecode(token);
        const adminId = decodedToken.ID_admin;
        const response = await axios.get('http://localhost:8084/pending-courses', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setPendingCourses(response.data);
      } catch (error) {
        console.error('Error fetching pending courses:', error);
      }
    };

    fetchPendingCourses();
  }, []);

  const handleApproveCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.post('http://localhost:8084/admin/approve-course', { ID_course: courseId }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPendingCourses(pendingCourses.filter(course => course.ID_course !== courseId));
    } catch (error) {
      console.error('Error approving course:', error);
    }
  };

  const handleRejectCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.post('http://localhost:8084/admin/reject-course', { ID_course: courseId }, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setPendingCourses(pendingCourses.filter(course => course.ID_course !== courseId));
    } catch (error) {
      console.error('Error rejecting course:', error);
    }
  };
  
  feather.replace();

  return (
    <div>
      <Adminnav />
      <main id="main" className="main">
        <div className="pagetitle">
       
        </div>
        <section className="section requests">
          <div className="row">
            {pendingCourses.length === 0 ? (
              <p>No pending courses available.</p>
            ) : (
              pendingCourses.map(course => (
                <div className="col-lg-3 col-md-4 mt-5" key={course.ID_course}>
                  <div className="card">
                    <img
                      className="card-img-top img-fluid clickable-image"
                      src={course.course_pic ? `http://localhost:8084${course.course_pic}` : "img/img.jpg"}
                      alt="Course image"
                    />
                    <div className="card-body">
                      <h4 className="card-title text-center">{course.Course_title}</h4>
                     
                      <div className="button-group ml-4 pt-2">
  <button
    type="button"
    className="btn btn-approve"
    onClick={() => handleApproveCourse(course.ID_course)}
    style={{ color:'white' ,backgroundColor: '#2C599D', borderRadius: '5px', marginRight: '5px' }}
  >
    Approve
  </button>
  <button
    type="button"
    className="btn btn-reject"
    onClick={() => handleRejectCourse(course.ID_course)}
    style={{ color:'white' ,backgroundColor: '#FB9B50', borderRadius: '5px' }}
  >
    Reject
  </button>
</div>

                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default Requests;
