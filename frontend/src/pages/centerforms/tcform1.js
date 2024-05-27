import React, { useState } from 'react';
import Button from '../learnerform/Button';
import './tcform.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Tcform1 = ({ ID_center }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        owner_name: '',
        phone_number: '',
        city: '',
        location: '',
        license: '',
        business_id: ''
    });
    const [errors, setErrors] = useState({
        owner_name: '',
        phone_number: '',
        city: '',
        location: '',
        license: '',
        business_id: ''
    });
    const [formValid, setFormValid] = useState(false);

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

        axios.post('http://localhost:8084/center/form1', {
            ...formData,
            ID_center
        }).then(response => {
            console.log("Form 1 information updated successfully!");
            navigate('/centerforms/tcform2');
        }).catch(error => {
            console.error('Error occurred during form 1 update:', error);
            alert('An error occurred. Please try again later.');
        });
    };

    return (
        <div className='pagebackground'>
               <div className="center-form">
        <div className="button-container1">
            <div className="button-wrapper1 ">
                {/* First Button */}
                <button className='bttn' style={{  height: '20px', marginRight: '20px' }}>
                   
                </button>
                {/* Second Button */}
                <button className='bttn' style={{  height: '20px', marginRight: '20px' }}>
                 
                </button>
                {/* Third Button */}
                <button className='bttn' style={{  height: '20px' }}>
                 
                </button>
            </div>
        </div> 
                <h1>Insert your center's information</h1>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 ">
                            <input
                                type="text"
                                name="owner_name"
                                value={formData.owner_name}
                                onChange={handleChange}
                                className="box"
                                placeholder="Owner's name"
                                required
                            />
                            {errors.owner_name && <span className="error">{errors.owner_name}</span>}
                        </div>
                        <div className="col-md-6 ">
                            <input
                                type="number"
                                name="phone_number"
                                value={formData.phone_number}
                                onChange={handleChange}
                                className="box"
                                placeholder="Phone number"
                                required
                            />
                            {errors.phone_number && <span className="error">{errors.phone_number}</span>}
                        </div>
                        <div className="col-md-6 ">
                            <input
                                type="text"
                                name="city"
                                value={formData.city}
                                onChange={handleChange}
                                className="box"
                                placeholder="City"
                                required
                            />
                            {errors.city && <span className="error">{errors.city}</span>}
                        </div>
                        <div className="col-md-6 ">
                            <input
                                type="text"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                className="box"
                                placeholder="Location"
                                required
                            />
                            {errors.location && <span className="error">{errors.location}</span>}
                        </div>
                        <div className="col-md-6 ">
                            <input
                                type="number"
                                name="license"
                                value={formData.license}
                                onChange={handleChange}
                                className="box"
                                placeholder="License"
                                min="0"
                                step="1"
                                required
                            />
                            {errors.license && <span className="error">{errors.license}</span>}
                        </div>
                        <div className="col-md-6 ">
                            <input
                                type="number"
                                name="business_id"
                                value={formData.business_id}
                                onChange={handleChange}
                                className="box"
                                placeholder="Business registration number or tax ID"
                                min="0"
                                step="1"
                                required
                            />
                            {errors.business_id && <span className="error">{errors.business_id}</span>}
                        </div>
                    </div>
                    <div className="col-md-12 ">
                        <div className="button-containerform">
                            <Link to="/centerforms/tcwelcome">
                                <Button className="move-button">Previous</Button>
                            </Link>
                            <Button className="move-button" type="submit" disabled={!formValid}>
                                Continue
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Tcform1;
