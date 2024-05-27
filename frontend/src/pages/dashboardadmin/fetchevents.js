import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Adminnav from '../../component/adminnav';
import Feather from 'feather-icons';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

const MySwal = withReactContent(Swal);

const EventsFetch = () => {
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        console.error('Admin token not found in localStorage');
        return;
      }

      try {
        const response = await axios.get('http://localhost:8084/admin/events', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();
  }, []);

  const handleDeleteEvent = async (eventId) => {
    try {
      const token = localStorage.getItem('admin_token');
      await axios.delete(`http://localhost:8084/event/${eventId}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      setEvents(events.filter(event => event.ID_event !== eventId));
      MySwal.fire('Deleted!', 'The event has been deleted.', 'success');
    } catch (error) {
      console.error('Error deleting event:', error);
      MySwal.fire('Error!', 'Failed to delete the event.', 'error');
    }
  };

  const confirmDelete = (eventId) => {
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
        handleDeleteEvent(eventId);
      }
    });
  };

  const handleDetailsClick = (eventId) => {
    navigate(`/dashboardadmin/admineventdetails/${eventId}`);
  };

  useEffect(() => {
    Feather.replace();
  }, []);

  return (
    <div>
      <Adminnav />
      <main id="main" className="main-content">
        <div className="page-title">
       
        </div>
        <section className="section">
          <div className="row">
            <div className="col-lg-12">
              <div className="course-list-card">
                <div className="card-body">
                  <h5 className="course-list-title">Events List</h5>
                  {events.length === 0 ? (
                    <p>No events available.</p>
                  ) : (
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>ID</th>
                            <th>Picture</th>
                            <th>Title</th>
                            <th>Location</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {events.map(event => (
                            <tr key={event.ID_event}>
                              <td>{event.ID_event}</td>
                              <td>
                                <img
                                  src={event.event_pic ? `http://localhost:8084${event.event_pic}` : "img/imgevent.jpg"}
                                  alt="Event"
                                  className="img-fluid rounded-circle"
                                  style={{ width: '50px', height: '50px' }}
                                />
                              </td>
                              <td>{event.title_event}</td>
                              <td>{event.event_location}</td>
                              <td>{event.event_date}</td>
                              <td>{event.event_time}</td>
                              <td className="d-flex flex-column flex-md-row p-4">
                                <button
                                  className="btn btn-info btn-sm mr-md-2 mb-2 mb-md-0"
                                  onClick={() => handleDetailsClick(event.ID_event)}
                                  style={{ backgroundColor: '#2C599D', color: 'white' }} // Blue color for Details
                                >
                                  Details
                                </button>
                                <button
                                  className="btn btn-danger btn-sm"
                                  onClick={() => confirmDelete(event.ID_event)}
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
};

export default EventsFetch;
