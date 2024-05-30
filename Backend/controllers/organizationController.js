const Organization = require('../models/organizationModel');

// Create a new organization
exports.createOrganization = async (req, res) => {
  const { name, description, contactInfo, email } = req.body;

  try {
    const organization = new Organization({ name, description, phone, address, email });
    const savedOrganization = await organization.save();
    res.status(201).json(savedOrganization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all organizations
exports.getAllOrganizations = async (req, res) => {
  try {
    const organizations = await Organization.find();
    res.json(organizations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get an organization by Email
exports.getOrganizationByEmail = async (req, res) => {
  try {
    const organization = await Organization.findOne({ email: req.params.email });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};



// Update an organization by Email
exports.updateOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOneAndUpdate(
      { email: req.params.email },
      req.body,
      { new: true, runValidators: true }
    );
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json(organization);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};



// Delete an organization by Email
exports.deleteOrganization = async (req, res) => {
  try {
    const organization = await Organization.findOneAndDelete({ email: req.params.email });
    if (!organization) {
      return res.status(404).json({ error: 'Organization not found' });
    }
    res.json({ message: 'Organization deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
