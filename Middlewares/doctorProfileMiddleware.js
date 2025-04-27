import mongoose from "mongoose";
import { DoctorProfileModel } from "../Models/doctorProfile.js";

// Middleware to validate profile input
export const validateProfileInput = (req, res, next) => {
  const { doctor, professionalTitle, specialties, office } = req.body;

  // Check required fields
  if (!doctor) {
    return res.status(400).json({
      success: false,
      message: "Doctor ID is required",
    });
  }

  // Validate doctor ID format
  if (!mongoose.Types.ObjectId.isValid(doctor)) {
    return res.status(400).json({
      success: false,
      message: "Invalid doctor ID format",
    });
  }

  if (!professionalTitle) {
    return res.status(400).json({
      success: false,
      message: "Professional title is required",
    });
  }

  if (!specialties || !Array.isArray(specialties) || specialties.length === 0) {
    return res.status(400).json({
      success: false,
      message: "At least one specialty is required",
    });
  }

  // Validate office address if provided
  if (office && office.address) {
    const { street, city, state, zipCode, country } = office.address;

    if (!street || !city || !state || !zipCode || !country) {
      return res.status(400).json({
        success: false,
        message: "Complete office address is required",
      });
    }
  }

  next();
};

// Middleware to check if profile exists
export const checkProfileExists = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid profile ID format",
      });
    }

    const profile = await DoctorProfileModel.findById(id);

    if (!profile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    req.doctorProfile = profile;
    next();
  } catch (error) {
    console.error("Error checking profile existence:", error);
    res.status(500).json({
      success: false,
      message: "Server error while checking profile",
      error: error.message,
    });
  }
};

// Middleware to validate availability format
export const validateAvailability = (req, res, next) => {
  const { availability } = req.body;

  if (!availability || !Array.isArray(availability)) {
    return res.status(400).json({
      success: false,
      message: "Valid availability array is required",
    });
  }

  const validDays = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
  ];
  const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/; // Format: HH:MM (24-hour)

  for (const slot of availability) {
    if (!slot.day || !validDays.includes(slot.day.toLowerCase())) {
      return res.status(400).json({
        success: false,
        message: `Invalid day: ${slot.day}. Must be one of: ${validDays.join(
          ", "
        )}`,
      });
    }

    if (!slot.startTime || !timeRegex.test(slot.startTime)) {
      return res.status(400).json({
        success: false,
        message: `Invalid start time format: ${slot.startTime}. Must be in 24-hour format (HH:MM)`,
      });
    }

    if (!slot.endTime || !timeRegex.test(slot.endTime)) {
      return res.status(400).json({
        success: false,
        message: `Invalid end time format: ${slot.endTime}. Must be in 24-hour format (HH:MM)`,
      });
    }

    // Check if endTime is after startTime
    const [startHour, startMinute] = slot.startTime.split(":").map(Number);
    const [endHour, endMinute] = slot.endTime.split(":").map(Number);

    const startTotalMinutes = startHour * 60 + startMinute;
    const endTotalMinutes = endHour * 60 + endMinute;

    if (endTotalMinutes <= startTotalMinutes) {
      return res.status(400).json({
        success: false,
        message: `End time (${slot.endTime}) must be after start time (${slot.startTime})`,
      });
    }
  }

  next();
};
