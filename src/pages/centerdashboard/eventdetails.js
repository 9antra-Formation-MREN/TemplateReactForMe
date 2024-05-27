import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Nav from '../../component/centernav';
import axios from 'axios';
import feather from 'feather-icons';
import '../../css/centerdash.css';

const EventDetails = () => {
  const navigate = useNavigate();
  const { eventId } = useParams();
  const [eventImage, setEventImage] = useState(null);
  const [eventImagePreview, setEventImagePreview] = useState('img/imgevent.jpg');
  const [eventDetails, setEventDetails] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
  });
  const [eventSchedule, setEventSchedule] = useState([]);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    // Fetch event details from the backend
    const fetchEventDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/center/eventdetails/${eventId}`);
        const event = response.data;
        setEventDetails({
          title: event.title_event,
          description: event.event_description,
          location: event.event_location,
          date: event.event_date,
          time: event.event_time,
          price: event.event_price,
        });
        setEventImagePreview(`http://localhost:8084${event.event_pic}`);
        setEventSchedule(JSON.parse(event.schedule));
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
    feather.replace();
  }, [eventId]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Validate form fields
    const errors = {};
    if (!eventDetails.title) errors.title = 'Title is required';
    if (!eventDetails.description) errors.description = 'Description is required';
    if (!eventDetails.location) errors.location = 'Location is required';
    if (!eventDetails.date) errors.date = 'Date is required';
    if (!eventDetails.time) errors.time = 'Time is required';
    if (!eventDetails.price) errors.price = 'Price is required';
    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      return;
    }

    const formData = new FormData();
    formData.append('title', eventDetails.title);
    formData.append('description', eventDetails.description);
    formData.append('location', eventDetails.location);
    formData.append('date', eventDetails.date);
    formData.append('time', eventDetails.time);
    formData.append('price', eventDetails.price);
    formData.append('schedule', JSON.stringify(eventSchedule));
    if (eventImage) {
      formData.append('event_image', eventImage);
    }

    try {
      const response = await axios.put(`http://localhost:8084/center/eventdetails/${eventId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      alert(response.data.message);
      navigate('/centerdashboard/allevents');
    } catch (error) {
      console.error('Error updating event details:', error);
      alert('Failed to update event');
    }
  };

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="course-page-title">
          <button onClick={() => navigate('/centerdashboard/addevent')} className="course-add-course-btn">Add Your Event</button>
        </div>

        <section className="course-section profile" style={{ marginTop: '80px' }}>
          <div className="row">
            <div className="col-xl-4">
              <div className="cards-course-details profile-cards-course-details">
                <div className="cards-course-details-body profile-cards-course-details-body">
                  <img src={eventImagePreview} alt="Event" className="course-course-pic" />
                  <h2 className="course-course-title text-center" style={{ fontSize: '18px' }}>{eventDetails.title}</h2>
                  <br />
                  <ul className="course-details-list list-unstyled">
                    <li><strong>Location:</strong> {eventDetails.location}</li>
                    <li><strong>Date:</strong> {eventDetails.date}</li>
                    <li><strong>Time:</strong> {eventDetails.time}</li>
                    <li><strong>Price:</strong> {eventDetails.price === '0' ? 'Free' : eventDetails.price}</li>
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
                      <h5 className="cards-course-details-title">Description</h5>
                      <p className="course-description py-2" style={{ fontSize: '15px' }}>{eventDetails.description}</p>
                      <h5 className="cards-course-details-title">Event Schedule</h5>
                      <div className="row">
                        {eventSchedule.map((schedule, index) => (
                          <React.Fragment key={index}>
                            <div className="col-lg-3 col-md-4 course-label">{schedule.time}</div>
                            <div className="col-lg-9 col-md-8">{schedule.programme}</div>
                          </React.Fragment>
                        ))}
                      </div>
                    </div>

                    <div id="course-edit" className="tab-pane fade">
                      <form onSubmit={handleSubmit}>
                        <div className="row mb-3">
                          <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label"></label>
                          <div className="col-md-8 col-lg-9">
                            <img src={eventImagePreview} alt="Event" className="course-course-pic" />
                            <div className="pt-2 ml-3">
                              <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleFileChange} />
                              <a
        href="#"
        className="btn btn-sm"
        title="Upload new profile image"
        onClick={() => document.getElementById('profileImage').click()}
        style={{ backgroundColor: '#2C599D', color: 'white' }}
      >
        <i data-feather="upload"></i>
      </a>
      <a
        href="#"
        className="btn btn-sm"
        title="Remove my profile image"
        style={{ backgroundColor: '#FB9B50', color: 'white', margin:'10px' }}
      >
        <i data-feather="trash-2"></i>
      </a>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="title" className="col-md-4 col-lg-3 col-form-label">Title</label>
                          <div className="col-md-8 col-lg-9">
                            <input type="text" className="form-control" id="title" name="title" value={eventDetails.title} onChange={handleInputChange} />
                            {formErrors.title && <p className="text-danger">{formErrors.title}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="description" className="col-md-4 col-lg-3 col-form-label">Description</label>
                          <div className="col-md-8 col-lg-9">
                            <textarea name="description" className="form-control" id="description" style={{ height: '100px' }} value={eventDetails.description} onChange={handleInputChange}></textarea>
                            {formErrors.description && <p className="text-danger">{formErrors.description}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="event_schedule" className="col-md-4 col-lg-3 col-form-label">Event Schedule</label>
                          <div className="col-md-8 col-lg-9">
                            <div className="course-schedule-inputs">
                              {eventSchedule.map((schedule, index) => (
                                <div key={index} className="row course-schedule-input">
                                  <div className="col-md-6 col-lg-6">
                                    <label htmlFor="time" className="form-label">Time</label>
                                    <input type="time" className="form-control" name="time" value={schedule.time} onChange={(e) => handleScheduleChange(index, e)} />
                                  </div>
                                  <div className="col-md-5 col-lg-5">
                                    <label htmlFor="programme" className="form-label">Programme</label>
                                    <textarea name="programme" className="form-control" value={schedule.programme} onChange={(e) => handleScheduleChange(index, e)}></textarea>
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
                            <input type="text" className="form-control" id="location" name="location" value={eventDetails.location} onChange={handleInputChange} />
                            {formErrors.location && <p className="text-danger">{formErrors.location}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="date" className="col-md-4 col-lg-3 col-form-label">Date</label>
                          <div className="col-md-8 col-lg-9">
                            <input type="date" className="form-control" id="date" name="date" value={eventDetails.date} onChange={handleInputChange} />
                            {formErrors.date && <p className="text-danger">{formErrors.date}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="time" className="col-md-4 col-lg-3 col-form-label">Time</label>
                          <div className="col-md-8 col-lg-9">
                            <input type="time" className="form-control" id="time" name="time" value={eventDetails.time} onChange={handleInputChange} />
                            {formErrors.time && <p className="text-danger">{formErrors.time}</p>}
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="price" className="col-md-4 col-lg-3 col-form-label">Price</label>
                          <div className="col-md-8 col-lg-9">
                            <input type="text" className="form-control" id="price" name="price" value={eventDetails.price} onChange={handleInputChange} />
                            {formErrors.price && <p className="text-danger">{formErrors.price}</p>}
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
};

export default EventDetails;
