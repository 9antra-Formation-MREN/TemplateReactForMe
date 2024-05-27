const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const multer = require('multer');
const path = require('path'); 
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');


const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'for me',
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Error:', err);
    process.exit(1); // Stop execution if the DB connection fails
  } else {
    console.log('MySQL Connected...');
  }
});

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your_jwt_secret', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};
// Fetch all events for admin
app.get('/admin/events', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM event';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

// Fetch all courses for admin
app.get('/admin/coursesfetch', authenticateToken, (req, res) => {
  const query = 'SELECT * FROM courses';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});
// Fetch specific course details for admin
app.get('/admin/courses/:id', authenticateToken, (req, res) => {
  const courseId = req.params.id;

  const query = 'SELECT * FROM courses WHERE ID_course = ?';
  db.query(query, [courseId], (err, result) => {
    if (err) {
      console.error('Error fetching course details:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
});


// Delete specific course for admin
app.delete('/admin/courses/:id', authenticateToken, (req, res) => {
  const courseId = req.params.id;

  const query = 'DELETE FROM courses WHERE ID_course = ?';
  db.query(query, [courseId], (err, result) => {
    if (err) {
      console.error('Error deleting course:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  });
});
//get events to eventadmindetails
app.get('/admin/eventdetails/:eventId', authenticateToken, (req, res) => {
  const eventId = req.params.eventId;

  const query = 'SELECT * FROM event WHERE ID_event = ?';
  db.query(query, [eventId], (err, results) => {
    if (err) {
      console.error('Error fetching event details:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (results.length > 0) {
      res.status(200).json(results[0]);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  });
});


// Admin signup route
app.post('/admin/signup', (req, res) => {
  const { admin_name, admin_email, admin_password } = req.body;

  const query = `INSERT INTO admin (admin_name, admin_email, admin_password) VALUES (?, ?, ?)`;

  db.query(query, [admin_name, admin_email, admin_password], (err, result) => {
    if (err) {
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(400).json({ message: 'Email already exists' });
      }
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(201).json({ message: 'Admin registered successfully', ID_admin: result.insertId });
  });
});


app.post('/admin/signin', (req, res) => {
  const { admin_email, admin_password } = req.body;
  
  console.log('Received signin request:', req.body);

  if (!admin_email || !admin_password) {
      return res.status(400).json({ message: 'Email and password are required' });
  }

  const query = `SELECT * FROM admin WHERE admin_email = ? AND admin_password = ?`;

  db.query(query, [admin_email, admin_password], (err, result) => {
      if (err) {
          return res.status(500).json({ message: 'Database error', error: err });
      }
      if (result.length > 0) {
          const token = jwt.sign({ ID_admin: result[0].ID_admin }, 'your_jwt_secret', { expiresIn: '1h' });
          res.status(200).json({ message: 'Login successful', token });
      } else {
          res.status(400).json({ message: 'Invalid email or password' });
      }
  });
});

app.get('/admin/:id', authenticateToken, (req, res) => {
  const adminId = req.params.id;

  const query = 'SELECT admin_name FROM admin WHERE ID_admin = ?';

  db.query(query, [adminId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Admin not found' });
    }
  });
});


// Sign up endpoint
app.post('/signup', (req, res) => {
  const { learner_fullname, learner_email, learner_password } = req.body;

  const checkEmailQuery = 'SELECT * FROM learner WHERE learner_email = ?';
  const checkNameQuery = 'SELECT * FROM learner WHERE learner_fullname = ?';
  db.query(checkEmailQuery, [learner_email], (emailErr, emailResult) => {
    if (emailErr) {
      console.error('Error occurred while checking email:', emailErr);
      return res.status(500).json({ message: 'Error occurred while checking email' });
    }
    if (emailResult.length > 0) {
      return res.status(409).json({ message: 'Email already exists' });
    }
    db.query(checkNameQuery, [learner_fullname], (nameErr, nameResult) => {
      if (nameErr) {
        console.error('Error occurred while checking name:', nameErr);
        return res.status(500).json({ message: 'Error occurred while checking name' });
      }
      if (nameResult.length > 0) {
        return res.status(409).json({ message: 'Name already exists' });
      }
      const insertQuery = 'INSERT INTO learner (learner_fullname, learner_email, learner_password) VALUES (?, ?, ?)';
      db.query(insertQuery, [learner_fullname, learner_email, learner_password], (insertErr, insertResult) => {
        if (insertErr) {
          console.error('Error occurred while inserting data:', insertErr);
          return res.status(500).json({ message: 'Error occurred while inserting data' });
        }
        console.log('Registered Successfully !');
        return res.status(200).json({
          message: 'Registered Successfully!',
          learner_id: insertResult.insertId,
        });
      });
    });
  });
});
// Preferences Endpoint
app.post('/preferences', (req, res) => {
  const {
    id_pref,
    learning_method,
    level,
    language,
    certification,
    course_type,
    course_category,
    course_duration,
    budget
  } = req.body;

  // Log the received data for debugging purposes
  console.log('Received data for preferences:', req.body);

  // Ensure all required parameters are present
  if (
    !id_pref ||
    !learning_method ||
    !level ||
    !language ||
    !certification ||
    !course_type ||
    !course_category ||
    !course_duration ||
    !budget
  ) {
    console.error('Missing required fields in preferences:', req.body);
    return res.status(400).json({ message: 'Missing required fields in preferences' });
  }

  const query = `
    INSERT INTO preferences (id_pref, learning_method, level, language, certification, course_type, course_category, course_duration, budget)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    id_pref,
    learning_method,
    level,
    language,
    certification,
    course_type,
    course_category,
    course_duration,
    budget
  ];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting preferences:', err.message);
      return res.status(500).json({ message: 'Error inserting preferences', error: err.message });
    }
    return res.status(200).json({ message: 'Preferences inserted successfully' });
  });
});


// Function to calculate age from birthdate
const calculateAge = (birthdate) => {
  const birthDate = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();

  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  return age;
};

// Endpoint to update learner's personal information
app.post('/learner1', (req, res) => {
  const { learner_phone, learner_birthdate, learner_country, learner_city, occupation, education_level, learner_id } = req.body;

  // Calculate age from birthdate
  const learner_age = calculateAge(learner_birthdate);

  const sql = `UPDATE learner SET learner_phone = ?, learner_age = ?, learner_country = ?, learner_city = ?, occupation = ?, education_level = ? WHERE ID_learner = ?`;
  db.query(sql, [learner_phone, learner_age, learner_country, learner_city, occupation, education_level, learner_id], (err, result) => {
    if (err) {
      console.error('Error updating learner information:', err);
      return res.status(500).json({ message: 'Error updating learner information', error: err });
    } else {
      console.log('Learner information updated successfully');
      return res.status(200).json({ message: 'Learner information updated successfully' });
    }
  });
});




// Sign in endpoint
app.post('/signin', (req, res) => {
  const { learner_email, learner_password } = req.body;

  const sql = 'SELECT * FROM learner WHERE learner_email = ? AND learner_password = ?';
  db.query(sql, [learner_email, learner_password], (err, result) => {
    if (err) {
      console.error('Error occurred while querying database:', err);
      return res.status(500).json({ message: 'Error occurred while signing in' });
    }

    if (result.length === 0) {
      return res.status(401).json({ message: 'Invalid email or password' });
    } else {
      return res.status(200).json({ message: 'Login Successful!' });
    }
  });
});

// Training Center Sign Up
app.post('/center/signup', (req, res) => {
  const { Center_fullname, Center_email, center_password } = req.body;
  const query = 'INSERT INTO centers (Center_fullname, Center_email, center_password) VALUES (?, ?, ?)';
  db.query(query, [Center_fullname, Center_email, center_password], (err, result) => {
      if (err) {
          console.error('Error inserting center:', err);
          return res.status(500).json({ message: 'Failed to register center' });
      }
      res.status(201).json({ ID_center: result.insertId });
  });
});

// Center Sign In
app.post('/center/signin', (req, res) => {
  const { Center_email, center_password } = req.body;
  const query = 'SELECT * FROM centers WHERE Center_email = ? AND center_password = ?';
  db.query(query, [Center_email, center_password], (err, result) => {
    if (err) {
      console.error('Error fetching center:', err);
      return res.status(500).json({ message: 'Failed to sign in' });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(400).json({ message: 'Invalid email or password' });
    }
  });
});


// Update Center Form 1
app.post('/center/form1', (req, res) => {
  const { ID_center, owner_name, phone_number, city, location, license, business_id } = req.body;
  const query = `
      UPDATE centers SET
      owner_name = ?, phone_number = ?, city = ?, location = ?, license = ?, business_id = ?
      WHERE ID_center = ?;
  `;
  db.query(query, [owner_name, phone_number, city, location, license, business_id, ID_center], (err) => {
      if (err) {
          console.error('Error updating center:', err);
          return res.status(500).json({ message: 'Failed to update center information' });
      }
      res.status(200).json({ message: 'Center information updated successfully!' });
  });
});

// Update Center Form 2
app.post('/center/form2', (req, res) => {
  const { ID_center, bio, course_category, language, target_audience } = req.body;
  const query = `
      UPDATE centers SET
      bio = ?, course_category = ?, language = ?, target_audience = ?
      WHERE ID_center = ?;
  `;
  db.query(query, [bio, course_category, language, target_audience, ID_center], (err) => {
      if (err) {
          console.error('Error updating center:', err);
          return res.status(500).json({ message: 'Failed to update center information' });
      }
      res.status(200).json({ message: 'Center information updated successfully!' });
  });
});


// Fetch learners route
app.get('/learners', (req, res) => {
  const query = 'SELECT * FROM learner';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

// Delete learner route
app.delete('/learners/:id', (req, res) => {
  const learnerId = req.params.id;
  const query = 'DELETE FROM learner WHERE ID_learner = ?';
  db.query(query, [learnerId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Learner not found' });
    }
    res.status(200).json({ message: 'Learner deleted successfully' });
  });
});

// Fetch preferences by learner ID
app.get('/preferences/:id', (req, res) => {
  const learnerId = req.params.id;
  const query = 'SELECT * FROM preferences WHERE id_pref = ?';
  db.query(query, [learnerId], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

// Fetch centers route
app.get('/centers', (req, res) => {
  const query = 'SELECT * FROM centers';
  db.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    res.status(200).json(results);
  });
});

// Delete center route
app.delete('/centers/:id', (req, res) => {
  const centerId = req.params.id;
  const query = 'DELETE FROM centers WHERE ID_center = ?';
  db.query(query, [centerId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Center not found' });
    }
    res.status(200).json({ message: 'Center deleted successfully' });
  });
});

// Fetch profile data
app.get('/center/:id', (req, res) => {
  const centerId = req.params.id;
  const query = 'SELECT * FROM centers WHERE ID_center = ?';
  db.query(query, [centerId], (err, result) => {
      if (err) {
          console.error('Error fetching center data:', err);
          return res.status(500).json({ message: 'Failed to fetch center data' });
      }
      if (result.length > 0) {
          res.status(200).json(result[0]);
      } else {
          res.status(404).json({ message: 'Center not found' });
      }
  });
});

// Update Center Profile
app.put('/center/:id', (req, res) => {
  const centerId = req.params.id;
  const {
    Center_fullname, owner_name, license, business_id, bio,
    Center_email, location, phone_number, target_audience
  } = req.body;

  const query = `
      UPDATE centers SET
      Center_fullname = ?, owner_name = ?, license = ?, business_id = ?,
      bio = ?, Center_email = ?, location = ?, phone_number = ?, target_audience = ?
      WHERE ID_center = ?
  `;
  db.query(query, [
      Center_fullname, owner_name, license, business_id, bio,
      Center_email, location, phone_number, target_audience, centerId
  ], (err) => {
      if (err) {
          console.error('Error updating center profile:', err);
          return res.status(500).json({ message: 'Failed to update profile' });
      }
      res.status(200).json({ message: 'Profile updated successfully!' });
  });
});


// Change password
app.post('/center/change-password', (req, res) => {
  const { ID_center, oldPassword, newPassword } = req.body;
  const query = 'SELECT center_password FROM centers WHERE ID_center = ?';
  db.query(query, [ID_center], (err, result) => {
      if (err) {
          console.error('Error fetching password:', err);
          return res.status(500).json({ message: 'Failed to change password' });
      }
      if (result.length > 0 && result[0].center_password === oldPassword) {
          const updateQuery = 'UPDATE centers SET center_password = ? WHERE ID_center = ?';
          db.query(updateQuery, [newPassword, ID_center], (err) => {
              if (err) {
                  console.error('Error updating password:', err);
                  return res.status(500).json({ message: 'Failed to change password' });
              }
              res.status(200).json({ message: 'Password updated successfully!' });
          });
      } else {
          res.status(400).json({ message: 'Old password is incorrect' });
      }
  });
});

// Image upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Upload profile picture
app.post('/center/upload-pic/:id', upload.single('center_pic'), (req, res) => {
  const centerId = req.params.id;
  const imageUrl = `/uploads/${req.file.filename}`;

  const query = 'UPDATE centers SET center_pic = ? WHERE ID_center = ?';
  db.query(query, [imageUrl, centerId], (err) => {
    if (err) {
      console.error('Error updating profile picture:', err);
      return res.status(500).json({ message: 'Failed to update profile picture' });
    }
    res.status(200).json({ message: 'Profile picture updated successfully!', center_pic: imageUrl });
  });
});


// Endpoint to send notifications
app.post('/send-notification', (req, res) => {
  const { ID_center, message } = req.body;
  const query = 'INSERT INTO notifications (ID_center, message) VALUES (?, ?)';
  db.query(query, [ID_center, message], (err, result) => {
    if (err) {
      console.error('Error inserting notification:', err);
      return res.status(500).json({ message: 'Failed to send notification' });
    }
    res.status(201).json({ message: 'Notification sent successfully' });
  });
});

// Endpoint to fetch notifications for a specific center
app.get('/notifications/:ID_center', (req, res) => {
  const { ID_center } = req.params;
  const query = 'SELECT * FROM notifications WHERE ID_center = ?';
  db.query(query, [ID_center], (err, results) => {
    if (err) {
      console.error('Error fetching notifications:', err);
      return res.status(500).json({ message: 'Failed to fetch notifications' });
    }
    res.status(200).json(results);
  });
});

// Add course endpoint
app.post('/center/addcourse', upload.fields([{ name: 'course_pic' }, { name: 'instructor_pic' }]), (req, res) => {
  const {
    Course_title, course_description, instructor_name, Price, duration, date, language, method, group, level, category, content, goals, ID_center, certification
  } = req.body;
  const coursePic = req.files['course_pic'] ? `/uploads/${req.files['course_pic'][0].filename}` : null;
  const instructorPic = req.files['instructor_pic'] ? `/uploads/${req.files['instructor_pic'][0].filename}` : null;

  const query = `
    INSERT INTO courses (ID_center, course_pic, Course_title, course_description, instructor_name, instructor_pic, Price, duration, date, language, method, \`group\`, level, category, content, goals, certification, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'pending')
  `;
  const values = [ID_center, coursePic, Course_title, course_description, instructor_name, instructorPic, Price, duration, date, language, method, group, level, category, content, goals, certification];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding course:', err);
      return res.status(500).json({ message: 'Error adding course', error: err });
    }
    return res.status(200).json({ message: 'Course added successfully, pending approval', ID_course: results.insertId });
  });
});


app.get('/center/:centerId/courses', (req, res) => {
  const centerId = req.params.centerId;
  const sql = 'SELECT * FROM courses WHERE ID_center = ?';

  db.query(sql, [centerId], (err, results) => {
    if (err) {
      console.error('Error fetching courses:', err);
      res.status(500).json({ message: 'Failed to fetch courses', error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});


// Endpoint for fetching pending courses
app.get('/pending-courses', authenticateToken, (req, res) => {
  const sql = 'SELECT * FROM courses WHERE status = "pending"';
  db.query(sql, (err, results) => {
    if (err) {
      console.error('Error fetching pending courses:', err);
      res.status(500).json({ message: 'Failed to fetch pending courses', error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});


// Approve and reject course endpoints
app.post('/admin/approve-course', authenticateToken, (req, res) => {
  const { ID_course } = req.body;
  const sql = 'UPDATE courses SET status = "approved" WHERE ID_course = ?';
  db.query(sql, [ID_course], (err, results) => {
    if (err) {
      console.error('Error approving course:', err);
      res.status(500).json({ message: 'Failed to approve course', error: err.message });
    } else {
      res.status(200).json({ message: 'Course approved successfully' });
    }
  });
});

app.post('/admin/reject-course', authenticateToken, (req, res) => {
  const { ID_course } = req.body;
  const sql = 'DELETE FROM courses WHERE ID_course = ?';
  db.query(sql, [ID_course], (err, results) => {
    if (err) {
      console.error('Error rejecting course:', err);
      res.status(500).json({ message: 'Failed to reject course', error: err.message });
    } else {
      res.status(200).json({ message: 'Course rejected successfully' });
    }
  });
});






// Fetch course details
app.get('/coursesdetails/:id', (req, res) => {
  const courseId = req.params.id;
  const centerId = req.query.centerId; // Retrieve center ID from query parameter

  const query = 'SELECT * FROM courses WHERE ID_course = ? AND ID_center = ?';
  db.query(query, [courseId, centerId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Course not found' });
    }
  });
});


app.put('/coursesdetails/:id', (req, res) => {
  const courseId = req.params.id;
  const centerId = req.query.centerId;

  if (!centerId) {
    return res.status(400).json({ message: 'centerId is required' });
  }

  const {
    Course_title, course_description, Price, duration, language, method,
    group, instructor_name, level, category, certification, content, goals
  } = req.body;

  const query = `
    UPDATE courses SET
    Course_title = ?, course_description = ?, Price = ?, duration = ?, language = ?, method = ?,
    \`group\` = ?, instructor_name = ?, level = ?, category = ?, certification = ?, content = ?, goals = ?
    WHERE ID_course = ? AND ID_center = ?
  `;
  const values = [Course_title, course_description, Price, duration, language, method, group, instructor_name, level, category, certification, JSON.stringify(content), JSON.stringify(goals), courseId, centerId];

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error updating course details:', err);
      return res.status(500).json({ message: 'Failed to update course details', error: err });
    }
    res.status(200).json({ message: 'Course details updated successfully' });
  });
});


// Fetch all events for a specific center
app.get('/center/allevents/:centerId', (req, res) => {
  const centerId = req.params.centerId;
  const sql = 'SELECT * FROM event WHERE ID_center = ?';

  db.query(sql, [centerId], (err, results) => {
    if (err) {
      console.error('Error fetching events:', err);
      res.status(500).json({ message: 'Failed to fetch events', error: err.message });
    } else {
      res.status(200).json(results);
    }
  });
});

// Add event endpoint
app.post('/center/addevent', upload.single('event_image'), (req, res) => {
  const { title, description, location, date, time, price, schedule, ID_center } = req.body;
  const eventPic = req.file ? `/uploads/${req.file.filename}` : null;

  const query = `
    INSERT INTO event (ID_center, event_pic, title_event, event_description, event_date, event_time, event_price, schedule, event_location)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [ID_center, eventPic, title, description, date, time, price, schedule, location];

  db.query(query, values, (err, results) => {
    if (err) {
      console.error('Error adding event:', err);
      return res.status(500).json({ message: 'Error adding event', error: err });
    }
    return res.status(200).json({ message: 'Event added successfully', ID_event: results.insertId });
  });
});
// Fetch event details endpoint
app.get('/center/eventdetails/:eventId', (req, res) => {
  const eventId = req.params.eventId;

  const query = 'SELECT * FROM event WHERE ID_event = ?';
  db.query(query, [eventId], (err, result) => {
    if (err) {
      console.error('Error fetching event details:', err);
      return res.status(500).json({ message: 'Error fetching event details', error: err });
    }
    if (result.length > 0) {
      res.status(200).json(result[0]);
    } else {
      res.status(404).json({ message: 'Event not found' });
    }
  });
});
// Update event details endpoint
app.put('/center/eventdetails/:eventId', upload.single('event_image'), (req, res) => {
  const eventId = req.params.eventId;
  const { title, description, location, date, time, price, schedule } = req.body;
  const eventPic = req.file ? `/uploads/${req.file.filename}` : null;

  let query = `
    UPDATE event SET
    title_event = ?, event_description = ?, event_location = ?, event_date = ?, event_time = ?, event_price = ?, schedule = ?
  `;

  const values = [title, description, location, date, time, price, schedule];

  if (eventPic) {
    query += ', event_pic = ? WHERE ID_event = ?';
    values.push(eventPic, eventId);
  } else {
    query += ' WHERE ID_event = ?';
    values.push(eventId);
  }

  db.query(query, values, (err) => {
    if (err) {
      console.error('Error updating event details:', err);
      return res.status(500).json({ message: 'Error updating event details', error: err });
    }
    res.status(200).json({ message: 'Event updated successfully' });
  });
});
// Delete specific event for center
app.delete('/event/:id', (req, res) => {
  const eventId = req.params.id;

  const query = 'DELETE FROM event WHERE ID_event = ?';
  db.query(query, [eventId], (err, result) => {
    if (err) {
      console.error('Error deleting event:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json({ message: 'Event deleted successfully' });
  });
});

// Delete specific course for center
app.delete('/courses/:id', (req, res) => {
  const courseId = req.params.id;

  const query = 'DELETE FROM courses WHERE ID_course = ?';
  db.query(query, [courseId], (err, result) => {
    if (err) {
      console.error('Error deleting course:', err);
      return res.status(500).json({ message: 'Database error', error: err });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  });
});


const PORT = 8084;
const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}...`);
});

server.on('error', (err) => {
  console.error('Server Error:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use.`);
    process.exit(1);
  }
});
