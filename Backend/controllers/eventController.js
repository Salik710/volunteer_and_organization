const Event = require('../models/eventModel');
const Volunteer = require('../models/volunteerModel');

// Create an event
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get an event by ID
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update an event by ID
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Delete an event by ID
exports.deleteEvent = async (req, res) => {
  try {
    const eventId = req.params.id;

    // Find and delete the event
    const event = await Event.findByIdAndDelete(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Remove the event ID from the registeredEvents array of all volunteers
    await Volunteer.updateMany(
      { registeredEvents: eventId },
      { $pull: { registeredEvents: eventId } }
    );

    res.json({ message: 'Event and related registrations deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get all events
exports.getAllEvents = async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




// Get all events by organization email
exports.getEventsByOrganizationEmail = async (req, res) => {
  try {
    const events = await Event.find({ organizationEmail: req.params.organizationEmail });
    if (!events || events.length === 0) {
      return res.status(404).json({ error: 'No events found for this organization' });
    }
    res.json(events);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.getVolunteersByEventId = async (req, res) => {
  try {
    const { eventId } = req.params;
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Extract volunteer emails from the event
    const volunteerEmails = event.volunteers;
    // Fetch volunteer details using the volunteer emails
    const volunteers = await Volunteer.find({ email: { $in: volunteerEmails } });
    res.json({ volunteers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};