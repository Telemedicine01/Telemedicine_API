import express from "express";
import { bookAppointment, updateAppointmentStatus } from "../Controllers/appointmentController.js";
import { authDoctor, authorizeDoctor } from "../Middlewares/authDoctor.js";
import { authPatient} from "../Middlewares/authPatient.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", authPatient, bookAppointment); // patient
appointmentRouter.patch("/update-status/:id", authDoctor, authorizeDoctor(["doctor"]), updateAppointmentStatus); // doctor

export default appointmentRouter;