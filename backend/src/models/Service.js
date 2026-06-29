const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
title: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 80
},
description: {
    type: String,
    required: true,
    trim: true,
    minlength: 20,
    maxlength: 1000
},
price: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
},
  category: {
    type: String,
    required: [true, 'Please provide a category'],
    enum: ['Branding', 'Marketing', 'Development', 'Advertising'],
    trim: true
  },
  icon: {
    type: String,
    trim: true
  },
features: [{
    type: String,
    trim: true,
    maxlength: 100
}],
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', serviceSchema);