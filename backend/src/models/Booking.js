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
    required: true
  },

  companyName: {
    type: String
  },

  clientName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true
  },

  phone: {
    type: String,
    required: true
  },

  budget: {
    type: String
  },

  description: {
    type: String,
    required: true
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