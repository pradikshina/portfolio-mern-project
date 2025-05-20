const nodemailer = require("nodemailer");

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendEmailController = async (req, res) => {
  try {
    const { name, email, msg } = req.body;

    //validation
    if (!name || !email || !msg) {
      return res.status(400).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    //email matter
    const mailOptions = {
      to: process.env.EMAIL_USER,
      from: process.env.EMAIL_USER,
      subject: "New Contact Form Submission",
      html: `
        <h5>New Contact Form Submission</h5>
        <ul>
          <li><p>Name : ${name}</p></li>
          <li><p>Email : ${email}</p></li>
          <li><p>Message : ${msg}</p></li>
        </ul>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).send({
      success: true,
      message: "Your Message Sent Successfully",
    });
  } catch (error) {
    console.log("Error sending email:", error);
    return res.status(500).send({
      success: false,
      message: "Send Email API Error",
      error: error.message,
    });
  }
};

module.exports = { sendEmailController };