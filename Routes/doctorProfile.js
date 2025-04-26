// routes/doctorProfileRoutes.js
import express from 'express';
import upload from 'multer';
import {
  createDoctorProfile,
  getDoctorProfile,
  getDoctorProfileByDoctorId,
  getAllDoctorProfiles,
  updateDoctorProfile,
  deleteDoctorProfile,
  updateAvailability
} from '../Controllers/doctorProfileController.js';
import {
  validateProfileInput,
  checkProfileExists,
  validateAvailability
} from '../Middleware/doctorProfileMiddleware.js';
import { authenticateToken, authorizeRole } from '../Middleware/doctorProfileMiddleware.js';

const router = express.Router();
// Public routes (no authentication required)
router.get('/', getAllDoctorProfiles);
router.get('/:id', getDoctorProfile);
router.get('/doctor/:doctorId', getDoctorProfileByDoctorId);

// Protected routes (authentication required)
router.post(
  '/',
  authenticateToken,
  authorizeRole(['doctor', 'admin']),
  upload.single('profilePicture'),
  validateProfileInput,
  createDoctorProfile
);

router.put(
  '/:id',
  authenticateToken,
  authorizeRole(['doctor', 'admin']),
  checkProfileExists,
  upload.single('profilePicture'),
  updateDoctorProfile
);

router.patch(
  '/:id/availability',
  authenticateToken,
  authorizeRole(['doctor', 'admin']),
  checkProfileExists,
  validateAvailability,
  updateAvailability
);

router.delete(
  '/:id',
  authenticateToken,
  authorizeRole(['doctor', 'admin']),
  checkProfileExists,
  deleteDoctorProfile
);

export default router;

