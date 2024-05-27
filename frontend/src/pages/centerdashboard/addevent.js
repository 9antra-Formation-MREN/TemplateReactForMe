import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../component/centernav';
import axios from 'axios';
import feather from 'feather-icons';
import '../../css/centerdash.css';

const AddEvent = () => {
  const navigate = useNavigate();
  const [eventImage, setEventImage] = useState(null);
  const [eventImagePreview, setEventImagePreview] = useState(null);
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
  });
  const [eventSchedule, setEventSchedule] = useState([{ time: '', programme: '' }]);
  const [formErrors, setFormErrors] = useState({});

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEventImage(file);
    setEventImagePreview(URL.createObjectURL(file));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails({ ...eventDetails, [name]: value });
  };

  const handleScheduleChange = (index, e) => {
    const { name, value } = e.target;
    const newSchedule = [...eventSchedule];
    newSchedule[index][name] = value;
    setEventSchedule(newSchedule);
  };

  const addSchedule = () => {
    setEventSchedule([...eventSchedule, { time: '', programme: '' }]);
  };

  const validateForm = () => {
    const errors = {};
    if (!eventDetails.title) errors.title = 'Title is required';
    if (!eventDetails.description) errors.description = 'Description is required';
    if (!eventDetails.location) errors.location = 'Location is required';
    if (!eventDetails.date) errors.date = 'Date is required';
    if (!eventDetails.time) errors.time = 'Time is required';
    if (eventSchedule.some(schedule => !schedule.time || !schedule.programme)) {
      errors.eventSchedule = 'All schedule times and programmes are required';
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formData = new FormData();
    const centerId = localStorage.getItem('ID_center');
    formData.append('event_image', eventImage);
    formData.append('title', eventDetails.title);
    formData.append('description', eventDetails.description);
    formData.append('location', eventDetails.location);
    formData.append('date', eventDetails.date);
    formData.append('time', eventDetails.time);
    formData.append('price', eventDetails.price);
    formData.append('schedule', JSON.stringify(eventSchedule));
    formData.append('ID_center', centerId);

    try {
      const response = await axios.post('http://localhost:8084/center/addevent', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      navigate('/centerdashboard/allevents');
    } catch (error) {
      console.error('Error adding event:', error);
      alert('Failed to add event');
    }
  };

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="course-page-title">
          <br />
        </div>
        <section className="course-section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="cards-course-details profile-cards-course-details">
                <div className="cards-course-details-body profile-cards-course-details-body">
                  <form onSubmit={handleSubmit}>
                    <div className="profile-picture-wrapper mb-3 ml-5">
                      <label htmlFor="mediaFile" className="profile-picture-label ml-4">
                        <div className="profile-picture bg-light">
                          <img
                            src={eventImagePreview || ""}
                          
                          />
                          <input
                            type="file"
                            id="mediaFile"
                            className="file-input"
                            onChange={handleFileChange}
                          />
                        </div>
                      </label>
                      <small className="form-text text-muted">Upload JPG or PNG files only.</small>
                      {eventImagePreview && <img src={eventImagePreview} alt="Uploaded Image" className="uploaded-image" />}
                    </div>
                    <div className="mb-3  ">
                      <label htmlFor="title" className="form-label"></label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={eventDetails.title}
                        onChange={handleInputChange}
                      />
                      {formErrors.title && <p className="text-danger">{formErrors.title}</p>}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="cards-course-details">
                <div className="cards-course-details-body">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#event-overview">Overview</button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div className="tab-pane fade show active profile-overview" id="event-overview">
                      <br />
                      <form className="py-4" onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          <label htmlFor="description" className="col-md-4 col-lg-3 col-form-label">Description</label>
                          <div className="col-md-8 col-lg-9">
                            <textarea
                              name="description"
                              className="form-control"
                              id="description"
                              style={{ height: '100px' }}
                              value={eventDetails.description}
                              onChange={handleInputChange}
                            ></textarea>
                            {formErrors.description && <p className="text-danger">{formErrors.description}</p>}
                          </div>
                        </div>
                        <div className="row mb-3 course-schedule-row">
                          <label htmlFor="event_schedule" className="col-md-4 col-lg-3 col-form-label">Event Schedule</label>
                          <div className="col-md-8 col-lg-9">
                            <div className="course-schedule-inputs">
                              {eventSchedule.map((schedule, index) => (
                                <div key={index} className="row course-schedule-input">
                                  <div className="col-md-6 col-lg-6">
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input
                                      type="time"
                                      className="form-control"
                                      name="time"
                                      value={schedule.time}
                                      onChange={(e) => handleScheduleChange(index, e)}
                                    />
                                  </div>
                                  <div className="col-md-5 col-lg-5">
                                    <label htmlFor="programme" className="form-label">Programme</label>
                                    <textarea
                                      name="programme"
                                      className="form-control"
                                      value={schedule.programme}
                                      onChange={(e) => handleScheduleChange(index, e)}
                                    ></textarea>
                                  </div>
                                </div>
                              ))}
                            </div>
                            <button type="button" className="btn btn-primary py-2" id="addSchedule" title="Add Schedule" onClick={addSchedule}>
                              <i className="iconplus" data-feather="plus"></i>
                            </button>
                            {formErrors.eventSchedule && <p className="text-danger">{formErrors.eventSchedule}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="location" className="col-md-4 col-lg-3 col-form-label">Location</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="location"
                              name="location"
                              value={eventDetails.location}
                              onChange={handleInputChange}
                            />
                            {formErrors.location && <p className="text-danger">{formErrors.location}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="date" className="col-md-4 col-lg-3 col-form-label">Date</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="date"
                              className="form-control"
                              id="date"
                              name="date"
                              value={eventDetails.date}
                              onChange={handleInputChange}
                            />
                            {formErrors.date && <p className="text-danger">{formErrors.date}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="time" className="col-md-4 col-lg-3 col-form-label">Time</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="time"
                              className="form-control"
                              id="time"
                              name="time"
                              value={eventDetails.time}
                              onChange={handleInputChange}
                            />
                            {formErrors.time && <p className="text-danger">{formErrors.time}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="price" className="col-md-4 col-lg-3 col-form-label">Price</label>
                          <div className="col-md-8 col-lg-9">
                            <input
                              type="text"
                              className="form-control"
                              id="price"
                              name="price"
                              value={eventDetails.price}
                              onChange={handleInputChange}
                            />
                            {formErrors.price && <p className="text-danger">{formErrors.price}</p>}
                          </div>
                        </div>
                        <div className="text-center">
                          <button type="submit" className="btn btn-primary">Save Event</button>
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
};

export default AddEvent;
