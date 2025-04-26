import { model, Schema } from "mongoose";
import normalize from "normalize-mongoose";

const doctorModelSchema = new Schema(
    {
      username: { type: String, required: true, unique: true },
      idNumber:{ type: String, required: true, unique: true },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      confirmPassword: { type: String, required: true },
      office : { type: String, required: true },
      professionalTitle: { type: String, required: true },
      bio: { type: String },
      specialties: { type: String, required: true },
      availability: { type: String, required: true },
});

  doctorModelSchema.plugin(normalize); 

  export const doctorModel = model("Doctor", doctorModelSchema);