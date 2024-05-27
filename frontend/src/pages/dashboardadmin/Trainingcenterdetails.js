import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Adminnav from '../../component/adminnav';
import feather from 'feather-icons';
import './admin.css';

const CenterDetails = () => {
  const { centerId } = useParams();
  const [centerDetails, setCenterDetails] = useState(null);

  useEffect(() => {
    const fetchCenterDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8084/center/${centerId}`);
        setCenterDetails(response.data);
      } catch (error) {
        console.error('Error fetching center details:', error);
      }
    };

    fetchCenterDetails();
  }, [centerId]);

  if (!centerDetails) {
    return <div>Loading...</div>;
  }

  feather.replace();

  return (
    <div>
      <Adminnav />
      <main id="main" className="center-details-main">
        <div className="center-details-pagetitle">
          <br></br>
        </div>
        <section className="center-details-section profile">
          <div className="row">
            <div className="col-lg-8">
              <div className="center-details-card">
                <div className="center-details-card-body">
                  <h5 className="center-details-card-title">Center Information</h5>
                  <p><strong className="text-secondary">Full Name:</strong> {centerDetails.Center_fullname}</p>
                  <p><strong  className="text-secondary">Email:</strong> {centerDetails.Center_email}</p>
                  <p><strong  className="text-secondary">Phone:</strong> {centerDetails.phone_number}</p>
                  <p><strong  className="text-secondary">City:</strong> {centerDetails.city}</p>
                  <p><strong  className="text-secondary">Location:</strong> {centerDetails.location}</p>
                  <p><strong  className="text-secondary">License:</strong> {centerDetails.license}</p>
                  <p><strong  className="text-secondary">Business ID:</strong> {centerDetails.business_id}</p>
                  <p><strong  className="text-secondary">Bio:</strong> {centerDetails.bio}</p>
                  <p><strong  className="text-secondary">Course Category:</strong> {centerDetails.course_category}</p>
                  <p><strong  className="text-secondary">Language:</strong> {centerDetails.language}</p>
                  <p><strong  className="text-secondary">Target Audience:</strong> {centerDetails.target_audience}</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="center-details-card">
                <div className="center-details-card-body text-center">
                  <img
                    src={`http://localhost:8084${centerDetails.center_pic}`}
                    alt="Center"
                    className="center-details-img-fluid"
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
}

export default CenterDetails;
