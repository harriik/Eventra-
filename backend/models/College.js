const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
  college_id: {
    type: String,
    unique: true,
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  theme: {
    type: String,
    default: '#6366f1'
  },
  logo: {
    type: String,
    default: null
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('College', collegeSchema);


