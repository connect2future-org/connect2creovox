const Message = require("../models/Message");

// =======================================
// Send Message
// POST /api/messages
// Public
// =======================================

exports.sendMessage = async (req, res) => {

  try {

    const sanitize = (value) =>

      typeof value === "string"

        ? value.trim()

        : "";

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const phoneRegex =
      /^[6-9]\d{9}$/;

    let {

      service,

      budget,

      timeline,

      name,

      email,

      phone,

      company,

      requirements

    } = req.body;

    service = sanitize(service);

    budget = sanitize(budget);

    timeline = sanitize(timeline);

    name = sanitize(name);

    email = sanitize(email).toLowerCase();

    phone = sanitize(phone);

    company = sanitize(company);

    requirements = sanitize(requirements);

    // ===========================
    // Required Fields
    // ===========================

    if (

      !service ||

      !budget ||

      !timeline ||

      !name ||

      !email ||

      !phone ||

      !requirements

    ) {

      return res.status(400).json({

        success: false,

        message:

          "Please fill all required fields."

      });

    }

    // ===========================
    // Name
    // ===========================

    if (

      name.length < 3 ||

      name.length > 50

    ) {

      return res.status(400).json({

        success: false,

        message:

          "Name should contain between 3 and 50 characters."

      });

    }

    // ===========================
    // Email
    // ===========================

    if (!emailRegex.test(email)) {

      return res.status(400).json({

        success: false,

        message:

          "Please enter a valid email address."

      });

    }

    // ===========================
    // Phone
    // ===========================

    if (!phoneRegex.test(phone)) {

      return res.status(400).json({

        success: false,

        message:

          "Please enter a valid mobile number."

      });

    }

    // ===========================
    // Requirements
    // ===========================

    if (requirements.length < 10) {

      return res.status(400).json({

        success: false,

        message:

          "Requirements should contain at least 10 characters."

      });

    }

    if (requirements.length > 3000) {

      return res.status(400).json({

        success: false,

        message:

          "Requirements are too long."

      });

    }

    // ===========================
    // Save Message
    // ===========================

    const newMessage = await Message.create({

      service,

      budget,

      timeline,

      name,

      email,

      phone,

      company,

      requirements

    });

    return res.status(201).json({

      success: true,

      message:

        "Consultation request submitted successfully.",

      data: newMessage

    });

  }

  catch (error) {

    console.error(

      "Send Message Error:",

      error

    );

    if (

      error.name ===

      "ValidationError"

    ) {

      return res.status(400).json({

        success: false,

        message:

          Object.values(error.errors)

            .map(err => err.message)

            .join(", ")

      });

    }

    return res.status(500).json({

      success: false,

      message:

        "Internal server error."

    });

  }

};
// =======================================
// Get All Messages
// GET /api/messages
// Private/Admin
// =======================================

exports.getMessages = async (req, res) => {

  try {

    const messages = await Message.find()

      .sort({

        createdAt: -1

      });

    return res.status(200).json({

      success: true,

      count: messages.length,

      messages

    });

  }

  catch (error) {

    console.error(

      "Get Messages Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message:

        "Internal server error."

    });

  }

};

// =======================================
// Mark Message As Read
// PUT /api/messages/:id/read
// Private/Admin
// =======================================

exports.markAsRead = async (req, res) => {

  try {

    const message = await Message.findById(

      req.params.id

    );

    if (!message) {

      return res.status(404).json({

        success: false,

        message:

          "Message not found."

      });

    }

    message.isRead = true;

    await message.save();

    return res.status(200).json({

      success: true,

      message:

        "Message marked as read."

    });

  }

  catch (error) {

    console.error(

      "Mark Message Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message:

        "Internal server error."

    });

  }

};

// =======================================
// Delete Message
// DELETE /api/messages/:id
// Private/Admin
// =======================================

exports.deleteMessage = async (req, res) => {

  try {

    const message = await Message.findById(

      req.params.id

    );

    if (!message) {

      return res.status(404).json({

        success: false,

        message:

          "Message not found."

      });

    }

    await message.deleteOne();

    return res.status(200).json({

      success: true,

      message:

        "Message deleted successfully."

    });

  }

  catch (error) {

    console.error(

      "Delete Message Error:",

      error

    );

    return res.status(500).json({

      success: false,

      message:

        "Internal server error."

    });

  }

};