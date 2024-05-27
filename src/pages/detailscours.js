import React, { useState } from 'react';
import Header from '../component/header';
import Footer from '../component/footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Bookmark from '../component/Bookmark'; // Import the Bookmark component
import '../css/homepage.css';
import '../css/detailcours.css';
import { Users, Star } from 'react-feather';
import Train from '../img/section/SAB.png';
import reactJsImage from '../img/section/reactjs.jpeg';
import centerImage from '../img/section/center.png';
import nodeJsImage from '../img/section/node.png';
import mongoDbImage from '../img/section/mongo.png';
import angularImage from '../img/section/ang.png';
import circImage from '../img/section/circ.png';
import hihi from '../img/section/hihi.png';
import instructorImage from '../img/section/instructor.png';
import User1 from '../img/section/user1.jpeg';
import User2 from '../img/section/user2.jpeg';

function Details() {
  const [activeTab, setActiveTab] = useState('content');
  const [newComment, setNewComment] = useState('');
  const [comments, setComments] = useState([
    { username: 'Saif ben mohamed', text: 'This is a very informative course!', image: User1, date: new Date('2023-05-20T14:48:00') },
    { username: 'Olfa Talbi', text: 'I learned a lot from this course.', image: User2, date: new Date('2023-05-21T09:30:00') }
  ]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handlePublishComment = () => {
    if (newComment.trim() !== '') {
      setComments([...comments, { username: 'Anonymous', text: newComment, image: User1, date: new Date() }]);
      setNewComment('');
    }
  };

  const formatDate = (date) => {
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };


  return (
    <>
      <Header />
      <div className='title-event-det mt-5 '>
        <h1 className="mb-5 text-center"> Courses Details</h1>
      </div>
      <div className="details-picture-custom text-center">
        <img src={Train} alt="Tailored Course Recommendations" className="img-fluid" />
      </div>
      <div className="details-container-custom container mt-5">
        <div className="row">
          <div className="details-content-custom col-lg-8 col-md-12">
            <h1 className="details-title-custom">Full course React JS</h1>
            <div className="details-header-custom">
              <div className="details-reviews-custom">
                <span>Reviews (15 reviews)</span>
                <div className="details-stars-custom">
                  {Array(5).fill().map((_, i) => (
                    <Star key={i} className="details-star-icon-custom" />
                  ))}
                </div>
              </div>
              <div className="details-category-custom">
                <span>Category</span>
                <p>Web development</p>
              </div>
              <div className="details-group-custom">
                <Users className="details-icon-custom" />
                <p>Group 20 people</p>
              </div>
            </div>
            <img className="details-image-custom img-fluid" src={reactJsImage} alt="React Course" />
            <div className='details-center-custom'>
              <img src={centerImage} alt="Center Course" />
              <p className="mt-3">Proservices Training Company</p>
            </div>
            <p className="details-description-custom">
              Our React course offers comprehensive instruction for beginners and experienced developers alike.
              Learn to build dynamic user interfaces with hands-on projects and expert guidance.
              Covering core concepts, state management, routing, hooks, and more, this course equips you with essential skills for modern web development.
              Gain practical insights and create a portfolio of real-world projects to showcase your proficiency in React.
              Start mastering React today and elevate your career in web development.
            </p>
            <div className="details-content-container-custom">
              <h3 
                onClick={() => setActiveTab('content')} 
                className={activeTab === 'content' ? 'active' : ''}
              >
                Content
              </h3>
              <h3 
                onClick={() => setActiveTab('instructor')} 
                className={activeTab === 'instructor' ? 'active' : ''}
              >
                Instructor
              </h3>
              <h3 
                onClick={() => setActiveTab('comments')} 
                className={activeTab === 'comments' ? 'active' : ''}
              >
                Comments
              </h3>
            </div>
            {activeTab === 'content' && (
              <div className='details-content-list-custom'>
                <ul>
                  <li>
                    <img src={hihi} alt="hihi" className="hihi-image" />
                    Part 1: Introduction to React.js
                  </li>
                  <li>
                    <img src={hihi} alt="hihi" className="hihi-image" />
                    Part 2: Getting Started with React.js
                  </li>
                  <li>
                    <img src={hihi} alt="hihi" className="hihi-image" />
                    Part 3: Fundamentals of React Components
                  </li>
                  <li>
                    <img src={hihi} alt="hihi" className="hihi-image" />
                    Part 4: Advanced React Concepts
                  </li>
                  <li>
                    <img src={hihi} alt="hihi" className="hihi-image" />
                    Part 5: Building Real-world Applications with React
                  </li>
                </ul>
              </div>
            )}
            {activeTab === 'instructor' && (
              <div className='details-instructor-custom'>
                <img src={instructorImage} alt="Instructor" className="instructor-image" />
                <span>Samira Ben Ali (IT Engineer)</span>
              </div>
            )}
            {activeTab === 'comments' && (
              <div className='details-comments-custom'>
                {comments.map((comment, index) => (
                  <div className='comment' key={index}>
                    <img src={comment.image} alt="User" className="comment-image" />
                    <div>
                      <span className="comment-username">{comment.username}</span>
                      <p className="comment-text">{comment.text}</p>
                      <span className="comment-date-time">{formatDate(comment.date)}</span>
                    </div>
                  </div>
                ))}
                <div className='comment-section'>
                  <h3>Add a Comment</h3>
                  <textarea 
                    value={newComment} 
                    onChange={handleCommentChange} 
                    placeholder="Write your comment here..."
                  />
                  <button onClick={handlePublishComment}>Publish</button>
                </div>
              </div>
            )}
          </div>
          <div className="details-sidebar-custom col-lg-4 col-md-12">
            <div className="details-features-custom">
              <h3>Course Features</h3>
              <ul>
                <li><span>Date</span><span className='details-blue-custom'>24/05/2024</span></li>
                <hr />
                <li><span>Method</span><span className='details-blue-custom'>Online</span></li>
                <hr />
                <li><span>Duration</span><span className='details-blue-custom'>Short term</span></li>
                <hr />
                <li><span>Skill level</span><span className='details-blue-custom'>Beginner</span></li>
                <hr />
                <li><span>Certification</span><span className='details-blue-custom'>Available</span></li>
                <hr />
                <li><span>Language</span><span className='details-blue-custom'>French</span></li>
                <hr />
              </ul>
              <h5 className='details-price-custom'>Course price: <span className='details-price-value-custom'>400 dt</span></h5>
              <button className="details-btn-register-custom">Register now</button>
            </div>
            <div className="learning-goals-custom">
              <h3>Learning Goals</h3>
              <ul>
                <li><img src={circImage} alt="circ" className="learning-goals-icon" /> Master React.js fundamentals.</li>
                <li><img src={circImage} alt="circ" className="learning-goals-icon" /> Build dynamic interfaces efficiently.</li>
                <li><img src={circImage} alt="circ" className="learning-goals-icon" /> Learn advanced React techniques.</li>
                <li><img src={circImage} alt="circ" className="learning-goals-icon" /> Manage state effectively.</li>
                <li><img src={circImage} alt="circ" className="learning-goals-icon" /> Gain practical experience in application development.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='details-suggestions-custom container'>
        <h3 className="text-center">Other similar courses</h3>
        <div className='details-course-cards-custom row'>
          <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
            <img src={nodeJsImage} alt='Node.js Course' className="img-fluid" />
            <div className='details-card-content-custom'>
              <span className='details-course-tag-custom'>Web development</span>
              <h4>Learn Full Stack NodeJs</h4>
              <button className='details-enroll-button-custom-det'>Enroll Now</button>
              <div className='marqua'> <Bookmark /></div>
            </div>
          </div>
          <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
            <img src={mongoDbImage} alt='MongoDB Course' className="img-fluid" />
            <div className='details-card-content-custom'>
              <span className='details-course-tag-custom'>Web development</span>
              <h4>MongoDB Course</h4>
              <button className='details-enroll-button-custom-det'>Enroll Now</button>
              <div className='marqua'> <Bookmark /></div>
            </div>
          </div>
          <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
            <img src={angularImage} alt='Angular Course' className="img-fluid" />
            <div className='details-card-content-custom'>
              <span className='details-course-tag-custom'>Web development</span>
              <h4>Discover Angular</h4>
              <button className='details-enroll-button-custom-det'>Enroll Now</button>
              <div className='marqua'> <Bookmark /></div>
            </div>
          </div>
          <div className='details-course-card-custom col-lg-4 col-md-6 col-sm-12 mb-3'>
            <img src={angularImage} alt='Angular Course' className="img-fluid" />
            <div className='details-card-content-custom'>
              <span className='details-course-tag-custom'>Web development</span>
              <h4>Discover Angular</h4>
              <button className='details-enroll-button-custom-det'>Enroll Now</button>
              <div className='marqua'> <Bookmark /></div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Details;
