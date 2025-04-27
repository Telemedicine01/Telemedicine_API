import { Router } from "express";
import {
  registerPatient,
  loginPatient,
  updatePatient,
  getAuthenticatedPatient,
  getAllPatients,
  deletePatient,
} from "../Controllers/patientController.js"; 
import { authPatient, authorizePatient } from "../Middlewares/authPatient.js";

const patientRouter = Router();

// Patient registration
patientRouter.post("/patients/register", registerPatient);

// Patient login
patientRouter.post("/patients/login", loginPatient);

// Update patient profile (only the patient themselves)
patientRouter.patch("/patients/:id", authPatient, authorizePatient(["patient"]), updatePatient);

// Get authenticated patient's profile
patientRouter.get("/patients/me", authPatient, getAuthenticatedPatient);

// Admin or authorized roles can view all patients
patientRouter.get("/patients", authPatient, authorizePatient(["admin"]), getAllPatients);

// Admin can delete patient account
patientRouter.delete("/patients/:id", authPatient, authorizePatient(["admin"]), deletePatient);

export default patientRouter;

