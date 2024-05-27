import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Adminnav from '../../component/adminnav';
import Feather from 'feather-icons';
import './admin.css'; // Import your CSS file here

const AdminEventDetails = () => {
  const { eventId } = useParams();
  const [eventDetails, setEventDetails] = useState(null);

  useEffect(() => {
    console.log("Event ID:", eventId); // Check the Event ID
    const fetchEventDetails = async () => {
      const token = localStorage.getItem('admin_token');
      if (!token) {
        console.error('Admin token not found in localStorage');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8084/admin/eventdetails/${eventId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setEventDetails(response.data);
      } catch (error) {
        console.error('Error fetching event details:', error);
      }
    };

    fetchEventDetails();
  }, [eventId]);

  useEffect(() => {
    Feather.replace();
  }, [eventDetails]);

  if (!eventDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Adminnav />
      <main id="main" className="main-content">
        <div className="page-title">
       
        </div>
        <section className="section profile-section">
          <div className="row">
            <div className="col-lg-8">
              <div className="event-details-container">
                <div className="event-details-body">
                  <h5 className="event-details-title">Event Information</h5>
                  <p><strong className="text-secondary">Title:</strong> {eventDetails.title_event}</p>
                  <p><strong className="text-secondary">Description:</strong> {eventDetails.event_description}</p>
                  <p><strong className="text-secondary">Location:</strong> {eventDetails.event_location}</p>
                  <p><strong className="text-secondary">Date:</strong> {eventDetails.event_date}</p>
                  <p><strong className="text-secondary">Time:</strong> {eventDetails.event_time}</p>
                  <p><strong className="text-secondary">Price:</strong> {eventDetails.event_price}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="event-details-container">
                <div className="event-details-body text-center">
                  <img
                    src={`http://localhost:8084${eventDetails.event_pic}`}
                    alt="Event"
                    className="event-details-img-fluid"
                    style={{ maxWidth: '100%' }}
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AdminEventDetails;
