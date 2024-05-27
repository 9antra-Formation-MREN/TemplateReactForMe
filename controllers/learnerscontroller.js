const db = require('../db');

// Create a new learner (Sign-up endpoint)
const createLearner = (req, res) => {
    const { learner_fullname, learner_email, learner_password } = req.body;
    const checkEmailQuery = 'SELECT * FROM learner WHERE learner_email = ?';
    const checkNameQuery = 'SELECT * FROM learner WHERE learner_fullname = ?';

    db.query(checkEmailQuery, [learner_email], (emailErr, emailResult) => {
        if (emailErr) {
            console.error('Error checking email:', emailErr);
            return res.status(500).json({ message: 'Error occurred while checking email' });
        }
        if (emailResult.length > 0) {
            return res.status(409).json({ message: 'Email already exists' });
        }

        db.query(checkNameQuery, [learner_fullname], (nameErr, nameResult) => {
            if (nameErr) {
                console.error('Error checking name:', nameErr);
                return res.status(500).json({ message: 'Error occurred while checking name' });
            }
            if (nameResult.length > 0) {
                return res.status(409).json({ message: 'Name already exists' });
            }

            const insertQuery = 'INSERT INTO learner (learner_fullname, learner_email, learner_password) VALUES (?, ?, ?)';
            db.query(insertQuery, [learner_fullname, learner_email, learner_password], (insertErr, insertResult) => {
                if (insertErr) {
                    console.error('Error inserting learner:', insertErr);
                    return res.status(500).json({ message: 'Error occurred while inserting data' });
                }
                console.log('Registered Successfully!');
                return res.status(200).json({
                    message: 'Registered Successfully!',
                    learner_id: insertResult.insertId
                });
            });
        });
    });
};

// Update learner's personal information
const updateLearnerInfo = (req, res) => {
    const { learner_phone, learner_age, learner_country, learner_city, occupation, education_level, learner_id } = req.body;
    const sql = `UPDATE learner SET learner_phone = ?, learner_age = ?, learner_country = ?, learner_city = ?, occupation = ?, education_level = ? WHERE ID_learner = ?`;
    db.query(sql, [learner_phone, learner_age, learner_country, learner_city, occupation, education_level, learner_id], (err) => {
        if (err) {
            console.error('Error updating learner information:', err);
            return res.status(500).json({ message: 'Error updating learner information', error: err });
        }
        console.log('Learner information updated successfully');
        return res.status(200).json({ message: 'Learner information updated successfully' });
    });
};

// Sign in learner
const signInLearner = (req, res) => {
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
};

// Delete a learner
const deleteLearner = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM learner WHERE ID_learner = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting learner:', err);
            return res.status(500).json({ message: 'Failed to delete learner' });
        }
        res.status(204).send();
    });
};

module.exports = {
    createLearner,
    updateLearnerInfo,
    signInLearner,
    deleteLearner
};
