const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  event_id: {
    type: String,
    unique: true,
    required: true
  },
  main_event: {
    type: String,
    default: null
  },
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  date: {
    type: Date,
    required: true
  },
  venue: {
    type: String,
    required: true,
    trim: true
  },
  coordinator_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Event', eventSchema);


