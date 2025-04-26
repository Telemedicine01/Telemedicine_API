import { model, Schema } from "mongoose";
import normalize from "normalize-mongoose";

// Patient Profile Schema
const patientProfileSchema = new Schema(
  {
    patient: { type: Schema.Types.ObjectId, ref: 'Patient', required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { 
      type: String, 
      enum: ['male', 'female', 'other', 'prefer not to say'],
      required: true 
    },
    bloodType: { 
      type: String, 
      enum: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'unknown'],
      default: 'unknown'
    },
    address: {
      street: { type: String, required: true },
      city: { type: String, required: true },
      state: { type: String, required: true },
      zipCode: { type: String, required: true },
      country: { type: String, required: true }
    },
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phoneNumber: { type: String, required: true }
    },
    primaryCarePhysician: { type: String },
    allergies: [{ type: String }],
    currentMedications: [
      {
        name: { type: String },
        dosage: { type: String },
        frequency: { type: String }
      }
    ],
    chronicConditions: [{ type: String }],
    insurance: {
      provider: { type: String },
      policyNumber: { type: String },
      groupNumber: { type: String },
      insuranceId: { type: String }
    },
    profilePicture: { type: String }, // 🔥 Add this line for the image!
  },
  {
    timestamps: true
  }
);

patientProfileSchema.plugin(normalize);

// This export must match exactly 
export const patientProfileModel = model("PatientProfile", patientProfileSchema);
