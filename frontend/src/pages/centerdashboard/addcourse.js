import React, { useState } from 'react';
import Nav from '../../component/centernav';
import axios from 'axios';
import '../../css/centerdash.css'

function Addcourse() {
  const [courseContent, setCourseContent] = useState(['']);
  const [learningGoals, setLearningGoals] = useState(['']);
  const [coursePicFile, setCoursePicFile] = useState(null);
  const [coursePicPreview, setCoursePicPreview] = useState(null);
  const [instructorPicFile, setInstructorPicFile] = useState(null);
  const [instructorPicPreview, setInstructorPicPreview] = useState(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [instructorName, setInstructorName] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const [date, setDate] = useState('');
  const [language, setLanguage] = useState('');
  const [method, setMethod] = useState('');
  const [group, setGroup] = useState('');
  const [level, setLevel] = useState('');
  const [category, setCategory] = useState('');
  const [certification, setCertification] = useState('');
  const [formErrors, setFormErrors] = useState({});

  const handleFileChange = (event, setFile, setPreview) => {
    const file = event.target.files[0];
    setFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleInputChange = (type, index, value) => {
    if (type === 'courseContent') {
      const updatedContent = [...courseContent];
      updatedContent[index] = value;
      setCourseContent(updatedContent);
    } else if (type === 'learningGoals') {
      const updatedGoals = [...learningGoals];
      updatedGoals[index] = value;
      setLearningGoals(updatedGoals);
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

  const validateForm = () => {
    const errors = {};
    if (!title) errors.title = 'Title is required';
    if (!description) errors.description = 'Description is required';
    if (!instructorName) errors.instructorName = 'Instructor Name is required';
    if (!price) errors.price = 'Price is required';
    if (!duration) errors.duration = 'Duration is required';
    if (!date) errors.date = 'Date is required';
    if (!language) errors.language = 'Language is required';
    if (!method) errors.method = 'Method is required';
    if (!group) errors.group = 'Group is required';
    if (!level) errors.level = 'Level is required';
    if (!category) errors.category = 'Category is required';
    if (!certification) errors.certification = 'Certification is required';
    if (courseContent.some(content => !content)) errors.courseContent = 'All course content parts are required';
    if (learningGoals.some(goal => !goal)) errors.learningGoals = 'All learning goals are required';
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleAddCourseSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    const centerId = localStorage.getItem('ID_center'); // Retrieve ID_center from localStorage
    formData.append('course_pic', coursePicFile);
    formData.append('instructor_pic', instructorPicFile);
    formData.append('Course_title', title);
    formData.append('course_description', description);
    formData.append('instructor_name', instructorName);
    formData.append('Price', price);
    formData.append('duration', duration);
    formData.append('date', date);
    formData.append('language', language);
    formData.append('method', method);
    formData.append('group', group);
    formData.append('level', level);
    formData.append('category', category);
    formData.append('content', courseContent.join('\n')); // Join content parts with newlines
    formData.append('goals', learningGoals.join('\n')); // Join goals with newlines
    formData.append('ID_center', centerId);
    formData.append('certification', certification);

    try {
      const response = await axios.post('http://localhost:8084/center/addcourse', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Authorization': `Bearer ${localStorage.getItem('admin_token')}` // Ensure token is included for authentication
        },
      });
      alert(response.data.message);
    } catch (error) {
      console.error('Error adding course:', error);
      alert('Failed to add course');
    }
  };

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="pagetitle">
         
          <br />
        </div>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="profilecard1">
                <div className="profilecard1-body profile-card pt-5 d-flex flex-column align-items-center">
                  <form onSubmit={handleAddCourseSubmit}>
                    <div className="profile-picture-wrapper mb-3  ml-5 ">
                      <label htmlFor="mediaFile" className="profile-picture-label ml-5 bg-light"> 
                        <div className="profile-picture">
                          <img
                          
                            src={coursePicPreview || "/img/section/propser.jpg"}
                           
                          />
                          
                          <input
                            type="file"
                            id="mediaFile"
                            className="file-input"
                            onChange={(e) => handleFileChange(e, setCoursePicFile, setCoursePicPreview)}
                          />
                        </div>
                      </label>
                    </div>
                    {formErrors.title && <p className="text-danger">{formErrors.title}</p>}
                    <div className="mb-3">
                      <label htmlFor="title" className="form-label">Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                      />
                    </div>
                    {formErrors.instructorName && <p className="text-danger">{formErrors.instructorName}</p>}
                    <div className="mb-3">
                      <label htmlFor="fullName" className="form-label">Instructor Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="fullName"
                        value={instructorName}
                        onChange={(e) => setInstructorName(e.target.value)}
                      />
                    </div>
                    <div className="profile-picture-wrapper ml-5 ">
                      <label htmlFor="instructorImage" className="profile-picture-label ml-5">
                        <div className="profile-picture ">
                          <img
                            src={instructorPicPreview || "/img/section/propser.jpg"}
                          
                          />
                          <input
                            type="file"
                            id="instructorImage"
                            className="file-input"
                            accept=".jpg, .jpeg, .png"
                            onChange={(e) => handleFileChange(e, setInstructorPicFile, setInstructorPicPreview)}
                          />
                        </div>
                      </label>
                      <small className="form-text text-muted text-center ml-5">Upload JPG or PNG files only.</small>
                    </div>
                    {formErrors.date && <p className="text-danger">{formErrors.date}</p>}
                    <div className="mb-3 row">
                      <div className="col">
                        <label htmlFor="date" className="form-label">Date</label>
                        <input
                          type="date"
                          className="form-control"
                          id="date"
                          value={date}
                          onChange={(e) => setDate(e.target.value)}
                        />
                      </div>
                    </div>
                    {formErrors.price && <p className="text-danger">{formErrors.price}</p>}
                    <div className="mb-3 row">
                      <div className="col">
                        <label htmlFor="price" className="form-label">Price</label>
                        <input
                          type="text"
                          className="form-control"
                          id="price"
                          value={price}
                          onChange={(e) => setPrice(e.target.value)}
                        />
                      </div>
                      {formErrors.duration && <p className="text-danger">{formErrors.duration}</p>}
                      <div className="col">
                        <label htmlFor="duration" className="form-label">Duration</label>
                        <input
                          type="text"
                          className="form-control"
                          id="duration"
                          value={duration}
                          onChange={(e) => setDuration(e.target.value)}
                        />
                      </div>
                    </div>
                    {formErrors.language && <p className="text-danger">{formErrors.language}</p>}
                    <div className="mb-3">
                      <label htmlFor="language" className="form-label">Language</label>
                      <input
                        type="text"
                        className="form-control"
                        id="language"
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                      />
                    </div>
                    {formErrors.method && <p className="text-danger">{formErrors.method}</p>}
                    <div className="mb-3">
                      <label htmlFor="method" className="form-label">Method</label>
                      <select
                        className="form-select"
                        id="method"
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                      >
                        <option value="">Select Method</option>
                        <option value="online">Online</option>
                        <option value="in_person">In Person</option>
                        <option value="hybrid">Hybrid</option>
                      </select>
                    </div>
                    {formErrors.group && <p className="text-danger">{formErrors.group}</p>}
                    <div className="mb-3">
                      <label htmlFor="group" className="form-label">Group</label>
                      <input
                        type="number"
                        className="form-control"
                        id="group"
                        value={group}
                        onChange={(e) => setGroup(e.target.value)}
                        min="1"
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="profilecard1">
                <div className="profilecard1-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                      <form className="py-4" onSubmit={handleAddCourseSubmit}>
                        {formErrors.description && <p className="text-danger">{formErrors.description}</p>}
                        <div className="row mb-3">
                          <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">Description</label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              className="form-control"
                              id="about"
                              style={{ height: '100px' }}
                              value={description}
                              onChange={(e) => setDescription(e.target.value)}
                            ></textarea>
                          </div>
                        </div>
                        {formErrors.level && <p className="text-danger">{formErrors.level}</p>}
                        <div className="row mb-3">
                          <label htmlFor="skillLevel" className="col-md-4 col-lg-3 col-form-label">Skill Level</label>
                          <div className="col-md-8 col-lg-9">
                            <select
                              className="form-control"
                              id="skillLevel"
                              value={level}
                              onChange={(e) => setLevel(e.target.value)}
                            >
                              <option value="beginner">Beginner</option>
                              <option value="intermediate">Intermediate</option>
                              <option value="advanced">Advanced</option>
                            </select>
                          </div>
                        </div>
                        {formErrors.category && <p className="text-danger">{formErrors.category}</p>}
                        <div className="row mb-3">
                          <label htmlFor="category" className="col-md-4 col-lg-3 col-form-label">Course Category</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="category"
                              value={category}
                              onChange={(e) => setCategory(e.target.value)}
                            />
                          </div>
                        </div>
                        {formErrors.certification && <p className="text-danger">{formErrors.certification}</p>}
                        <div className="row mb-3">
                          <label htmlFor="certification" className="col-md-4 col-lg-3 col-form-label">Certification</label>
                          <div className="col-md-8 col-lg-9">
                            <select
                              className="form-control"
                              id="certification"
                              value={certification}
                              onChange={(e) => setCertification(e.target.value)}
                            >
                              <option value="available">Available</option>
                              <option value="not_available">Not Available</option>
                            </select>
                          </div>
                        </div>
                        <h5 className="card-title pt-3">Course Content</h5>
                        {formErrors.courseContent && <p className="text-danger">{formErrors.courseContent}</p>}
                        <div className="row mb-3">
                          <label htmlFor="courseContent" className="col-md-4 col-lg-3 col-form-label"></label>
                          <div className="col-md-8 col-lg-9">
                            <div id="courseContentInputs">
                              {courseContent.map((part, index) => (
                                <div key={index} className="input-group mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Part ${index + 1}`}
                                    value={part}
                                    onChange={(e) => handleInputChange('courseContent', index, e.target.value)}
                                  />
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => removePart('courseContent', index)}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                </div>
                              ))}
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => addPart('courseContent')}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <h5 className="card-title pt-3">Learning Goals</h5>
                        {formErrors.learningGoals && <p className="text-danger">{formErrors.learningGoals}</p>}
                        <div className="row mb-3">
                          <label htmlFor="learningGoals" className="col-md-4 col-lg-3 col-form-label"></label>
                          <div className="col-md-8 col-lg-9">
                            <div id="learningGoalsInputs">
                              {learningGoals.map((goal, index) => (
                                <div key={index} className="input-group mb-3">
                                  <input
                                    type="text"
                                    className="form-control"
                                    placeholder={`Goal ${index + 1}`}
                                    value={goal}
                                    onChange={(e) => handleInputChange('learningGoals', index, e.target.value)}
                                  />
                                  <button
                                    className="btn btn-outline-secondary"
                                    type="button"
                                    onClick={() => removePart('learningGoals', index)}
                                  >
                                    <i className="bi bi-dash"></i>
                                  </button>
                                </div>
                              ))}
                              <button
                                className="btn btn-outline-secondary"
                                type="button"
                                onClick={() => addPart('learningGoals')}
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">Add Course</button>
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

export default Addcourse;
