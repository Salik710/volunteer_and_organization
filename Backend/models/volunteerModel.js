const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const volunteerSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    profileUrl: { type: String, required: false },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    aadhaarNumber: { type: String, required: true, unique: true },
    registeredEvents: [{ type: Schema.Types.ObjectId, ref: "Event" }], // Added field for registered events
  },
  { timestamps: true }
);

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

module.exports = Volunteer;
