import { Router } from "express";
import {
  createOrUpdatePatientProfile,
  getPatientProfile,
} from "../Controllers/patientProfileController.js";
import { authPatient } from "../Middlewares/authPatient.js"; // your auth for patients
// import uploadProfilePic from "../Middlewares/upload.js";
import upload from "../Middlewares/upload.js";

const patientProfileRouter = Router();

patientProfileRouter.post(
  "/patient-profile",
  authPatient,
  upload.single("profilePicture"),
  createOrUpdatePatientProfile
);

patientProfileRouter.get("/patient-profile/:id", getPatientProfile);

export default patientProfileRouter;
