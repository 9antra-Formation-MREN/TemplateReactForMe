const db = require('../db');

// Create a new center
const createCenter = (req, res) => {
    const { Center_fullname, Center_email, center_password } = req.body;
    const query = 'INSERT INTO centers (Center_fullname, Center_email, center_password) VALUES (?, ?, ?)';
    db.query(query, [Center_fullname, Center_email, center_password], (err, result) => {
        if (err) {
            console.error('Error inserting center:', err);
            return res.status(500).json({ message: 'Failed to register center' });
        }
        res.status(201).json({ ID_center: result.insertId });
    });
};

// Update center form 1
const updateCenterForm1 = (req, res) => {
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
};

// Update center form 2
const updateCenterForm2 = (req, res) => {
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
};

// Delete a center
const deleteCenter = (req, res) => {
    const id = req.params.id;
    db.query('DELETE FROM centers WHERE ID_center = ?', [id], (err) => {
        if (err) {
            console.error('Error deleting center:', err);
            return res.status(500).json({ message: 'Failed to delete center' });
        }
        res.status(204).send();
    });
};

module.exports = {
    createCenter,
    updateCenterForm1,
    updateCenterForm2,
    deleteCenter
};
