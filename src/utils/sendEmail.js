const nodemailer = require("nodemailer");

exports.sendEmail = async (to, subject, html) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.MAIL_USER,
      to,
      subject,
      html,
    });

    return true;
  } catch (err) {
    console.error("Email error:", err.message);
    return false;
  }
};
