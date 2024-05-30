const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  userType: { type: String, enum: ['organization', 'volunteer'], required: true },
  profileId: { type: mongoose.Schema.Types.ObjectId, required: true, refPath: 'userType' }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;
