import React from 'react';
import './CustomAlert.css'; // Create and style this CSS file as needed

const CustomAlert = ({ message, onClose }) => {
  return (
    <div className="custom-alert">
      <div className="custom-alert-content">
        <span className="custom-alert-message">{message}</span>
        <button className="custom-alert-close" onClick={onClose}>&times;</button>
      </div>
    </div>
  );
};

export default CustomAlert;
