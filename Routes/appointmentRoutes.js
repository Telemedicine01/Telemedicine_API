import express from "express";
import { bookAppointment, updateAppointmentStatus } from "../Controllers/appointmentController.js";
import { auth, authorize } from "../Middlewares/authUser.js";

const router = express.Router();

router.post("/book", auth, bookAppointment); // patient
router.patch("/update-status/:id", auth, authorize(["doctor"]), updateAppointmentStatus); // doctor

export default router;