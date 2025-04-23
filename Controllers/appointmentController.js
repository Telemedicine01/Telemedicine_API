import { Appointment } from "../Models/Appointment.js";
import { sendAppointmentEmail } from "../Utils/sendAppointmentEmail.js";
import { UserModel } from "../Models/userModel.js"; //User model

// Patient books an appointment
export const bookAppointment = async (req, res) => {
  try {
    const { doctorId, date, time } = req.body;

    const appointment = await Appointment.create({
      patientId: req.auth.id,
      doctorId,
      date,
      time,
    });

    res.status(201).json({ message: "Appointment booked", appointment });
  } catch (err) {
    console.error("Error booking appointment:", err);//show error on the server
    res.status(500).json({ error: "Failed to book appointment" });
  }
};

// Doctor confirms or rejects
export const updateAppointmentStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    console.log("Updating appointment with ID:", id);
    console.log("New status:", status);

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!appointment) {
      console.log("No appointment found");
      return res.status(404).json({ error: "Appointment not found" });
    }

    console.log("Found appointment:", appointment);

    const patient = await UserModel.findById(appointment.patientId);
    const doctor = await UserModel.findById(appointment.doctorId);

    if (!patient || !doctor) {
      console.log("Could not find patient or doctor");
      return res.status(404).json({ error: "Patient or Doctor not found" });
    }

    console.log("Sending emails to:", patient.email, doctor.email);

    await sendAppointmentEmail({
      to: [patient.email, doctor.email],
      patientName: patient.name,
      doctorName: doctor.name,
      date: appointment.date,
      time: appointment.time,
      status,
    });

    res.status(200).json({ message: `Appointment ${status}`, appointment });
  } catch (err) {
    console.error("Error updating appointment:", err);
    res.status(500).json({ error: "Failed to update appointment" });
  }
};
