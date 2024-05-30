const express = require('express');
const router = express.Router();
const volunteerController = require('../controllers/volunteerController');
const authMiddleware = require('../middleware/authMiddleware');
const bodyParser = require('body-parser');

//router.use(bodyParser.json());
// Route to create a new volunteer
//router.use(authMiddleware);
router.post('/',  volunteerController.createVolunteer);

router.put('/:email', volunteerController.updateVolunteer);

// Route to get all volunteers
router.get('/',  volunteerController.getAllVolunteers);

// Route to get a volunteer by email
router.get('/:email', volunteerController.readVolunteerByEmail);

// get all events registered by a volunteer using his email
router.get('/:email/events', volunteerController.getEventsByVolunteerEmail)

module.exports = router;
