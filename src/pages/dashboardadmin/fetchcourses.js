import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Adminnav from '../../component/adminnav';
import Feather from 'feather-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const CoursesFetch = () => { // Updated component name
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        console.error('Admin token not found in localStorage');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8084/admin/coursesfetch', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setCourses(response.data);
      } catch (error) {
        console.error('Error fetching courses:', error);
      }
    };

    fetchCourses();
  }, []);

  const handleDeleteCourse = async (courseId) => {
    try {
      const token = localStorage.getItem('admin_token');
      const response = await axios.delete(`http://localhost:8084/admin/courses/${courseId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setCourses(courses.filter(course => course.ID_course !== courseId));
      MySwal.fire('Deleted!', 'The course has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting course:', error);
      MySwal.fire('Error!', 'Failed to delete the course.', 'error');
    }
  };

  const confirmDelete = (courseId) => {
    MySwal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2C599D',
      cancelButtonColor: '#FB9B50',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteCourse(courseId);
      }
    });
  };

  const handleDetailsClick = (courseId) => {
    navigate(`/dashboardadmin/admincoursedetails/${courseId}`);
  };

  useEffect(() => {
    Feather.replace();
  }, []);

  return (
    <div>
      <Adminnav />
      <main id="main" className="main-content"> {/* Updated classname */}
        <div className="page-title">
       
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="course-list-card"> {/* Updated classname */}
                <div className="card-body">
                  <h5 className="course-list-title">Courses List</h5> {/* Updated classname */}
                  {courses.length === 0 ? (
                    <p>No courses available.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Picture</th>
                            <th>Title</th>
                            <th>Instructor</th>
                            <th>Status</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {courses.map(course => (
                            <tr key={course.ID_course}>
                              <td>{course.ID_course}</td>
                              <td>
                                <img
                                  src={`http://localhost:8084${course.course_pic}`}
                                  alt="Course"
                                  className="img-fluid rounded-circle"
                                  style={{ width: '50px', height: '50px' }}
                                />
                              </td>
                              <td>{course.Course_title}</td>
                              <td>{course.instructor_name}</td>
                              <td>{course.status}</td>
                              <td className="d-flex flex-column flex-md-row p-4">
                              <button
  className="btn btn-info btn-sm mr-md-2 mb-2 mb-md-0"
  onClick={() => handleDetailsClick(course.ID_course)}
  style={{ backgroundColor: '#2C599D', color: 'white' }} // Blue color for Details
>
  Details
</button>
<button
  className="btn btn-danger btn-sm"
  onClick={() => confirmDelete(course.ID_course)}
  style={{ backgroundColor: '#FB9B50', color: 'white' }} // Orange color for Delete
>
  Delete
</button>

                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CoursesFetch;
