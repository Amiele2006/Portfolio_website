const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors')
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const port = process.env.PORT; // Use the same port number for frontend and backend

// Middleware to parse URL-encoded bodies (as sent by HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

// Allow requests from frontend port
const frontendPort = process.env.FRONTEND; // Replace with your frontend port
const corsOptions = {
    origin: `http://127.0.0.1:${frontendPort}`,
    methods: ['GET', 'POST'], // Add methods your frontend is allowed to use
    credentials: true // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));

// Serve static files from the 'public' directory (for frontend)
app.use(express.static(path.join(__dirname, './src')));

// Basic route to serve HTML form
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './src/index.html'));
});

// POST route to handle form submission
app.post('/send', (req, res) => {
  // Extract form data
  console.log(req.body)
  const {name,email,message} = req.body;


  // Nodemailer configuration (replace with your SMTP settings)
  const transporter = nodemailer.createTransport({
    service:'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure:true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
  // Email content
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_USER, // Replace with your email address
    subject: 'New Message from Portfolio Website ',
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.status(404).send('Error: Unable to send email.');
    } else {
      alert('Email sent: ' + info.response);
      res.status(200).send('Email sent successfully!');
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
