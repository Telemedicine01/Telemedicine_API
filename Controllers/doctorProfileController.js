// controllers/doctorProfileController.js
import { DoctorProfileModel } from "../Models/doctorProfile.js";

import fs from "fs";

import cloudinaryUpload from "../Utils/cloudinary.js";

export const createDoctorProfile = async (req, res) => {
  try {
    // Check if profile already exists for this doctor
    const existingProfile = await DoctorProfileModel.findOne({
      doctor: req.body.doctor,
    });
    if (existingProfile) {
      return res.status(400).json({
        success: false,
        message: "Profile already exists for this doctor",
      });
    }

    // Handle profile image upload if provided
    let profilePicture = "";
    if (req.file) {
      try {
        // Upload profile image to Cloudinary
        const result = await cloudinaryUpload(req.file.buffer);

        // Get the URL from the Cloudinary response
        profilePicture = result.secure_url;
      } catch (uploadError) {
        console.error("Error uploading to Cloudinary:", uploadError);
        return res.status(500).json({
          success: false,
          message: "Cloudinary upload failed",
          error: uploadError.message,
        });
      }
    }

    // Create the new doctor profile with all the provided data, including profile picture URL
    const newDoctorProfile = new DoctorProfileModel({
      ...req.body,
      profilePicture,
    });

    // Save the profile to the database
    const savedProfile = await newDoctorProfile.save();

    // Send back the success response with the saved profile data
    res.status(201).json({
      success: true,
      message: "Doctor profile created successfully",
      data: savedProfile,
    });
  } catch (error) {
    console.error("Error creating doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create doctor profile",
      error: error.message,
    });
  }
};

export const getDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const doctorProfile = await DoctorProfileModel.findById(id)
      .populate("doctor", "firstName lastName email phone")
      .exec();

    if (!doctorProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctorProfile,
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor profile",
      error: error.message,
    });
  }
};

export const getDoctorProfileByDoctorId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctorProfile = await DoctorProfileModel.findOne({ doctor: doctorId })
      .populate("doctor", "firstName lastName email phone")
      .exec();

    if (!doctorProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: doctorProfile,
    });
  } catch (error) {
    console.error("Error fetching doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor profile",
      error: error.message,
    });
  }
};

export const getAllDoctorProfiles = async (req, res) => {
  try {
    const { specialty, city, acceptingNewPatients } = req.query;
    const query = {};

    // Add filters if provided
    if (specialty) {
      query.specialties = { $in: [specialty] };
    }

    if (city) {
      query["office.address.city"] = city;
    }

    if (acceptingNewPatients) {
      query.acceptingNewPatients = acceptingNewPatients === "true";
    }

    const doctorProfiles = await DoctorProfileModel.find(query)
      .populate("doctor", "firstName lastName email phone")
      .exec();

    res.status(200).json({
      success: true,
      count: doctorProfiles.length,
      data: doctorProfiles,
    });
  } catch (error) {
    console.error("Error fetching doctor profiles:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch doctor profiles",
      error: error.message,
    });
  }
};

export const updateDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Handle profile image upload if provided
    if (req.file) {
      const result = await cloudinaryUpload(req.file.path);
      updates.profilePicture = result.secure_url;

      // Remove the temporary file
      fs.unlinkSync(req.file.path);
    }

    const updatedProfile = await DoctorProfileModel.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true, runValidators: true }
    ).populate("doctor", "firstName lastName email phone");

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor profile updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update doctor profile",
      error: error.message,
    });
  }
};

export const deleteDoctorProfile = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfile = await DoctorProfileModel.findByIdAndDelete(id);

    if (!deletedProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Doctor profile deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting doctor profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete doctor profile",
      error: error.message,
    });
  }
};

// Update just the availability section
export const updateAvailability = async (req, res) => {
  try {
    const { id } = req.params;
    const { availability } = req.body;

    if (!availability || !Array.isArray(availability)) {
      return res.status(400).json({
        success: false,
        message: "Valid availability array is required",
      });
    }

    const updatedProfile = await DoctorProfileModel.findByIdAndUpdate(
      id,
      { $set: { availability } },
      { new: true, runValidators: true }
    );

    if (!updatedProfile) {
      return res.status(404).json({
        success: false,
        message: "Doctor profile not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Availability updated successfully",
      data: updatedProfile,
    });
  } catch (error) {
    console.error("Error updating availability:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update availability",
      error: error.message,
    });
  }
};
