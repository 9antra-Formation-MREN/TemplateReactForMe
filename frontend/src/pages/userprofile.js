import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import '../css/profile.css';
import GalleryImage from '../img/section/gallery.png';
import PROF from '../img/section/prof.png';
import { User, Bell, Settings, List, Image, Menu, X } from 'react-feather';
import Header from '../component/header';

const ProfilePage = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileImage, setProfileImage] = useState(GalleryImage);
  const [activeTab, setActiveTab] = useState('account');
  const [isEditing, setIsEditing] = useState(false);
  const [courseType, setCourseType] = useState('');
  const [showAcademicList, setShowAcademicList] = useState(false);
  const [showProfessionalList, setShowProfessionalList] = useState(false);
  const [showWebDevList, setShowWebDevList] = useState(false);
  const [showHobbyList, setShowHobbyList] = useState(false);
  const [showVocationalList, setShowVocationalList] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleClosePopup = () => {
    setIsEditing(false);
  };

  const handleCourseTypeChange = (event) => {
    const selectedType = event.target.value;
    setCourseType(selectedType);

    setShowAcademicList(selectedType === 'Academic Courses');
    setShowProfessionalList(selectedType === 'Professional Development Courses');
    setShowWebDevList(selectedType === 'Web Development');
    setShowHobbyList(selectedType === 'Hobby/Interest-based Courses');
    setShowVocationalList(selectedType === 'Vocational/Technical Courses');
  };

  return (
    <>
      <Header/>
    <div className="profile-container">
        <div className="popo-header">
        <img src={PROF} alt="Tailored Course Recommendations" />
      </div>
      <header className="profile-header">
        <button className="unique-burger-menu" onClick={toggleSidebar}>
          <Menu />
        </button>
        <div className={`profile-side-mobile ${sidebarOpen ? 'open' : ''}`}>
        <Link to="/userprofile" className="unique-side"><Settings /> Settings</Link>
          <Link to="/mylist" className="unique-side"><List /> My List</Link>
          <Link to="/usernotif" className="unique-side"><Bell /> Notifications</Link>
        </div>
      </header>
      <main className="profile-main">
        <aside className="profile-side">
        <Link to="/userprofile" className="unique-side"><Settings /> Settings</Link>
          <Link to="/mylist" className="unique-side"><List /> My List</Link>
          <Link to="/usernotif" className="unique-side"><Bell /> Notifs</Link>
        </aside>

        <section className="profile-content">
          <h2 className='Pro'>Profile</h2>
          <div className="profile-tabs">
            <button 
              className={`tab ${activeTab === 'account' ? 'active' : ''}`} 
              onClick={() => setActiveTab('account')}
            >
              Account Setting
            </button>
            <button 
              className={`tab ${activeTab === 'preferences' ? 'active' : ''}`} 
              onClick={() => setActiveTab('preferences')}
            >
              Preferences
            </button>
          </div>

          {activeTab === 'account' && (
            <div className="profile-form">
              <div className="prof-picture">
                <input
                  type="file"
                  id="file-input"
                  accept="image/*"
                  style={{ display: 'none' }}
                  onChange={handleImageChange}
                />
                <label htmlFor="file-input">
                  <img src={profileImage} alt="Upload" className="upload-img" />
                  <span className='upload'>Upload your photo</span>
                </label>
              </div>
              <form className="changes">
     
        <label htmlFor="fullName" className="tag-p">Full name</label>
        <input type="text" className="form-control" id="fullName" placeholder="Full name" />
   
  
        <label htmlFor="email" className="tag-p">Email</label>
        <input type="email" className="form-control" id="email" placeholder="Email" />
   
  
        <label htmlFor="phoneNumber" className="tag-p">Phone number</label>
        <input type="tel" className="form-control" id="phoneNumber" placeholder="Phone number" />
     
                <div className="form-actions">
                  <button type="submit" className="btn-update">Update Profile</button>
                  <button type="reset" className="btn-reset">Reset</button>
                </div>
              </form>
            </div>
          )}

          {activeTab === 'preferences' && (
            <div className="preferences-content">
              <div className="preferences-column">
                <div className="preferences-item">
                  <span>Learning method</span>
                  <p>In person</p>
                </div>
                <div className="preferences-item">
                  <span>Preferred Certifications</span>
                  <p>Available</p>
                </div>
                <div className="preferences-item">
                  <span>Type of course</span>
                  <p>Web development</p>
                </div>
                <div className="preferences-item">
                  <span>Duration</span>
                  <p>Short term</p>
                </div>
              </div>
              <div className="preferences-column">
                <div className="preferences-item">
                  <span>Level</span>
                  <p>Beginner</p>
                </div>
                <div className="preferences-item">
                  <span>Language</span>
                  <p>French</p>
                </div>
                <div className="preferences-item">
                  <span>Categories</span>
                  <p>Front end development</p>
                </div>
                <div className="preferences-item">
                  <span>Budget</span>
                  <p>100dt</p>
                </div>
              </div>
              <div className="preferences-edit">
                <button className="badel-bouton" onClick={handleEditClick}>
                  Edit
                </button>
              </div>
            </div>
          )}
        </section>
      </main>

      {isEditing && (
        <div className="popup-overlay">
          <div className="popup-editing">
            <button className="close-popup" onClick={handleClosePopup}><X /></button>
            <h3>Edit Preferences</h3>
            <form className="popup-form">
              <div className="popup-form-row">
                <div className="popup-form-item">
                  <label>Learning method</label>
                  <select>
                    <option value="methode of learning">methode of learning </option>
                    <option value="Beginner">Online</option>
                    <option value="Intermidate">Hybrid</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
                <div className="popup-form-item">
                  <label>Level</label>
                  <select>
                    <option value=""> Level</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>
              <div className="popup-form-row">
                <div className="popup-form-item">
                  <label>Certification</label>
                  <select>
                    <option value="Certification">Certification</option>
                    <option value="available">Available</option>
                    <option value="Not available">Not available</option>
                    <option value="No prefrence">No prefrence</option>
                  </select>
                </div>
                <div className="popup-form-item">
                  <label>Language</label>
                  <select>
                    <option value="language">Language</option>
                    <option value="English">English</option>
                    <option value="French">French</option>
                    <option value="Arabic">Arabic</option>
                    <option value="Spanish">Spanish</option>
                    <option value="other">other</option> 
                  </select>
                </div>
              </div>
              <div className="popup-form-row">
                <div className="popup-form-item">
                  <label>Course type</label>
                  <select onChange={handleCourseTypeChange}>
                    <option value="">Type of course</option>
                    <option value="Academic Courses">Academic Courses</option>
                    <option value="Professional Development Courses">Professional Development Courses</option>
                    <option value="Web Development">Web Development</option>
                    <option value="Hobby/Interest-based Courses">Hobby/Interest-based Courses</option>
                    <option value="Vocational/Technical Courses">Vocational/Technical Courses</option>
                  </select>
                </div>
                <div className="popup-form-item">
                  <label>Course category</label>
                  <select>
                    <option value="">Course category</option>
                    {showAcademicList && (
                      <>
                        <option value="Math">Math</option>
                        <option value="Science">Science</option>
                        <option value="Humanities">Humanities</option>
                        <option value="Social Sciences">Social Sciences</option>
                        <option value="Languages">Languages</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Data Science">Data Science</option>
                        <option value="Cybersecurity">Cybersecurity</option>
                        <option value="Graphic Design">Graphic Design</option>
                      </>
                    )}
                    {showProfessionalList && (
                      <>
                        <option value="Project Management">Project Management</option>
                        <option value="Finance">Finance</option>
                        <option value="Human Resources">Human Resources</option>
                        <option value="Sales">Sales</option>
                        <option value="Leadership and Management">Leadership and Management</option>
                      </>
                    )}
                    {showWebDevList && (
                      <>
                        <option value="Full Stack Development">Full Stack Development</option>
                        <option value="Frontend Development">Frontend Development</option>
                        <option value="Backend Development">Backend Development</option>
                        <option value="JavaScript Frameworks">JavaScript Frameworks</option>
                        <option value="Web Design">Web Design</option>
                      </>
                    )}
                    {showHobbyList && (
                      <>
                        <option value="Cooking">Cooking</option>
                        <option value="Photography">Photography</option>
                        <option value="Painting">Painting</option>
                        <option value="Music">Music</option>
                        <option value="Writing">Writing</option>
                        <option value="Fitness and Nutrition">Fitness and Nutrition</option>
                        <option value="Beauty and Personal Care">Beauty and Personal Care</option>
                      </>
                    )}
                    {showVocationalList && (
                      <>
                        <option value="Plumbing">Plumbing</option>
                        <option value="Automotive Mechanics">Automotive Mechanics</option>
                        <option value="Carpentry">Carpentry</option>
                        <option value="Welding">Welding</option>
                        <option value="Electrician Training">Electrician Training</option>
                        <option value="Heating, Ventilation, and Air Conditioning">Heating, Ventilation, and Air Conditioning</option>
                      </>
                    )}
                  </select>
                </div>
              </div>
              <div className="popup-form-row">
                <div className="popup-form-item">
                  <label> Duration</label>
                  <select>
                    <option value="">Course duration</option>
                    <option value="Short-term (e.g., 1-3 months)">Short-term (e.g., 1-3 months)</option>
                    <option value="Medium-term (e.g., 3-6 months)">Medium-term (e.g., 3-6 months)</option>
                    <option value="Long-term (e.g., 6+ months)">Long-term (e.g., 6+ months)</option>
                  </select>
                </div>
                <div className="popup-form-item">
                  <label>Budget</label>
                  <select>
                    <option value="budget">Budget  </option>
                    <option value="Less than 100DT">Less than 100DT</option>
                    <option value="100DT - 300DT">100DT - 300DT</option>
                    <option value="A300DT - 900DT">300DT - 900DT</option>
                    <option value="More than 900DT">More than 900DT</option>
                    <option value="None of the above">None of the above</option>
                  </select>
                </div>
              </div>
              <div className="popup-actions">
                <button type="button" className="savi-lwaz">Save changes</button>
                <button type="button" className="cancelled-pur" onClick={handleClosePopup}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default ProfilePage;
