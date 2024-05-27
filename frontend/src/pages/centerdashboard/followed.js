import React, { useEffect, useState } from 'react';
import feather from 'feather-icons';
import Nav from '../../component/centernav';


const Followers = () => {
  const [followers, setFollowers] = useState([
    { id: 1, profile: 'User 1 Profile', phone: 'User 1 Phone', email: 'User 1 Email', occupation: 'User 1 Occupation' },
    { id: 2, profile: 'User 2 Profile', phone: 'User 2 Phone', email: 'User 2 Email', occupation: 'User 2 Occupation' },
  ]);

  useEffect(() => {
    feather.replace();
  }, []);

  const handleDelete = (id) => {
    setFollowers(followers.filter(follower => follower.id !== id));
  };

  return (
    <div>
      <Nav />
      <main id="main" className="main">
        <div className="pagetitle">
        <br></br>
          <div className="d-flex align-items-center">
            
            <h1 className="mr-4">Followers</h1>
            <div className="followers-count">
              <i className="feather-icon" data-feather="users"></i>
              <span id="followers-count">{followers.length}</span>
            </div>
          </div>
        </div>
        
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Phone</th>
                <th>Email</th>
                <th>Occupation</th>
                <th></th> {/* Empty header for delete button */}
              </tr>
            </thead>
            <tbody>
              {followers.map((follower) => (
                <tr key={follower.id}>
                  <td>{follower.profile}</td>
                  <td>{follower.phone}</td>
                  <td>{follower.email}</td>
                  <td>{follower.occupation}</td>
                  <td>
                    <button className="btn-delete" onClick={() => handleDelete(follower.id)}>
                      <i className="feather-icon" data-feather="trash-2"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
};

export default Followers;
