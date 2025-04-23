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

export const registerUserMailTemplate = `<!DOCTYPE html>
    <html>
  	<head>
  	  <style>
  		body {
  		  font-family: Arial, sans-serif;
  		  background-color: #f4f4f4;
  		  margin: 0;
  		  padding: 0;
  		}
  		.email-container {
  		  max-width: 600px;
  		  margin: auto;
  		  background: #ffffff;
  		  border-radius: 8px;
  		  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  		  overflow: hidden;
  		}
  		.header {
  		  background: rgb(39, 133, 211);
  		  color: white;
  		  text-align: center;
  		  padding: 20px;
  		  font-size: 28px;
  		}
  		.body {
  		  padding: 20px;
  		  color: #333333;
  		  line-height: 1.6;
  		  font-size: 18px;
  		}
  		.button {
  		  display: inline-block;
  		  margin: 20px 0;
  		  padding: 12px 20px;
  		  background-color: rgb(39, 133, 211);
  		  color: white;
  		  text-decoration: none;
  		  border-radius: 5px;
  		  font-size: 18px;
  		  text-align: center;
  		}
  		.footer {
  		  text-align: center;
  		  background: #eeeeee;
  		  padding: 10px;
  		  font-size: 12px;
  		  color: #777777;
  		}
  	  </style>
  	</head>
  	<body>
  	  <div class="email-container">
  		<div class="header">
  		  TELEMED
  		</div>
  		<div class="body">
  		  <p>Hello {{username}},</p>
  		  <p>We're thrilled to have you join our community! 🎉</p>
  		  <p>Your journey into the world of affordable healthcare starts now. Research, consult, and get in touch with doctors with ease!</p>
  		  <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
  		  <a href="https://advertisement-api-zwzm.onrender.com/users/login" class="button">Login to Your Account</a>
  		</div>
  		<div class="footer">
  		  © 2025 TELEMED All Rights Reserved.
  		</div>
  	  </div>
  	</body>
    </html>`

