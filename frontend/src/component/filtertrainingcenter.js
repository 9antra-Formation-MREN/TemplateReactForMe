import React from 'react';

const Popuptraining = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="popup-body">
          <div className="form-group">
            <label>Location</label>
            <select className="form-control">
              <option>New York</option>
              <option>Los Angeles</option>
              <option>Chicago</option>
              <option>Houston</option>
              <option>Online</option>
            </select>
          </div>
          <div className="form-group">
            <label>Language</label>
            <select className="form-control">
              <option>English</option>
              <option>French</option>
              <option>Spanish</option>
              <option>German</option>
              <option>Arabe</option>
            </select>
          </div>
          <div className="form-group">
            <label>Learning Method</label>
            <select className="form-control">
              <option>online</option>
              <option>Hybrid</option>
              <option>in person</option>
            </select>
          </div>
          <div className="form-group">
            <label>Skill Level</label>
            <select className="form-control">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label>Course Category</label>
            <select className="form-control">
              <option>Design</option>
              <option>Development</option>
              <option>Marketing</option>
              <option>Data Science</option>
              <option>Business</option>
            </select>
          </div>
          <div className="form-group">
            <label>Certification</label>
            <select className="form-control">
              <option>Yes</option>
              <option>No</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Popuptraining;
