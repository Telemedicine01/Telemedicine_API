import Joi from "joi";

// Register Doctor Validator
export const registerDoctorValidator = Joi.object({
  username: Joi.string().required(),
  idNumber: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmPassword: Joi.ref("password"),
  office: Joi.string().required(),
  professionalTitle: Joi.string().required(),
  bio: Joi.string().allow(""),
  specialties: Joi.string().required(),
  availability: Joi.string().required(),
});

// Login Doctor Validator
export const loginDoctorValidator = Joi.object({
    username: Joi.string().optional(),
    email: Joi.string().email().optional(),
    password: Joi.string().required(),
});

// Update Doctor Validator
export const updateDoctorValidator = Joi.object({
  office: Joi.string(),
  professionalTitle: Joi.string(),
  bio: Joi.string(),
  specialties: Joi.array().items(Joi.string()),
  availability: Joi.array().items(Joi.string()),
});