// routes/doctorProfileRoutes.js
import express from "express";
import {
  createDoctorProfile,
  getDoctorProfile,
  getDoctorProfileByDoctorId,
  getAllDoctorProfiles,
  updateDoctorProfile,
  deleteDoctorProfile,
  updateAvailability,
} from "../Controllers/doctorProfileController.js";
import {
  validateProfileInput,
  checkProfileExists,
  validateAvailability,
} from "../Middlewares/doctorProfileMiddleware.js";

import { authDoctor } from "../Middlewares/authDoctor.js";
// import uploadProfilePic from "../Middlewares/upload.js";
import upload from "../Middlewares/upload.js";

// import uploadProfilePic from "../Middlewares/upload.js";

const doctorProfileRouter = express.Router();
// Public routes (no authentication required)
doctorProfileRouter.get("/", getAllDoctorProfiles);
doctorProfileRouter.get("/:id", getDoctorProfile);
doctorProfileRouter.get("/doctor/:doctorId", getDoctorProfileByDoctorId);

// Protected routes (authentication required)
doctorProfileRouter.post(
  "/doctors/profile",
  authDoctor,

  upload.single("profilePicture"),

  createDoctorProfile
);

doctorProfileRouter.put(
  "/:id",
  authDoctor,

  checkProfileExists,
  // uplo.single("profilePicture"),
  updateDoctorProfile
);

doctorProfileRouter.patch(
  "/:id/availability",
  authDoctor,

  checkProfileExists,
  validateAvailability,
  updateAvailability
);

doctorProfileRouter.delete(
  "/:id",
  authDoctor,

  checkProfileExists,
  deleteDoctorProfile
);

export default doctorProfileRouter;
