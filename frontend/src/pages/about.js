import React from 'react'
import Header from '../component/header';
import Footer from '../component/footer';

import '../css/about.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import CC from '../img/hero/cc.png';
import LEARN from '../img/hero/learner.png';
import  TUTO from '../img/hero/tutor.png';
import  BAR from '../img/hero/bar2.png';

function About() {
  return (
    <>
      <Header/>
      <div className="head-about">
       <img src={CC} alt="header" />
       <div className='content-overlay'>
         <div className="about-title">
           <h2>Elevate your learning<br />with FOR ME</h2>
           <p>Where learners are connected to personalised excellence</p>
           <a style={{ '--clr': '#7808d0' }} className="button px-2 " href="#">
             <span className="buttonicon-wrapper">
               <svg width="10" className="button__icon-svg" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 15">
                 <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
               </svg>
               <svg className="button__icon-svg button__icon-svg--copy" xmlns="http://www.w3.org/2000/svg" width="10" fill="none" viewBox="0 0 14 15">
                 <path fill="currentColor" d="M13.376 11.552l-.264-10.44-10.44-.24.024 2.28 6.96-.048L.2 12.56l1.488 1.488 9.432-9.432-.048 6.912 2.304.024z"></path>
               </svg>
             </span>
             Register now
           </a>
         </div>
       </div>
     </div>

    
                      
           <div className='for-me'>
                 <h1>About For Me</h1>
                 <p>Your personalized learning platform <br />
connecting learners with the perfect courses and training centers. Say goodbye to overwhelming <br />choices. our intuitive interface and advanced matching algorithm streamline the process.<br />
Join our community today and embark on your learning journey with confidence</p>
           </div>
           <div className="container-about my-5">
           <div className='row'>
             <div className=" col-md-6 mb-5">
           <div className=" learner-section">
             <img src={LEARN} className="img-learner " alt="Learner" />
             <div className="overlay-text-learner  ">
               <h5 className="title-learner">For a learner</h5>
               <p>Discover a world of personalized learning experiences with <br />"FOR ME".Gain access to a wide range of courses tailored <br /> to your interests and goals. <br /> Join "FOR ME" today and unlock your full potential.</p>
               <a href="#" className="btn-learner ">Register now</a>
             </div>
           </div>
         </div>
           </div>
            
     </div>

     
     <div className="container-about2 mx-5 pl-5">
 <div className="mb-5">
   <div className="training-center-section">
     <img
       src={TUTO}
       className="img-center "
       alt="Training Center"
       style={{marginRight: '50px', height: 'auto' }}
     />
     <div className="overlay-text-training">
       <h5 className="training-center-title">For a training center</h5>
       <p>Showcase your courses to a targeted audience, ensuring maximum exposure and engagement. Partner with "FOR ME" today and revolutionize the way you connect with learners.</p>
      
     </div>
     <a href="#" className="btn-training5">Register now</a>
   </div>
 </div>
</div>



<div className="vision-container container">
 <h2 className="vision-title text-center">Our vision</h2>
 <div className="vision-content text-center mb-4">
   <img src={BAR} className="vision-bar" alt="vision bar"/>
 </div>
 <div className="vision-text row">
   <div className="col-12 col-md-6 offset-md-3 mb-3">
     <p className="v1">We guide personalized learning paths,<br class="d-block d-md-none"/> empowering individuals to navigate education confidently.</p>
   </div>
   <div className="col-12 col-md-6 offset-md-3 mb-3">
     <p className="v2">We utilize technology to innovate education,<br class="d-block d-md-none"/> making it accessible and inclusive.</p>
   </div>
   <div className="col-12 col-md-6 offset-md-3 mb-3">
     <p className="v3">We facilitate seamless connections between learners <br></br>and tailored educational resources,<br class="d-block d-md-none"/> ensuring transformative experiences aligned with their goals.</p>
   </div>
 </div>


     
   </div>
    
   <Footer/>

    </>
  )
}

export default About
