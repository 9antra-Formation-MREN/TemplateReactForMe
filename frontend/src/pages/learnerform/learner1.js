import React, { useState, useEffect } from 'react';
import Button from './Button';
import './learner.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import CustomAlert from './CustomAlert'; 

const Learner1 = () => {
  const { learnerId } = useParams(); 
  const navigate = useNavigate();
  const [formValid, setFormValid] = useState(false);
  const [showAlert, setShowAlert] = useState(false); 
  const [formData, setFormData] = useState({
    learner_birthdate: '', 
    learner_phone: '',
    learner_country: '',
    learner_city: '',
    occupation: '',
    education_level: ''
  });
  const [errors, setErrors] = useState({
    learner_birthdate: '',
    learner_phone: '',
    learner_country: '',
    learner_city: '',
    occupation: '',
    education_level: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }));

    const newErrors = { ...errors };
    newErrors[name] = value === '' ? 'This field is required' : '';
    setErrors(newErrors);

    const isFormValid = Object.values(newErrors).every(val => val === '');
    setFormValid(isFormValid);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const dataToSend = { ...formData, learner_id: learnerId };

    axios.post('http://localhost:8084/learner1', dataToSend)
      .then(response => {
        console.log("Personal information updated successfully!");
        setShowAlert(true); 

        setTimeout(() => {
          setShowAlert(false);
          navigate(`/learner2/${learnerId}`); // Pass learnerId to the next step
        }, 1000); 
      })
      .catch(error => {
        console.error('Error occurred during registration:', error);
        alert('An error occurred. Please try again later.');
      });
  };

  return (
    <div className="sign-up-form1">
      <div className="button-container1">
        <div className="button-wrapper1 mb-5">
          <button className='bttn' style={{ height: '20px', marginRight: '20px' }}></button>
          <button className='bttn' style={{ height: '20px', marginRight: '20px' }}></button>
          <button className='bttn' style={{ height: '20px' }}></button>
        </div>
      </div> 
      <div className="suus">
      <h1>Insert your personal information</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="number"
              name="learner_phone"
              value={formData.learner_phone}
              onChange={handleChange}
              className="box"
              placeholder="Phone number"
              required
            />
            {errors.learner_phone && <span className="error">{errors.learner_phone}</span>}
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="date" 
              name="learner_birthdate"
              value={formData.learner_birthdate}
              onChange={handleChange}
              className="box"
              placeholder="Birth date"
              required
            />
            {errors.learner_birthdate && <span className="error">{errors.learner_birthdate}</span>}
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="learner_country"
              value={formData.learner_country}
              onChange={handleChange}
              className="box"
              placeholder="Country"
              required
            />
            {errors.learner_country && <span className="error">{errors.learner_country}</span>}
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              name="learner_city"
              value={formData.learner_city}
              onChange={handleChange}
              className="box"
              placeholder="City"
              required
            />
            {errors.learner_city && <span className="error">{errors.learner_city}</span>}
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              aria-label="Occupation"
              name="occupation"
              value={formData.occupation}
              onChange={handleChange}
              required
            >
              <option value="">Occupation</option>
              <option value="Student">Student</option>
              <option value="Instructor/Tutor">Instructor/Tutor</option>
            </select>
            {errors.occupation && <span className="error">{errors.occupation}</span>}
          </div>
          <div className="col-md-6 mb-3">
            <select
              className="form-select"
              aria-label="Education Level"
              name="education_level"
              value={formData.education_level}
              onChange={handleChange}
              required
            >
              <option value="">Education Level</option>
              <option value="Highschool">Highschool</option>
              <option value="Bachelor">Bachelor</option>
            </select>
            {errors.education_level && <span className="error">{errors.education_level}</span>}
          </div>
        </div>
        <div className="col-md-12 mb-3">
          <div className="button-containerform">
            <Link to="/welcome">
              <Button className="move-button">Previous</Button>
            </Link>
            <Button className="move-button" type="submit" disabled={!formValid}>
              Continue
            </Button>
          </div>
        </div>
      </form>
      </div>

     
      {showAlert && (
        <CustomAlert
          message="Personal information updated successfully!"
          onClose={() => setShowAlert(false)}
        />
      )}
    </div>
  );
};

export default Learner1;
