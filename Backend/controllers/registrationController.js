const Volunteer = require('../models/volunteerModel');
const Event = require('../models/eventModel');

exports.createRegistration = async (req, res) => {
  try {
    const { volunteerEmail, eventId } = req.body;

    // Find the volunteer by email
    const volunteer = await Volunteer.findOne({ email: volunteerEmail });
    if (!volunteer) {
      return res.status(403).json({ error: 'Volunteer not found' });
    }

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Add eventId to volunteer's registeredEvents array if not already present
    if (!volunteer.registeredEvents.includes(eventId)) {
      volunteer.registeredEvents.push(eventId);
      await volunteer.save();
    }

    // Add volunteerEmail to event's volunteers array if not already present
    if (!event.volunteers.includes(volunteerEmail)) {
      event.volunteers.push(volunteerEmail);
      await event.save();
    }

    res.status(201).json({ message: 'Registration created successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




exports.deleteRegistration = async (req, res) => {
  try {
    const { volunteerEmail, eventId } = req.body;

    // Find the volunteer by email
    const volunteer = await Volunteer.findOne({ email: volunteerEmail });
    if (!volunteer) {
      return res.status(404).json({ error: 'Volunteer not found' });
    }

    // Remove the eventId from the volunteer's registeredEvents array
    const eventIndex = volunteer.registeredEvents.indexOf(eventId);
    if (eventIndex > -1) {
      volunteer.registeredEvents.splice(eventIndex, 1);
      await volunteer.save();
    }

    // Find the event by ID
    const event = await Event.findById(eventId);
    if (event) {
      // Remove the volunteerEmail from the event's volunteers array
      event.volunteers = event.volunteers.filter(email => email !== volunteerEmail);
      await event.save();
    }

    res.json({ message: 'Registration deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
