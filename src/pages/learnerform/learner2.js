import React, { useState, useEffect } from 'react';
import Button from './Button';
import './learner2.css';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import CustomAlert from './CustomAlert'; 

const Learner2 = () => {
  const { learnerId } = useParams();
  const navigate = useNavigate();
  const [courseType, setCourseType] = useState('');
  const [showAcademicList, setShowAcademicList] = useState(false);
  const [showProfessionalList, setShowProfessionalList] = useState(false);
  const [showWebDevList, setShowWebDevList] = useState(false);
  const [showHobbyList, setShowHobbyList] = useState(false);
  const [showVocationalList, setShowVocationalList] = useState(false);
  const [formData, setFormData] = useState({
    learning_method: '',
    level: '',
    language: '',
    certification: '',
    course_type: '',
    course_category: '',
    course_duration: '',
    budget: '',
    id_pref: ''
  });
  const [showAlert, setShowAlert] = useState(false); // State to control the alert visibility

  useEffect(() => {
    setFormData((prevData) => ({ ...prevData, id_pref: learnerId }));
  }, [learnerId]);

  const handleCourseTypeChange = (event) => {
    const selectedType = event.target.value;
    setCourseType(selectedType);

    setShowAcademicList(selectedType === 'Academic Courses');
    setShowProfessionalList(selectedType === 'Professional Development Courses');
    setShowWebDevList(selectedType === 'Web Development');
    setShowHobbyList(selectedType === 'Hobby/Interest-based Courses');
    setShowVocationalList(selectedType === 'Vocational/Technical Courses');

    setFormData({ ...formData, course_type: selectedType, course_category: '' });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const requiredFields = [
      'learning_method',
      'level',
      'language',
      'certification',
      'course_type',
      'course_category',
      'course_duration',
      'budget',
      'id_pref'
    ];

    for (const field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the ${field.replace('_', ' ')} field.`);
        return;
      }
    }

    console.log('Submitting preferences:', formData);

    axios.post('http://localhost:8084/preferences', formData)
      .then((response) => {
        if (response.data.message === 'Preferences inserted successfully') {
          setShowAlert(true); 
          setTimeout(() => {
            setShowAlert(false);
            navigate(`/signup`); // Navigate to the homepage after successful submission
          }, 1000); 
        } else {
          alert('Error inserting preferences: ' + response.data.message);
        }
      })
      .catch((error) => {
        console.error('Error:', error.response ? error.response.data : error);
        alert('An error occurred. Please try again.');
      });
  };

  return (
    <div className="sign-form">
      <div className="button-container1">
        <div className="button-wrapper1">
          <button className='bttn1' style={{ height: '20px', marginRight: '20px' }}></button>
          <button className='bttn1' style={{ height: '20px', marginRight: '20px' }}></button>
          <button className='bttn1' style={{ height: '20px' }}></button>
        </div>
      </div>
      <strong><h1>Insert your preferences</h1></strong>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="learning_method"
              onChange={handleInputChange}
              value={formData.learning_method}
              required
            >
              <option value="">Method of learning</option>
              <option value="Online">Online</option>
              <option value="Hybrid">Hybrid</option>
              <option value="In-person">In-person</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="level"
              onChange={handleInputChange}
              value={formData.level}
              required
            >
              <option value="">Level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="language"
              onChange={handleInputChange}
              value={formData.language}
              required
            >
              <option value="">Language</option>
              <option value="English">English</option>
              <option value="French">French</option>
              <option value="Arabic">Arabic</option>
              <option value="Spanish">Spanish</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="certification"
              onChange={handleInputChange}
              value={formData.certification}
              required
            >
              <option value="">Certification</option>
              <option value="Available">Available</option>
              <option value="Not available">Not available</option>
              <option value="No preference">No preference</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="course_type"
              onChange={handleCourseTypeChange}
              value={formData.course_type}
              required
            >
              <option value="">Type of course</option>
              <option value="Academic Courses">Academic Courses</option>
              <option value="Professional Development Courses">Professional Development Courses</option>
              <option value="Web Development">Web Development</option>
              <option value="Hobby/Interest-based Courses">Hobby/Interest-based Courses</option>
              <option value="Vocational/Technical Courses">Vocational/Technical Courses</option>
            </select>
          </div>

          {showAcademicList && (
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                name="course_category"
                onChange={handleInputChange}
                value={formData.course_category}
                required
              >
                <option value="">Academic Courses</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="Humanities">Humanities</option>
                <option value="Social Sciences">Social Sciences</option>
                <option value="Languages">Languages</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Data Science">Data Science</option>
                <option value="Cybersecurity">Cybersecurity</option>
                <option value="Graphic Design">Graphic Design</option>
              </select>
            </div>
          )}

          {showProfessionalList && (
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                name="course_category"
                onChange={handleInputChange}
                value={formData.course_category}
                required
              >
                <option value="">Professional Development Courses</option>
                <option value="Project Management">Project Management</option>
                <option value="Finance">Finance</option>
                <option value="Human Resources">Human Resources</option>
                <option value="Sales">Sales</option>
                <option value="Leadership and Management">Leadership and Management</option>
              </select>
            </div>
          )}

          {showWebDevList && (
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                name="course_category"
                onChange={handleInputChange}
                value={formData.course_category}
                required
              >
                <option value="">Web Development</option>
                <option value="Full Stack Development">Full Stack Development</option>
                <option value="Frontend Development">Frontend Development</option>
                <option value="Backend Development">Backend Development</option>
                <option value="JavaScript Frameworks">JavaScript Frameworks</option>
                <option value="Web Design">Web Design</option>
              </select>
            </div>
          )}

          {showHobbyList && (
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                name="course_category"
                onChange={handleInputChange}
                value={formData.course_category}
                required
              >
                <option value="">Hobby/Interest-based Courses</option>
                <option value="Cooking">Cooking</option>
                <option value="Photography">Photography</option>
                <option value="Painting">Painting</option>
                <option value="Music">Music</option>
                <option value="Writing">Writing</option>
                <option value="Fitness and Nutrition">Fitness and Nutrition</option>
                <option value="Beauty and Personal Care">Beauty and Personal Care</option>
              </select>
            </div>
          )}

          {showVocationalList && (
            <div className="col-md-6 mb-3">
              <select
                className="form-select"
                name="course_category"
                onChange={handleInputChange}
                value={formData.course_category}
                required
              >
                <option value="">Vocational/Technical Courses</option>
                <option value="Plumbing">Plumbing</option>
                <option value="Automotive Mechanics">Automotive Mechanics</option>
                <option value="Carpentry">Carpentry</option>
                <option value="Welding">Welding</option>
                <option value="Electrician Training">Electrician Training</option>
                <option value="Heating, Ventilation, and Air Conditioning">Heating, Ventilation, and Air Conditioning</option>
              </select>
            </div>
          )}

          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="course_duration"
              onChange={handleInputChange}
              value={formData.course_duration}
              required
            >
              <option value="">Course duration</option>
              <option value="Short-term (e.g., 1-3 months)">Short-term (e.g., 1-3 months)</option>
              <option value="Medium-term (e.g., 3-6 months)">Medium-term (e.g., 3-6 months)</option>
              <option value="Long-term (e.g., 6+ months)">Long-term (e.g., 6+ months)</option>
            </select>
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              name="budget"
              onChange={handleInputChange}
              value={formData.budget}
              required
            >
              <option value="">Budget</option>
              <option value="Less than 100DT">Less than 100DT</option>
              <option value="100DT - 300DT">100DT - 300DT</option>
              <option value="300DT - 900DT">300DT - 900DT</option>
              <option value="More than 900DT">More than 900DT</option>
              <option value="None of the above">None of the above</option>
            </select>
          </div>

          <div className="col-md-12 mb-3">
            <div className="button-containerform">
              <Link to={`/learner1/${learnerId}`}>
                <Button className="move-button">Previous</Button>
              </Link>
              <Button className="move-button" type="submit">
                Continue
              </Button>
            </div>
          </div>
        </div>
      </form>

      {showAlert && (
        <CustomAlert
          message="Preferences saved successfully!"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Learner2;
