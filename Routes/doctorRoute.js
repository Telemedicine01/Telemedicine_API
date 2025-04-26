import { Router } from "express";
import {
  registerDoctor,
  loginDoctor,
  updateDoctor,
  getAuthenticatedDoctor,
  getAllDoctors,
  deleteDoctor,
} from "../Controllers/doctorController.js";
import { authDoctor, authorizeDoctor } from "../Middlewares/authDoctor.js";

const doctorRouter = Router();

// Doctor registration
doctorRouter.post("/doctors/register", registerDoctor);

// Doctor login
doctorRouter.post("/doctors/login", loginDoctor);

// Update doctor profile
doctorRouter.patch("/doctors/:id", authDoctor, authorizeDoctor(["doctor"]), updateDoctor);

// Get authenticated doctor profile
doctorRouter.get("/doctors/me", authDoctor, getAuthenticatedDoctor);

// Admin can see all doctors
doctorRouter.get("/doctors", authDoctor, authorizeDoctor(["admin"]), getAllDoctors);

// Admin can delete doctor account
doctorRouter.delete("/doctors/:id", authDoctor, authorizeDoctor(["admin"]), deleteDoctor);

export default doctorRouter;
