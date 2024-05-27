const express = require('express');
const router = express.Router();
const {
    createCenter,
    updateCenterForm1,
    updateCenterForm2,
    deleteCenter
} = require('../controllers/centerscontroller');

router.post('/signup', createCenter);
router.post('/form1', updateCenterForm1);
router.post('/form2', updateCenterForm2);
router.delete('/:id', deleteCenter);

module.exports = router;
