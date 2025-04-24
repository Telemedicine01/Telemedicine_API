import { createTransport } from "nodemailer";

export const mailTransporter = createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "nheemsha18@gmail.com",
    pass: "wsvp ofni ysme czdb",
  },
});

export const registerUserMailTemplate = 
`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to TELEMED</title>
  <style>
    body {
      font-family: 'Arial', sans-serif;
      line-height: 1.6;
      color: #333333;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background-color: #1a73e8;
      color: white;
      padding: 20px;
      text-align: center;
      border-radius: 5px 5px 0 0;
    }
    .logo {
      font-size: 28px;
      font-weight: bold;
      margin-bottom: 10px;
    }
    .content {
      background-color: #ffffff;
      padding: 30px;
      border-left: 1px solid #e0e0e0;
      border-right: 1px solid #e0e0e0;
    }
    .button {
      display: inline-block;
      background-color: #1a73e8;
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 4px;
      margin: 20px 0;
      font-weight: bold;
    }
    .footer {
      background-color: #f5f5f5;
      padding: 15px;
      text-align: center;
      font-size: 12px;
      color: #666666;
      border-radius: 0 0 5px 5px;
      border: 1px solid #e0e0e0;
    }
    .highlight {
      color: #1a73e8;
      font-weight: bold;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">TELEMED</div>
    </div>
    <div class="content">
      <h2>Welcome to TELEMED, {{username}}!</h2>
      
      <p>We're thrilled to have you join our healthcare community! 🎉</p>
      
      <p>Your journey into the world of affordable healthcare starts now. With TELEMED, you can:</p>
      
      <ul>
        <li>Research medical conditions and treatments</li>
        <li>Consult with qualified healthcare professionals</li>
        <li>Schedule appointments with ease</li>
        <li>Access your health records securely</li>
      </ul>
      
      <p>If you have any questions or need assistance, our support team is here to help you 24/7.</p>
      
      <center>
        <a href="https://telemed.example.com/login" class="button">Access Your Account</a>
      </center>
      
      <p>Thank you for choosing TELEMED for your healthcare needs!</p>
      
      <p>Best regards,<br>The TELEMED Team</p>
    </div>
    <div class="footer">
      © 2025 TELEMED. All Rights Reserved.<br>
      <a href="https://telemed.example.com/privacy">Privacy Policy</a> | 
      <a href="https://telemed.example.com/terms">Terms of Service</a>
    </div>
  </div>
</body>
</html>`;

