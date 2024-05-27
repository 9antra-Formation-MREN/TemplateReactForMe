import React from 'react';
import Nav from '../../component/centernav';


const Requestcenter = () => {
  const requests = [
    { id: 1, name: 'Emna Sahraoui', message: 'has requested to join your course' },
    { id: 2, name: 'Saba Ghanouchy', message: 'has requested to join your course' },
  ];

  const handleAccept = (requestId) => {
    // Handle the accept action here
    console.log(`Accepted request ID: ${requestId}`);
  };

  const handleDecline = (requestId) => {
    // Handle the decline action here
    console.log(`Declined request ID: ${requestId}`);
  };

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="pagetitle">
          <br></br>
         
          <div className="requests-container row">
            {requests.map((request) => (
              <div className="col-lg-12 md-6" key={request.id}>
                <div className="request-card">
                  <p>{`${request.name} ${request.message}`}</p>
                  <div className="action-buttons">
                    <button className="btn-primary" onClick={() => handleAccept(request.id)}>Accept</button>
                    <button className="btn-orange" onClick={() => handleDecline(request.id)}>Decline</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Requestcenter;
