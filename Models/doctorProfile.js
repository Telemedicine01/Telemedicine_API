import { model, Schema } from "mongoose";
import normalize from "normalize-mongoose";

// Doctor Profile Schema
const doctorProfileSchema = new Schema(
    {
      profilePicture: { type: String, default: "" },
      doctor: { type: Schema.Types.ObjectId, ref: 'Doctor', required: true, unique: true },
      office: {
        name: { type: String },
        address: {
          street: { type: String, required: true },
          city: { type: String, required: true },
          state: { type: String, required: true },
          zipCode: { type: String, required: true },
          country: { type: String, required: true }
        }
      },
      professionalTitle: { type: String, required: true },
      bio: { type: String },
      specialties: [{ type: String, required: true }],
      availability: [
        {
          day: { 
            type: String,
            enum: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'],
            required: true
          },
          startTime: { type: String, required: true }, // Format: "HH:MM"
          endTime: { type: String, required: true },   // Format: "HH:MM"
          isAvailable: { type: Boolean, default: true }
        }
      ],
      education: [
        {
          institution: { type: String },
          degree: { type: String },
          yearCompleted: { type: Number }
        }
      ],
      certifications: [
        {
          name: { type: String },
          issuingOrganization: { type: String },
          issueDate: { type: Date },
          expirationDate: { type: Date }
        }
      ],
      acceptingNewPatients: { type: Boolean, default: true }
    },
    {
      timestamps: true
    }
  );

  doctorProfileSchema.plugin(normalize); 

  export const DoctorProfileModel = model("DoctorProfile", doctorProfileSchema);