import React, { useEffect, useState } from 'react';
import Nav from '../../component/centernav';
import axios from 'axios';
import feather from 'feather-icons';
import '../../css/centerdash.css'

function Profile() {
  const [profileData, setProfileData] = useState({
    Center_fullname: '',
    owner_name: '',
    license: '',
    business_id: '',
    bio: '',
    Center_email: '',
    location: '',
    phone_number: '',
    target_audience: '',
    center_pic: ''
  });

  const [editData, setEditData] = useState(profileData);
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const centerId = localStorage.getItem('ID_center'); // Retrieve ID_center from localStorage
        if (centerId) {
          const response = await axios.get(`http://localhost:8084/center/${centerId}`);
          setProfileData(response.data);
          setEditData(response.data); // Initialize edit form with fetched data
        } else {
          console.error('Center ID is null');
        }
      } catch (error) {
        console.error('Error fetching profile data:', error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    feather.replace();
  }, []);

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditData({ ...editData, [name]: value });
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const centerId = localStorage.getItem('ID_center');
      await axios.put(`http://localhost:8084/center/${centerId}`, editData);
      setProfileData(editData); // Update view with edited data
      alert('Profile updated successfully');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    }
  };

  const handleChangePasswordSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New password and confirm password do not match');
      return;
    }
    try {
      const centerId = localStorage.getItem('ID_center');
      await axios.post(`http://localhost:8084/center/change-password`, {
        ID_center: centerId,
        oldPassword: passwordData.oldPassword,
        newPassword: passwordData.newPassword
      });
      alert('Password changed successfully');
      setPasswordData({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    } catch (error) {
      console.error('Error changing password:', error);
      alert('Failed to change password');
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!selectedFile) {
      alert('Please select a file to upload');
      return;
    }

    const formData = new FormData();
    formData.append('center_pic', selectedFile);

    try {
      const centerId = localStorage.getItem('ID_center');
      const response = await axios.post(`http://localhost:8084/center/upload-pic/${centerId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('Profile picture uploaded successfully');
      setSelectedFile(null);
      setProfileData(prevData => ({ ...prevData, center_pic: response.data.center_pic })); // Update the profile picture URL
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture');
    }
  };

  return (
    <div>
      <Nav />
      <br></br>
      <main id="main" className="main">
        <div className="pagetitle">
          <h2>Profile</h2>
        </div>
        <br></br>
        <section className="section profile">
          <div className="row">
            <div className="col-xl-4">
              <div className="profilecard1">
                <div className="profilecard1-body profile-profilecard1 pt-4 d-flex flex-column align-items-center ">
                  <div className="profile-picture-wrapper ">
                    <label htmlFor="profileImage" className="profile-picture-label ml-4 bg-light">
                      <div className="profile-picture ">
                        <img src={profileData.center_pic ? `http://localhost:8084${profileData.center_pic}` : ""}  />
                        <input type="file" id="profileImage" className="file-input" onChange={handleFileChange} />
                      </div>
                    </label>
                    {selectedFile && (
                      <button onClick={handleUploadSubmit} className="btn btn-primary upload-btn">Upload</button>
                    )}
                  </div>
                  <h2 style={{ fontSize: '18px' }}>{profileData.Center_fullname}</h2>
                  <br />
                  <ul className="list-unstyled" style={{ paddingLeft: '25px' }}>
                    <li style={{ marginBottom: '20px' }}><strong>Owner</strong> {profileData.owner_name}</li>
                    <li style={{ marginBottom: '20px' }}><strong>License</strong> {profileData.license}</li>
                    <li><strong>Tax ID</strong> {profileData.business_id}</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-xl-8">
              <div className="profilecard1">
                <div className="profilecard1-body pt-3">
                  <ul className="nav nav-tabs nav-tabs-bordered">
                    <li className="nav-item">
                      <button className="nav-link active" data-bs-toggle="tab" data-bs-target="#profile-overview">Overview</button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-edit">Edit Profile</button>
                    </li>
                    <li className="nav-item">
                      <button className="nav-link" data-bs-toggle="tab" data-bs-target="#profile-change-password">Change Password</button>
                    </li>
                  </ul>
                  <div className="tab-content pt-2">
                    <div className="tab-pane fade show active profile-overview" id="profile-overview">
                      <h5 className="profilecard1-title pt-4">About</h5>
                      <p className="py-2" style={{ fontSize: '15px' }}>{profileData.bio}</p>
                      <h5 className="profilecard1-title py-3">Profile Details</h5>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Full Name</div>
                        <div className="col-lg-9 col-md-8">{profileData.Center_fullname}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Email</div>
                        <div className="col-lg-9 col-md-8">{profileData.Center_email}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Location</div>
                        <div className="col-lg-9 col-md-8">{profileData.location}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Phone</div>
                        <div className="col-lg-9 col-md-8">{profileData.phone_number}</div>
                      </div>
                      <div className="row">
                        <div className="col-lg-3 col-md-4 label">Public target</div>
                        <div className="col-lg-9 col-md-8">{profileData.target_audience}</div>
                      </div>
                    </div>
                    <div className="tab-pane fade profile-edit pt-3" id="profile-edit">
                      <form onSubmit={handleEditSubmit}>
                      <div className="row mb-3">
                          <label htmlFor="profileImage" className="col-md-4 col-lg-3 col-form-label">Profile Image</label>
                          <div className="col-md-8 col-lg-9">
                            <img src={profileData.center_pic ? `http://localhost:8084${profileData.center_pic}` : "../assets/images/users/profile-pic.jpg"}  className="user-pic" />
                            <div className="pt-2 ml-3">
                              <input type="file" id="profileImage" className="file-input" onChange={handleFileChange} />
                              <a
        href="#"
        className="btn btn-sm"
        title="Upload new profile image"
        onClick={() => document.getElementById('profileImage').click()}
        style={{ backgroundColor: '#2C599D', color: 'white' }}
      >
        <i data-feather="upload"></i>
      </a>
      <a
        href="#"
        className="btn btn-sm"
        title="Remove my profile image"
        style={{ backgroundColor: '#FB9B50', color: 'white', margin:'10px' }}
      >
        <i data-feather="trash-2"></i>
      </a>
                            </div>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="about" className="col-md-4 col-lg-3 col-form-label">About</label>
                          <div className="col-md-8 col-lg-9">
                            <textarea name="bio" className="form-control" id="about" style={{ height: '100px' }} value={editData.bio} onChange={handleEditChange}></textarea>
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Center_fullname" className="col-md-4 col-lg-3 col-form-label">Full Name</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="Center_fullname" type="text" className="form-control" id="Center_fullname" value={editData.Center_fullname} onChange={handleEditChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="owner_name" className="col-md-4 col-lg-3 col-form-label">Owner</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="owner_name" type="text" className="form-control" id="owner_name" value={editData.owner_name} onChange={handleEditChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="license" className="col-md-4 col-lg-3 col-form-label">License</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="license" type="text" className="form-control" id="license" value={editData.license} onChange={handleEditChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="Center_email" className="col-md-4 col-lg-3 col-form-label">Email</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="Center_email" type="text" className="form-control" id="Center_email" value={editData.Center_email} onChange={handleEditChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="location" className="col-md-4 col-lg-3 col-form-label">Location</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="location" type="text" className="form-control" id="location" value={editData.location} onChange={handleEditChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="phone_number" className="col-md-4 col-lg-3 col-form-label">Phone</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="phone_number" type="text" className="form-control" id="phone_number" value={editData.phone_number} onChange={handleEditChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="target_audience" className="col-md-4 col-lg-3 col-form-label">Public target</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="target_audience" type="text" className="form-control" id="target_audience" value={editData.target_audience} onChange={handleEditChange} />
                          </div>
                        </div>
                       
                        <div className="row justify-content-end">
                          <div className="col-md-8 col-lg-9">
                            <button type="submit" className="btn btn-primary" Onclick={handleEditSubmit}>Save changes</button>
                          </div>
                        </div>
                      </form>
                    </div>
                    <div className="tab-pane fade profile-change-password pt-3" id="profile-change-password">
                      <form onSubmit={handleChangePasswordSubmit}>
                        <div className="row mb-3">
                          <label htmlFor="oldPassword" className="col-md-4 col-lg-3 col-form-label">Old Password</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="oldPassword" type="password" className="form-control" id="oldPassword" value={passwordData.oldPassword} onChange={handlePasswordChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="newPassword" type="password" className="form-control" id="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} />
                          </div>
                        </div>
                        <div className="row mb-3">
                          <label htmlFor="confirmPassword" className="col-md-4 col-lg-3 col-form-label">Confirm Password</label>
                          <div className="col-md-8 col-lg-9">
                            <input name="confirmPassword" type="password" className="form-control" id="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} />
                          </div>
                        </div>
                        <div className="row justify-content-end">
                          <div className="col-md-8 col-lg-9">
                            <button type="submit" className="btn btn-primary">Change Password</button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default Profile;
