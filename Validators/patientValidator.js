import Joi from "joi";

export const registerPatientValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().required().valid(Joi.ref('password')).messages({
    'any.only': 'Passwords must match',
  }),
  dateOfBirth: Joi.date().required(),
  gender: Joi.string().required(),
  bloodType: Joi.string().required(),
  Address: Joi.string().required(),
  emergencyContact: Joi.object({
    name: Joi.string().required(),
    relationship: Joi.string().required(),
    phoneNumber: Joi.string().required(),
  }).required(),
  primaryCarePhysician: Joi.string().optional(),
  allergies: Joi.string().optional(),
  CurrentMedication: Joi.string().required(),
  chronicConditions: Joi.string().optional(),
  insurance: Joi.object({
    provider: Joi.string().optional(),
    insuranceId: Joi.string().optional(),
  }).optional(),
});
export const loginPatientValidator = Joi.object({
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  password: Joi.string().required(),
});
export const updatePatientValidator = Joi.object({
  role: Joi.string().valid().required(),
});
