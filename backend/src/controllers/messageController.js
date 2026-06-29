const Message = require('../models/Message');
const nodemailer = require('nodemailer');

// @desc    Send Message
// @route   POST /api/messages
// @access  Public

exports.sendMessage = async (req, res) => {
  try {

    const sanitize = (value) =>
      typeof value === "string"
        ? value.trim()
        : "";

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let {
      name,
      email,
      subject,
      message
    } = req.body;

    name = sanitize(name);
    email = sanitize(email).toLowerCase();
    subject = sanitize(subject);
    message = sanitize(message);

    // Required Fields

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required fields."
      });
    }

    // Name Validation

    if (name.length < 3 || name.length > 50) {
      return res.status(400).json({
        success: false,
        message: "Name must contain between 3 and 50 characters."
      });
    }

    // Email Validation

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Please enter a valid email address."
      });
    }

    // Subject Validation

    if (subject.length < 5 || subject.length > 100) {
      return res.status(400).json({
        success: false,
        message: "Subject must contain between 5 and 100 characters."
      });
    }

    // Message Validation

    if (message.length < 10) {
      return res.status(400).json({
        success: false,
        message: "Message should contain at least 10 characters."
      });
    }

    if (message.length > 2000) {
      return res.status(400).json({
        success: false,
        message: "Message is too long."
      });
    }

    // Save Message

    const newMessage = await Message.create({
      name,
      email,
      subject,
      message
    });

    // Send Email (optional)

    try {

      if (
        process.env.EMAIL_USER &&
        process.env.EMAIL_PASS &&
        process.env.EMAIL_USER !== "your_email@gmail.com"
      ) {

        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
          }
        });

        await transporter.sendMail({

          from: process.env.EMAIL_USER,

          to: process.env.EMAIL_USER,

          subject: `New Contact Message : ${subject}`,

          html: `
            <h2>New Contact Form Submission</h2>

            <p><strong>Name:</strong> ${name}</p>

            <p><strong>Email:</strong> ${email}</p>

            <p><strong>Subject:</strong> ${subject}</p>

            <hr>

            <p>${message}</p>
          `
        });

      }

    } catch (mailError) {

      console.error(
        "Email Error:",
        mailError.message
      );

    }

    return res.status(201).json({

      success: true,

      message:
        "Message sent successfully.",

      data: newMessage

    });

  } catch (error) {

    console.error(
      "Send Message Error:",
      error
    );

    if (error.name === "ValidationError") {

      return res.status(400).json({

        success: false,

        message: Object.values(error.errors)
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



// @desc    Get all messages
// @route   GET /api/messages
// @access  Private/Admin
exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      messages
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Mark message as read
// @route   PUT /api/messages/:id/read
// @access  Private/Admin
exports.markAsRead = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    message.isRead = true;
    await message.save();

    res.status(200).json({
      success: true,
      message: 'Message marked as read'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// @desc    Delete message
// @route   DELETE /api/messages/:id
// @access  Private/Admin
exports.deleteMessage = async (req, res) => {
  try {
    const message = await Message.findById(req.params.id);
    if (!message) {
      return res.status(404).json({
        success: false,
        message: 'Message not found'
      });
    }

    await message.deleteOne();
    res.status(200).json({
      success: true,
      message: 'Message deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};