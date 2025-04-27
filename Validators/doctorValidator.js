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

export const doctorProfileValidator = Joi.object({
  profilePicture: Joi.array().items(Joi.string()),

  doctor: Joi.string().required(), // You could also use a custom ObjectId validator

  office: Joi.object({
    name: Joi.string().optional(),
    address: Joi.object({
      street: Joi.string().required(),
      city: Joi.string().required(),
      state: Joi.string().required(),
      zipCode: Joi.string().required(),
      country: Joi.string().required(),
    }).required(),
  }).required(),

  professionalTitle: Joi.string().required(),

  bio: Joi.string().allow("", null),

  specialties: Joi.array().items(Joi.string().required()).min(1).required(),

  availability: Joi.array()
    .items(
      Joi.object({
        day: Joi.string()
          .valid(
            "monday",
            "tuesday",
            "wednesday",
            "thursday",
            "friday",
            "saturday",
            "sunday"
          )
          .required(),
        startTime: Joi.string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .required(), // HH:MM format
        endTime: Joi.string()
          .pattern(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/)
          .required(),
        isAvailable: Joi.boolean().default(true),
      })
    )
    .optional(),

  education: Joi.array()
    .items(
      Joi.object({
        institution: Joi.string().optional(),
        degree: Joi.string().optional(),
        yearCompleted: Joi.number().integer().optional(),
      })
    )
    .optional(),

  certifications: Joi.array()
    .items(
      Joi.object({
        name: Joi.string().optional(),
        issuingOrganization: Joi.string().optional(),
        issueDate: Joi.date().optional(),
        expirationDate: Joi.date().optional(),
      })
    )
    .optional(),

  acceptingNewPatients: Joi.boolean().default(true),
});
