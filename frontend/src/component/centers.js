import React from 'react';
import containImage from '../img/section/contain.png'; 
import c1 from '../img/section/hlc.png'; 
import c2 from '../img/section/propser.png'; 


const TrainingCenters = () => {
  return (
    <div className="container mt-5">
    <div className="titles-some" style={{ backgroundImage: `url(${containImage})` }}>
      <h1>Featured Training Centers</h1>
      <h2>Explore the offerings and achievements of our featured training centers</h2>
      <a href="#" className="browse-all">Browse All</a>
    </div>

      <div className="card-container-card ">
        <div className="row">
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <img className="card-img-top img-fluid clickable-image" src={c2} alt="Card image cap" />
              <div className="card-body">
                <h3 className="card__title">Proservices Training Company</h3>
                <p className="card__content">which offers continuing professional training in different areas: Test and validation, Marketing, Design, Project Management. </p>
                <div className="card__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25" width="25">
                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card">
              <img className="card-img-top img-fluid clickable-image" src={c1} alt="Card image cap" />
              <div className="card-body">
                <h3 className="card__title">HLC Training Center</h3>
                <p className="card__content">HLC offers a variety of professional training programs in areas such as software development, data science, and cybersecurity.</p>
                <div className="card__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25" width="25">
                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-6 col-lg-3">
            <div className="card">
              <img className="card-img-top img-fluid clickable-image" src={c2} alt="Card image cap" />
              <div className="card-body">
                <h3 className="card__title">Proservices Training Company</h3>
                <p className="card__content">which offers continuing professional training in different areas: Test and validation, Marketing, Design, Project Management. </p>
                <div className="card__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25" width="25">
                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <div className="col-md-6 col-lg-3">
            <div className="card">
              <img className="card-img-top img-fluid clickable-image" src={c1} alt="Card image cap" />
              <div className="card-body">
                <h3 className="card__title">HLC Training Center</h3>
                <p className="card__content">HLC offers a variety of professional training programs in areas such as software development, data science, and cybersecurity.</p>
                <div className="card__arrow">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" height="25" width="25">
                    <path fill="#fff" d="M13.4697 17.9697C13.1768 18.2626 13.1768 18.7374 13.4697 19.0303C13.7626 19.3232 14.2374 19.3232 14.5303 19.0303L20.3232 13.2374C21.0066 12.554 21.0066 11.446 20.3232 10.7626L14.5303 4.96967C14.2374 4.67678 13.7626 4.67678 13.4697 4.96967C13.1768 5.26256 13.1768 5.73744 13.4697 6.03033L18.6893 11.25H4C3.58579 11.25 3.25 11.5858 3.25 12C3.25 12.4142 3.58579 12.75 4 12.75H18.6893L13.4697 17.9697Z"></path>
                  </svg>
                
                  </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
     
   
  );
};

export default TrainingCenters;
