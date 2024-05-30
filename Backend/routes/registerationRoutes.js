const express = require('express');
const router = express.Router();
const registrationController = require('../controllers/registrationController')

router.post('/', registrationController.createRegistration)
router.delete('/', registrationController.deleteRegistration)

module.exports = router;