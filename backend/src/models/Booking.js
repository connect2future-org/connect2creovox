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

    type: String,

    enum: [

        "Under ₹10K",

        "₹10K – ₹50K",

        "₹50K – ₹1L",

        "₹1L+"

    ],

    required: true

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

    originalName: {

      type: String,

      required: true

    },

    displayName: {

      type: String,

      required: true

    },

    extension: {

      type: String,

      required: true

    },

    mimeType: {

      type: String,

      required: true

    },

    size: {

      type: Number,

      required: true

    },

    url: {

      type: String,

      required: true,
      trim: true

    },

publicId: {

type: String,

required: true,

trim: true

},

    resourceType: {

      type: String,

      enum: [

        "image",

        "raw"

      ],

      required: true

    },
    uploadedAt: {

  type: Date,

  default: Date.now

}

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

    originalName: {

      type: String,

      required: true

    },

    displayName: {

      type: String,

      required: true

    },

    extension: {

      type: String,

      required: true

    },

    mimeType: {

      type: String,

      required: true

    },

    size: {

      type: Number,

      required: true

    },

    url: {

      type: String,

      required: true,
      trim: true

    },

  publicId: {

type: String,

required: true,

trim: true

},

    resourceType: {

      type: String,

      enum: ["image", "raw"],

      required: true

    },

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
bookingSchema.index({

user:1,
createdAt:-1


});

bookingSchema.index({

status:1

});

bookingSchema.index({

createdAt:-1

});
module.exports = mongoose.model("Booking", bookingSchema);