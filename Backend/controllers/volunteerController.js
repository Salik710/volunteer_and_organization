const Volunteer = require('../models/volunteerModel');
const Event = require('../models/eventModel');


// Create a new volunteer
exports.createVolunteer = async (req, res) => {
  try {
    const { name,phone, address, dateOfBirth, aadhaarNumber , email} = req.body;
    const volunteer = new Volunteer({
      name,
      email,
      address,
      phone,
      dateOfBirth,
      aadhaarNumber
    });
    const savedVolunteer = await volunteer.save();
    res.status(201).json(savedVolunteer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Read volunteer by email
exports.readVolunteerByEmail = async (req, res) => {
  try {
    const email = req.params.email;
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }
    res.json({ volunteer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all volunteers
exports.getAllVolunteers = async (req, res) => {
  try {
    const volunteers = await Volunteer.find();
    res.json({ volunteers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.updateVolunteer = async (req, res) => {
  const { email } = req.params;
  const { name, phone, address, dateOfBirth, aadhaarNumber } = req.body;

  try {
    const volunteer = await Volunteer.findOneAndUpdate(
      { email: email },
      { name, phone, address, dateOfBirth, aadhaarNumber },
      { new: true, runValidators: true }
    );

    if (!volunteer) {
      return res.status(404).json({ message: 'Volunteer not found' });
    }

    res.status(200).json(volunteer);
  } catch (error) {
    console.error('Error updating volunteer:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


exports.getEventsByVolunteerEmail = async (req, res) => {
  try {
    const email = req.params.email;

    // Find the volunteer by email
    const volunteer = await Volunteer.findOne({ email });
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    // Get the event IDs from the registeredEvents field
    const eventIds = volunteer.registeredEvents;

    // Fetch event details using the event IDs
    const events = await Event.find({ _id: { $in: eventIds } });

    res.json({ events });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


