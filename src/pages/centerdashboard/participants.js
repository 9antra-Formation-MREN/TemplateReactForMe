import React from 'react';
import '../../css/centerdash.css';

const ParticipantsModal = ({ participants, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Participants</h2>
        <div className="table-responsive">
          <table className="participants-table">
            <thead>
              <tr>
                <th>Profile Picture</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Occupation</th>
                <th>Level</th>
              </tr>
            </thead>
            <tbody>
              {participants.map((participant, index) => (
                <tr key={index}>
                  <td><img src={participant.profile_pic} alt="Profile" className="profileevent" /></td>
                  <td>{participant.name}</td>
                  <td>{participant.phone}</td>
                  <td>{participant.email}</td>
                  <td>{participant.occupation}</td>
                  <td>{participant.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <button className="modal-close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ParticipantsModal;
