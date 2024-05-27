import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'; 
import { AuthProvider } from './component/AuthContext'; // Import the AuthProvider

// Main Site Imports
import Homepage from './pages/homepage/homepage';
import AllCourses from './pages/allcourses';
import TrainingCenters from './pages/trainingcenters';
import EventsPage from './pages/eventspage';
import About from './pages/about';
import Contact from './pages/contact';
import Details from './pages/detailscours';
import Eventdetails from './pages/eventdetails';
import Trainingdetails from './pages/trainingdetails';
import Centeradd from './pages/centeradd';
import Signup from './pages/signuplearner/signup';
import Startlearner from './pages/learnerform/startlearner'; 
import Learner1 from './pages/learnerform/learner1';
import Learner2 from './pages/learnerform/learner2';
import Login from './pages/signuplearner/login';

// Center Dashboard Imports
import CSignup from './pages/centerforms/signupcenter';
import Tcwelcome from './pages/centerforms/tcwelcome';
import Tcform1 from './pages/centerforms/tcform1';
import Tcform2 from './pages/centerforms/tcform2';
import Profile from './pages/centerdashboard/profile'; 
import Courses from './pages/centerdashboard/courses';
import Addcourse from './pages/centerdashboard/addcourse';
import CoursesDetails from './pages/centerdashboard/coursesdetails';
import AllEvents from './pages/centerdashboard/allevents';
import EventDetails from './pages/centerdashboard/eventdetails';
import AddEvent from './pages/centerdashboard/addevent';
import Requestcenter from './pages/centerdashboard/requestcenter';
import Followers from './pages/centerdashboard/followed';
import Centernotif from './pages/centerdashboard/centernotifs';

// Admin Dashboard Imports
import AdminLogin from './pages/dashboardadmin/adminsignin';
import AdminSignup from './pages/dashboardadmin/adminsignup';
import Users from './pages/dashboardadmin/users';
import Centers from './pages/dashboardadmin/centerss';
import Learners from './pages/dashboardadmin/learners';
import Preferences from './pages/dashboardadmin/prefrences'; 
import Requests from './pages/dashboardadmin/requests';
import Coursesfetch from './pages/dashboardadmin/fetchcourses';
import AdminCoursedetails from './pages/dashboardadmin/AdminCourseDetails';
import Eventsfetch from './pages/dashboardadmin/fetchevents';
import AdminEventDetails from './pages/dashboardadmin/admineventdetails';
import CenterDetails from './pages/dashboardadmin/Trainingcenterdetails';
import ProfilePage from './pages/userprofile';
import MyList from './pages/mylist';
import UserNotif from './pages/usernotif'; 

function App() {
  const [learnerId, setLearnerId] = useState(null);
  const [ID_center, setIDCenter] = useState(null);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Main Site Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/courses" element={<AllCourses />} />
          <Route path="/training-centers" element={<TrainingCenters />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/detailscours" element={<Details />} />
          <Route path="/eventdetails" element={<Eventdetails />} />
          <Route path="/trainingdetails" element={<Trainingdetails />} />
          <Route path="/centeradd" element={<Centeradd />} />
          <Route path="/signup" element={<Signup setLearnerId={setLearnerId} />} />
          <Route path="/welcome" element={<Startlearner learnerId={learnerId} />} />
          <Route path="/learner1/:learnerId" element={<Learner1 />} />
          <Route path="/learner2/:learnerId" element={<Learner2 />} />
          <Route path="/signin" element={<Login />} />
          <Route path="/userprofile" element={<ProfilePage />} />
        <Route path="/mylist" element={<MyList />} />
        <Route path="/usernotif" element={<UserNotif />} /> {/* Add this line if userNotif is the profile page */}

          {/* Center Dashboard Routes */}
          <Route path="/signupcenter" element={<CSignup setIDCenter={setIDCenter} />} />
          <Route path="/centerforms/tcwelcome" element={<Tcwelcome ID_center={ID_center} />} />
          <Route path="/centerforms/tcform1" element={<Tcform1 ID_center={ID_center} />} />
          <Route path="/centerforms/tcform2" element={<Tcform2 ID_center={ID_center} />} />
          <Route path="/centerdashboard/profile" element={<Profile />} /> 
          <Route path="/centerdashboard/courses" element={<Courses />} />
          <Route path="/centerdashboard/addcourse" element={<Addcourse />} />  
          <Route path="/centerdashboard/coursesdetails/:courseId" element={<CoursesDetails />} />
          <Route path="/centerdashboard/allevents" element={<AllEvents />} />  
          <Route path="/centerdashboard/eventdetails/:eventId" element={<EventDetails />} />  
          <Route path="/centerdashboard/addevent" element={<AddEvent />} />  
          <Route path="/centerdashboard/requestcenter" element={<Requestcenter />} />
          <Route path="/centerdashboard/followed" element={<Followers />} />
          <Route path="/centerdashboard/centernotifs" element={<Centernotif />} />

          {/* Admin Dashboard Routes */}
          <Route path="/dashboardadmin/adminsignup" element={<AdminSignup />} />
          <Route path="/dashboardadmin/adminsignin" element={<AdminLogin />} />
          <Route path="/dashboardadmin/users" element={<Users />} />
          <Route path="/dashboardadmin/centerss" element={<Centers />} />
          <Route path="/dashboardadmin/learners" element={<Learners />} />
          <Route path="/dashboardadmin/prefrences/:id" element={<Preferences />} /> 
          <Route path="/dashboardadmin/requests" element={<Requests />} />
          <Route path="/dashboardadmin/fetchcourses" element={<Coursesfetch/>} />
          <Route path="/dashboardadmin/Trainingcenterdetails/:centerId" element={<CenterDetails />} />
          <Route path="/dashboardadmin/admincoursedetails/:courseId" element={<AdminCoursedetails />} />
          <Route path="/dashboardadmin/events" element={<Eventsfetch />} />
          <Route path="/dashboardadmin/admineventdetails/:eventId" element={<AdminEventDetails />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
