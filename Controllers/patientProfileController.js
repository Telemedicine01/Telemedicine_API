import { patientProfileModel } from "../Models/patientProfile.js";
import cloudinary from "../Utils/cloudinary.js";

// Create or Update Patient Profile
export const createOrUpdatePatientProfile = async (req, res) => {
  try {
    const { id } = req.auth; // assuming you store patient ID in req.auth
    let profileData = req.body;

    if (req.file) {
      const uploadResult = await cloudinary(req.file.path);
      profileData.profilePicture = uploadResult.secure_url;
    }

    const profile = await patientProfileModel.findOneAndUpdate(
      { patient: id },
      { ...profileData, patient: id },
      { new: true, upsert: true, runValidators: true }
    );

    res.status(201).json({ message: "Profile saved successfully", profile });
  } catch (error) {
    console.error("Error saving patient profile:", error);
    res.status(500).json({ error: "Failed to save patient profile" });
  }
};

// Get a Patient Profile (by patient ID)
export const getPatientProfile = async (req, res) => {
  try {
    const { id } = req.params;

    const profile = await patientProfileModel
      .findOne({ patient: id })
      .populate("patient");

    if (!profile) {
      return res.status(404).json({ error: "Profile not found" });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Error fetching patient profile:", error);
    res.status(500).json({ error: "Failed to fetch patient profile" });
  }
};
