const mongoose = require('mongoose');
const { string } = require('yargs');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  location: { type: String, required: true },
  organizationEmail: { type: String, required: true },
  thumbnailUrl: { type: String, required: false },
  duration: {
    hours: { type: Number, default: 0 },
    minutes: { type: Number, default: 0 }
  },
  volunteers: [{ type: String }]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
