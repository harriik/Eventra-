const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
  attendance_id: {
    type: String,
    unique: true,
    required: true
  },
  registration_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration',
    required: true,
    unique: true
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'NotMarked'],
    default: 'NotMarked'
  },
  marked_at: {
    type: Date,
    default: Date.now
  },
  marked_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Attendance', attendanceSchema);


