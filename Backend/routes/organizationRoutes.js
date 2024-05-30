const express = require('express');
const router = express.Router();
const organizationController = require('../controllers/organizationController');


// Create a new organization (could be an admin route)
router.post('/', organizationController.createOrganization);

// Get all organizations
router.get('/', organizationController.getAllOrganizations);

router.get('/:email', organizationController.getOrganizationByEmail);
router.put('/:email', organizationController.updateOrganization);
router.delete('/:email', organizationController.deleteOrganization);


module.exports = router;
