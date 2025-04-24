import nodemailer from "nodemailer";

// Configure transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "nheemsha18@gmail.com",
    pass: "wsvp ofni ysme czdb",
  },
});

export const sendAppointmentEmail = async ({ to, patientName, doctorName, date, time, status }) => {
  const subject = `Appointment ${status} - TELEMED`;
  
  const statusColor = status.toLowerCase() === 'confirmed' ? '#28a745' : 
                      status.toLowerCase() === 'rescheduled' ? '#ffc107' : 
                      status.toLowerCase() === 'cancelled' ? '#dc3545' : '#1a73e8';
  
  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
  
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Appointment ${status}</title>
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
    .status-badge {
      display: inline-block;
      background-color: ${statusColor};
      color: white;
      padding: 6px 12px;
      border-radius: 4px;
      font-weight: bold;
      margin-bottom: 20px;
    }
    .appointment-details {
      background-color: #f9f9f9;
      border: 1px solid #e0e0e0;
      border-radius: 5px;
      padding: 20px;
      margin: 20px 0;
    }
    .detail-row {
      display: flex;
      margin-bottom: 10px;
    }
    .detail-label {
      width: 120px;
      font-weight: bold;
      color: #666;
    }
    .detail-value {
      flex: 1;
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
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">TELEMED</div>
    </div>
    <div class="content">
      <h2>Appointment ${status}</h2>
      
      <div class="status-badge">${status}</div>
      
      <p>Dear ${patientName} and Dr. ${doctorName},</p>
      
      <p>This email confirms that your appointment has been <strong>${status.toLowerCase()}</strong>.</p>
      
      <div class="appointment-details">
        <div class="detail-row">
          <div class="detail-label">Date:</div>
          <div class="detail-value">${formattedDate}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Time:</div>
          <div class="detail-value">${time}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Patient:</div>
          <div class="detail-value">${patientName}</div>
        </div>
        <div class="detail-row">
          <div class="detail-label">Doctor:</div>
          <div class="detail-value">Dr. ${doctorName}</div>
        </div>
      </div>
      
      <p>You can manage your appointments through the TELEMED portal.</p>
      
      <center>
        <a href="https://telemed.example.com/appointments" class="button">Manage Appointments</a>
      </center>
      
      <p>If you need to make changes to this appointment or have any questions, please contact our support team.</p>
      
      <p>Thank you for choosing TELEMED for your healthcare needs!</p>
    </div>
    <div class="footer">
      © 2025 TELEMED. All Rights Reserved.<br>
      <a href="https://telemed.example.com/privacy">Privacy Policy</a> | 
      <a href="https://telemed.example.com/terms">Terms of Service</a>
    </div>
  </div>
</body>
</html>
  `;

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject,
    html,
  };

  await mailTransporter.sendMail(mailOptions);
};