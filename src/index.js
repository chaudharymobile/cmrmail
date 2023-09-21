require('dotenv').config({ path: './config/config.env' });
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5500', ], // Replace with your desired origin
  }));
// Create a transporter using Google's SMTP server
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.USER,
        pass: process.env.PASS
    },
});
// Handle the form data and send the email
app.get("/", (req, res) => {
    res.send("dasdasd");
});

// Handle the form data and send the email
app.post("/sendmail", (req, res) => {
    const { name, email, subject, message } = req.body;
  console.log(req.body)
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.TO,
        subject: subject,
        text: name + " " + email + " " + subject + " " + message,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Error:", error);
            res.status(500).json({ success: false, message: "Email sending failed" });
        } else {
            console.log("Email sent:", info.response);
            res.status(200).json({ success: true, message: "Email sent successfully" });
        }
    });
});
// Define the port where your server will listen
const port = process.env.PORT || 3000; // Use the PORT environment variable if available, or use port 3000 as a default.

// Start the Express server
app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
