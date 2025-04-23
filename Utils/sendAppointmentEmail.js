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
    const subject = `Appointment ${status}`;
    const html = `
      <p>Dear ${patientName} and Dr. ${doctorName},</p>
      <p>Your appointment on <strong>${new Date(date).toDateString()}</strong> at <strong>${time}</strong> has been <strong>${status}</strong>.</p>
      <div class="footer">
  		  © 2025 TELEMED All Rights Reserved.
  		</div>
    `;
  
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      html,
    };
  
    await transporter.sendMail(mailOptions);
  };