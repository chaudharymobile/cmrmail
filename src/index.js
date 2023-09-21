require('dotenv').config({ path: './config/config.env' });
const nodemailer = require("nodemailer");
const express = require("express");
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors({
    origin: ['http://127.0.0.1:5500', "https://chaudhary-mobile.onrender.com"], // Replace with your desired origin
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
app.post("/sendmail", (req, res) => {
    const { name, email, subject, message } = req.body;
  console.log(req.body)
    const mailOptions = {
        from: `"${name}" <${email}>`,
        to: process.env.TO,
        subject: subject,
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Email Data Table</title>
            <style>
                /* Reset some default styles */
                body, p {
                    margin: 0;
                    padding: 0;
                }
        
                /* Set a background color and a font for the whole email */
                body {
                    background-color: #f4f4f4;
                    font-family: Arial, sans-serif;
                }
        
                /* Add some spacing around the content */
                .container {
                    max-width: 600px;
                    margin: 0 auto;
                    padding: 20px;
                    background-color: #ffffff;
                    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
                  display: flex;
                  flex-direction: column;
                  justify-content: center;
                }
        
                /* Style the table */
                table {
                    width: 100%;
                    border-collapse: collapse;
                    margin-top: 20px;
                }
        
                th, td {
                    padding: 10px;
                    text-align: left;
                    border-bottom: 1px solid #ddd;
                }
        
                th {
                    background-color: #007BFF;
                    color: #fff;
                }
        
                /* Style the heading */
                h1 {
                    font-size: 24px;
                    color: #333;
                    margin-bottom: 20px;
                }
        
                /* Style the footer */
                .footer {
                    margin-top: 30px;
                    text-align: center;
                    color: #888;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>Contact from Chaudhary Mobile Repair</h1>
                <table>
                    <tr>
                        <th>Field</th>
                        <th>Value</th>
                    </tr>
                    <tr>
                        <td><strong>Name:</strong></td>
                        <td>${name}</td>
                    </tr>
                    <tr>
                        <td><strong>Email:</strong></td>
                        <td>${email}</td>
                    </tr>
                    <tr>
                        <td><strong>Subject:</strong></td>
                        <td>${subject}</td>
                    </tr>
                    <tr>
                        <td><strong>Message:</strong></td>
                        <td>${message}</td>
                    </tr>
                </table>
            </div>
            <div class="footer">
                <p>&copy; 2023 Chaudhary Mobile Repair. All rights reserved.</p>
            </div>
        </body>
        </html>
        `,
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
