import React from 'react';


const Popup = ({ onClose }) => {
  return (
    <div className="popup-container">
      <div className="popup">
        <div className="popup-header">
          <button className="close-button" onClick={onClose}>X</button>
        </div>
        <div className="popup-body">
          <div className="form-group">
            <label>Price</label>
            <select className="form-control">
              <option>Free</option>
              <option>Paid</option>
            </select>
          </div>
          <div className="form-group">
            <label>Location</label>
            <select className="form-control">
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>
          <div className="form-group">
            <label>Course type</label>
            <select className="form-control">
              <option>Online</option>
              <option>Offline</option>
            </select>
          </div>
          <div className="form-group">
            <label>Course category</label>
            <select className="form-control">
              <option>Design</option>
              <option>Development</option>
              <option>Marketing</option>
            </select>
          </div>
          <div className="form-group">
            <label>Learning method</label>
            <select className="form-control">
              <option>Self-paced</option>
              <option>Instructor-led</option>
            </select>
          </div>
          <div className="form-group">
            <label>Skill level</label>
            <select className="form-control">
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
          <div className="form-group">
            <label>Group</label>
            <select className="form-control">
              <option>Group 1</option>
              <option>Group 2</option>
            </select>
          </div>
          <div className="form-group">
            <label>Duration</label>
            <select className="form-control">
              <option>Short</option>
              <option>Medium</option>
              <option>Long</option>
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

export default Popup;
