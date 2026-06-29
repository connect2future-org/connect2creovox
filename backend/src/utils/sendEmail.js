const nodemailer = require("nodemailer");

const sendEmail = async ({
  email,
  subject,
  html,
}) => {
  try {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,

            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },

            tls: {
                rejectUnauthorized: false,
            },
        });
        await transporter.verify();

        console.log("SMTP Connected Successfully");

    await transporter.sendMail({
      from: `"Connect2Creovox" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      html,
    });

    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.error("Email Error:", error);

    throw new Error("Unable to send email.");
  }
};

module.exports = sendEmail;