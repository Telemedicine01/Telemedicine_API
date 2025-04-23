import express from "express";
import { bookAppointment, updateAppointmentStatus } from "../Controllers/appointmentController.js";
import { auth, authorize } from "../Middlewares/authUser.js";

const appointmentRouter = express.Router();

appointmentRouter.post("/book", auth, bookAppointment); // patient
appointmentRouter.patch("/update-status/:id", auth, authorize(["doctor"]), updateAppointmentStatus); // doctor

export default appointmentRouter;