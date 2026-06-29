const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide your name'],
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email"
    ]
},
subject: {
    type: String,
    required: true,
    trim: true,
    minlength: 5,
    maxlength: 100
},
message: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000
},
  isRead: {
    type: Boolean,
    default: false
  },
  replied: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Message', messageSchema);