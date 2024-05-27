const express = require('express');
const router = express.Router();
const {
    createLearner,
    updateLearnerInfo,
    signInLearner,
    deleteLearner
} = require('../controllers/learnerscontroller');

router.post('/signup', createLearner);
router.post('/learner1', updateLearnerInfo);
router.post('/signin', signInLearner);
router.delete('/:id', deleteLearner);

module.exports = router;
