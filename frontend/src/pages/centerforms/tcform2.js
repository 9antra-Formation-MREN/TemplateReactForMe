import React, { useState } from 'react';
import Button from '../learnerform/Button';
import './tcform2.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Tcform2 = ({ ID_center }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        bio: '',
        course_category: '',
        language: '',
        target_audience: ''
    });
    const [errors, setErrors] = useState({
        bio: '',
        course_category: '',
        language: '',
        target_audience: ''
    });
    const [formValid, setFormValid] = useState(false);

    const predefinedCategories = [
        "Business",
        "Technology",
        "Arts",
        "Health & Fitness",
        "Language",
        "Other Specializations"
    ];

    const predefinedLanguages = [
        "English",
        "French",
        "Arabic",
        "Spanish",
        "Other"
    ];

    const predefinedAudiences = [
        "Students",
        "Professionals",
        "Individuals Seeking Career Changes"
    ];

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

        axios.post('http://localhost:8084/center/form2', {
            ...formData,
            ID_center
        }).then(response => {
            console.log("Form 2 information updated successfully!");
            navigate('/signupcenter'); 
        }).catch(error => {
            console.error('Error occurred during form 2 update:', error);
            alert('An error occurred. Please try again later.');
        });
    };

    return (
        <div className='pagebackground'>
            <div className="center-form">
            <div className="button-container1">
            <div className="button-wrapper1">
                {/* First Button */}
                <button className='bttn1' style={{  height: '20px', marginRight: '20px' }}>
                   
                </button>
                {/* Second Button */}
                <button className='bttn1' style={{  height: '20px', marginRight: '20px' }}>
                 
                </button>
                {/* Third Button */}
                <button className='bttn1' style={{  height: '20px' }}>
                 
                </button>
            </div>
        </div>
                <h1>Insert your center's information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <textarea
                                name="bio"
                                value={formData.bio}
                                onChange={handleChange}
                                className="box"
                                placeholder="Bio"
                                rows="4"
                                required
                            />
                            {errors.bio && <small className="error">{errors.bio}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                list="course-categories"
                                name="course_category"
                                value={formData.course_category}
                                onChange={handleChange}
                                className="box"
                                placeholder="Course Category"
                                required
                            />
                            <datalist id="course-categories">
                                {predefinedCategories.map((category, index) => (
                                    <option key={index} value={category} />
                                ))}
                            </datalist>
                            {errors.course_category && <small className="error">{errors.course_category}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                list="languages"
                                name="language"
                                value={formData.language}
                                onChange={handleChange}
                                className="box"
                                placeholder="Language"
                                required
                            />
                            <datalist id="languages">
                                {predefinedLanguages.map((language, index) => (
                                    <option key={index} value={language} />
                                ))}
                            </datalist>
                            {errors.language && <small className="error">{errors.language}</small>}
                        </div>
                        <div className="col-md-6 mb-3">
                            <input
                                list="target-audiences"
                                name="target_audience"
                                value={formData.target_audience}
                                onChange={handleChange}
                                className="box"
                                placeholder="Target Audience"
                                required
                            />
                            <datalist id="target-audiences">
                                {predefinedAudiences.map((audience, index) => (
                                    <option key={index} value={audience} />
                                ))}
                            </datalist>
                            {errors.target_audience && <small className="error">{errors.target_audience}</small>}
                        </div>
                    </div>
                    <div className="col-md-12 mb-3">
                        <div className="button-containerform">
                            <Link to="/centerforms/tcform1">
                                <Button className="move-button">Previous</Button>
                            </Link>
                            <Button className="move-button" type="submit" disabled={!formValid}>
                                Submit
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Tcform2;
