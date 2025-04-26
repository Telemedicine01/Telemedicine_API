import { model, Schema } from "mongoose";
import normalize from "normalize-mongoose";

const patientSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    confirmPassword: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    bloodType: { type: String, required: true  },
    Address: { type: String, required: true },
    emergencyContact: {
      name: { type: String, required: true },
      relationship: { type: String, required: true },
      phoneNumber: { type: String, required: true },
    },
    primaryCarePhysician: { type: String },
    allergies: { type: String },
    CurrentMedication: { type: Date, required: true },
    chronicConditions: { type: String },
    insurance: {
      provider: { type: String },
      insuranceId: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

patientSchema.plugin(normalize);
export const patientModel = model("patient", patientSchema);
