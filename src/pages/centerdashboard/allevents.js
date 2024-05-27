import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Nav from '../../component/centernav';
import axios from 'axios';
import feather from 'feather-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import ParticipantsModal2 from './paticipantevent';
import '../../css/centerdash.css';
import prosperImg from '../../img/section/user1.jpeg';
import prosperImg2 from '../../img/section/user2.jpeg';


const MySwal = withReactContent(Swal);

// Sample static participants data
const participants = [
  {
    profile_pic: prosperImg,
    name: "Emna",
    phone: "123-456-7890",
    email: "emna@example.com",
    occupation: "Software Engineer",
    action: "Interested"
  },
  {
    profile_pic: prosperImg2,
    name: "John Doe",
    phone: "987-654-3210",
    email: "john.doe@example.com",
    occupation: "Data Scientist",
    action: "Participated"
  }
];

function AllEvents() {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const centerId = localStorage.getItem('ID_center');
        if (!centerId) {
          console.error('Center ID is not found in localStorage');
          return;
        }

        const response = await axios.get(`http://localhost:8084/center/allevents/${centerId}`);
        console.log('Events fetched successfully:', response.data);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        if (error.response) {
          console.error('Server responded with status code:', error.response.status);
          console.error('Response data:', error.response.data);
        } else if (error.request) {
          console.error('No response received:', error.request);
        } else {
          console.error('Error setting up the request:', error.message);
        }
      }
    };

    fetchEvents();
  }, []);

  const handleAddEventClick = () => {
    navigate('/centerdashboard/addevent');
  };

  const handleCardImageClick = (eventId) => {
    navigate(`/centerdashboard/eventdetails/${eventId}`);
  };

  const handleDeleteEvent = async (eventId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#2C599D',
      cancelButtonColor: '#FB9B50',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(`http://localhost:8084/event/${eventId}`);
          if (response.status === 200) {
            setEvents(events.filter(event => event.ID_event !== eventId));
            Swal.fire(
              'Deleted!',
              'Your event has been deleted.',
              'success'
            );
          }
        } catch (error) {
          console.error('Error deleting event:', error);
          Swal.fire(
            'Error!',
            'An error occurred while deleting the event.',
            'error'
          );
        }
      }
    });
  };

  const handleViewParticipants = () => {
    setIsModalOpen(true);
  };

  useEffect(() => {
    feather.replace();
  }, [events]);

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="pagetitle">
          <br />
          <button onClick={handleAddEventClick} className="add-course-btn">Add Your Event</button>
          <br /><br />
          {events.length === 0 ? (
            <p>No events available. Please add an event.</p>
          ) : (
            <div className="course-card-container">
              {events.map((event, index) => (
                <div className="course-card" key={index}>
                  <img
                    className="course-card-img"
                    src={event.event_pic ? `http://localhost:8084${event.event_pic}` : "img/imgevent.jpg"}
                    alt="Card image cap"
                    onClick={() => handleCardImageClick(event.ID_event)}
                  />
                  <div className="course-card-body">
                    <h4 className="course-card-title">{event.title_event}</h4>
                    <div className="course-card-button-group">
                      <button type="button" className="course-card-btn-view" onClick={handleViewParticipants}>
                        View participants
                      </button>
                      <a href={`/centerdashboard/eventdetails/${event.ID_event}`} className="course-card-btn-edit">
                        <i className="icon5" data-feather="edit-2"></i>
                      </a>
                      <button
                        type="button"
                        className="course-card-btn-delete"
                        onClick={() => handleDeleteEvent(event.ID_event)}
                      >
                        <i className="icon5" data-feather="trash-2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
      {isModalOpen && (
        <ParticipantsModal2 participants={participants} onClose={() => setIsModalOpen(false)} />
      )}
    </div>
  );
}

export default AllEvents;
