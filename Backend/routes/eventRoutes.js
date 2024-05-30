const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');


router.post('/', eventController.createEvent)
router.get('/', eventController.getAllEvents)
router.get('/:id', eventController.getEventById)
router.put('/:id', eventController.updateEvent)
router.delete('/:id', eventController.deleteEvent)

//get all Events that are created by this organization 
router.get('/organization/:organizationEmail', eventController.getEventsByOrganizationEmail)

// get all volunteers that are register to a given eventId
router.get('/:eventId/volunteers', eventController.getVolunteersByEventId)

module.exports = router;



