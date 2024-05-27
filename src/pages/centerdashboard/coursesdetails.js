import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Nav from '../../component/centernav';
import axios from 'axios';
import feather from 'feather-icons';
import '../../css/centerdash.css'

const CourseDetailsUnique = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState({});
  const [courseContent, setCourseContent] = useState([]);
  const [learningGoals, setLearningGoals] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const centerId = localStorage.getItem('ID_center');
      if (!centerId) {
        console.error('Center ID not found in localStorage');
        return;
      }
      try {
        const response = await axios.get(`http://localhost:8084/coursesdetails/${courseId}?centerId=${centerId}`);
        const data = response.data;
        setCourse(data);
        setCourseContent(data.content ? data.content.split('\n') : []);
        setLearningGoals(data.goals ? data.goals.split('\n') : []);
      } catch (error) {
        console.error('Error fetching course details:', error);
      }
    };

    fetchCourseDetails();
    feather.replace();
  }, [courseId]);

  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const centerId = localStorage.getItem('ID_center');
    if (!centerId) {
      console.error('Center ID not found in localStorage');
      return;
    }
    try {
      await axios.put(`http://localhost:8084/coursesdetails/${courseId}?centerId=${centerId}`, {
        ...course,
        content: courseContent.join('\n'),
        goals: learningGoals.join('\n'),
      });
      alert('Course details updated successfully');
    } catch (error) {
      console.error('Error updating course details:', error);
      alert('Failed to update course details');
    }
  };

  const addPart = (type) => {
    if (type === 'courseContent') {
      setCourseContent([...courseContent, '']);
    } else if (type === 'learningGoals') {
      setLearningGoals([...learningGoals, '']);
    }
  };

  const removePart = (type, index) => {
    if (type === 'courseContent') {
      const updatedContent = [...courseContent];
      updatedContent.splice(index, 1);
      setCourseContent(updatedContent);
    } else if (type === 'learningGoals') {
      const updatedGoals = [...learningGoals];
      updatedGoals.splice(index, 1);
      setLearningGoals(updatedGoals);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCourse({ ...course, [name]: value });
  };

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="course-page-title">
          <button onClick={() => navigate('/centerdashboard/addcourse')} className="course-add-course-btn">Add Your Course</button>
        </div>

        <section className="course-section profile" style={{ marginTop: '5px' }}>
          <div className="row">
            <div className="col-xl-4">
              <div className="cards-course-details profile-cards-course-details">
                <div className="cards-course-details-body profile-cards-course-details-body">
                  <img src={course.course_pic ? `http://localhost:8084${course.course_pic}` : "/img/img.jpg"} alt="Course" className="course-course-pic" />
                  <h2 className="course-course-title">{course.Course_title}</h2>
                  <div className="course-instructor-details">
                    <img src={course.instructor_pic ? `http://localhost:8084${course.instructor_pic}` : "/img/instructor.jpg"} alt="Instructor" className="course-instructor-pic" />
                    <p>{course.instructor_name}</p>
                  </div>
                  <ul className="course-details-list">
                    <li><strong>Date:</strong> {course.date}</li>
                    <li><strong>Price:</strong> {course.Price}</li>
                    <li><strong>Duration:</strong> {course.duration}</li>
                    <li><strong>Language:</strong> {course.language}</li>
                    <li><strong>Method:</strong> {course.method}</li>
                    <li><strong>Group:</strong> {course.group}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="cards-course-details">
                <div className="cards-course-details-body">
                  <ul className="nav nav-tabs">
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#course-overview">Overview</button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#course-edit">Details</button>
                    </li>
                  </ul>

                  <div className="tab-content">
                    <div className="tab-pane fade show active" id="course-overview">
                      <h5 className="cards-course-details-title">About</h5>
                      <p className="course-description">{course.course_description}</p>

                      <h5 className="cards-course-details-title">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 course-label">Instructor name</div>
                        <div className="col-lg-9 col-md-8">{course.instructor_name}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 course-label">Skill Level</div>
                        <div className="col-lg-9 col-md-8">{course.level}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 course-label">Course Category</div>
                        <div className="col-lg-9 col-md-8">{course.category}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 course-label">Certificate</div>
                        <div className="col-lg-9 col-md-8">{course.certification}</div>
                      </div>

                      <h5 className="cards-course-details-title">Course Content</h5>
                      {courseContent.map((part, index) => (
                        <p key={index}><strong>Part {index + 1}:</strong> {part}</p>
                      ))}

                      <h5 className="cards-course-details-title">Learning Goals</h5>
                      {learningGoals.map((goal, index) => (
                        <p key={index}>{goal}</p>
                      ))}
                    </div>

                    <div id="course-edit" className="tab-pane fade">
                      <form onSubmit={handleSaveChanges}>
                        <div className="row mb-3">
                          <label htmlFor="course_title" className="col-md-4 col-lg-3 col-form-label">Course Title</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="Course_title"
                              type="text"
                              className="form-control"
                              id="course_title"
                              value={course.Course_title || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="course_description" className="col-md-4 col-lg-3 col-form-label">Description</label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              name="course_description"
                              className="form-control"
                              id="course_description"
                              style={{ height: '100px' }}
                              value={course.course_description || ''}
                              onChange={handleInputChange}
                            ></textarea>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="price" className="col-md-4 col-lg-3 col-form-label">Price</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="Price"
                              type="text"
                              className="form-control"
                              id="price"
                              value={course.Price || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="duration" className="col-md-4 col-lg-3 col-form-label">Duration</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="duration"
                              type="text"
                              className="form-control"
                              id="duration"
                              value={course.duration || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="language" className="col-md-4 col-lg-3 col-form-label">Language</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="language"
                              type="text"
                              className="form-control"
                              id="language"
                              value={course.language || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="method" className="col-md-4 col-lg-3 col-form-label">Method</label>
                          <div className="col-md-8 col-lg-9">
                            <select
                              name="method"
                              id="method"
                              className="form-control"
                              value={course.method || ''}
                              onChange={handleInputChange}
                            >
                              <option value="online">Online</option>
                              <option value="in_person">In Person</option>
                              <option value="hybrid">Hybrid</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="group" className="col-md-4 col-lg-3 col-form-label">Group</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="group"
                              type="text"
                              className="form-control"
                              id="group"
                              value={course.group || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="instructor_name" className="col-md-4 col-lg-3 col-form-label">Instructor</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="instructor_name"
                              type="text"
                              className="form-control"
                              id="instructor_name"
                              value={course.instructor_name || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="skillLevel" className="col-md-4 col-lg-3 col-form-label">Skill Level</label>
                          <div className="col-md-8 col-lg-9">
                            <select
                              name="level"
                              id="skillLevel"
                              className="form-control"
                              value={course.level || ''}
                              onChange={handleInputChange}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="courseCategory" className="col-md-4 col-lg-3 col-form-label">Course Category</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              name="category"
                              type="text"
                              className="form-control"
                              id="courseCategory"
                              value={course.category || ''}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="certificate" className="col-md-4 col-lg-3 col-form-label">Certificate</label>
                          <div className="col-md-8 col-lg-9">
                            <select
                              name="certification"
                              id="certificate"
                              className="form-control"
                              value={course.certification || ''}
                              onChange={handleInputChange}
                            >
                              <option value="available">Available</option>
                              <option value="not_available">Not Available</option>
                            </select>
                          </div>
                        </div>

                        <h5 className="cards-course-details-title">Course Content</h5>
                        <div className="row mb-3">
                          <div className="col-md-12 col-lg-12">
                            {courseContent.map((part, index) => (
                              <div key={index} className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={part}
                                  onChange={(e) => {
                                    const updatedContent = [...courseContent];
                                    updatedContent[index] = e.target.value;
                                    setCourseContent(updatedContent);
                                  }}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => removePart('courseContent', index)}>
                                  <i className="bi bi-dash"></i>
                                </button>
                              </div>
                            ))}
                            <button className="btn btn-outline-secondary" type="button" onClick={() => addPart('courseContent')}>
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>

                        <h5 className="cards-course-details-title">Learning Goals</h5>
                        <div className="row mb-3">
                          <div className="col-md-12 col-lg-12">
                            {learningGoals.map((goal, index) => (
                              <div key={index} className="input-group mb-3">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={goal}
                                  onChange={(e) => {
                                    const updatedGoals = [...learningGoals];
                                    updatedGoals[index] = e.target.value;
                                    setLearningGoals(updatedGoals);
                                  }}
                                />
                                <button className="btn btn-outline-secondary" type="button" onClick={() => removePart('learningGoals', index)}>
                                  <i className="bi bi-dash"></i>
                                </button>
                              </div>
                            ))}
                            <button className="btn btn-outline-secondary" type="button" onClick={() => addPart('learningGoals')}>
                              <i className="bi bi-plus"></i>
                            </button>
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">Save Changes</button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default CourseDetailsUnique;
