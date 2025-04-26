import { Router } from "express";
import {
  createOrUpdatePatientProfile,
  getPatientProfile,
} from "../Controllers/patientProfileController.js";
import { authPatient } from "../Middlewares/authPatient.js"; // your auth for patients
import { profilePictureUpload } from "../Middlewares/upload.js"; // multer upload

const patientProfileRouter = Router();

patientProfileRouter.post(
  "/patient-profile",
  authPatient,
  profilePictureUpload.single("profilePicture"),
  createOrUpdatePatientProfile
);

patientProfileRouter.get("/patient-profile/:id", getPatientProfile);

export default patientProfileRouter;
