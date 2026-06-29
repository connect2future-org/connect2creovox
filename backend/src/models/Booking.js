const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
{
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  service: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Service"
  },

  serviceName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 100
},
  companyName: {
    type: String,
    trim: true,
    maxlength: 100
},

  clientName: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    maxlength: 50
},

  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    match: [
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        "Invalid email address"
    ]
},

 phone: {
    type: String,
    required: true,
    trim: true,
    match: [
        /^[6-9]\d{9}$/,
        "Invalid phone number"
    ]
},

  budget: {
    type: String
  },

  description: {
    type: String,
    required: true,
    trim: true,
    minlength: 10,
    maxlength: 2000
},

  referenceImages: [
    {
      type: String
    }
  ],

  status: {
    type: String,
    enum: [
      "Pending",
      "Reviewing",
      "Proposal Sent",
      "In Progress",
      "Completed",
      "Rejected"
    ],
    default: "Pending"
  },

  adminNotes: {
    type: String,
    trim: true,
    maxlength: 1000,
    default: ""
},
  projectFiles: [
    {
      fileName: String,
      filePath: String,
      uploadedAt: {
        type: Date,
        default: Date.now
      }
    }
  ],
},
{
  timestamps: true
}
);

module.exports = mongoose.model("Booking", bookingSchema);