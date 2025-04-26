import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { patientModel } from "../Models/patientModel.js";
import {
  registerPatientValidator,
  loginPatientValidator,
  updatePatientValidator,
} from "../Validators/patientValidator.js";
import {
  mailTransporter,
  registerUserMailTemplate,
} from "../Utils/mailling.js";

// Register Patient
export const registerPatient = async (req, res, next) => {
  try {
    const { error, value } = registerPatientValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const patient = await patientModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (patient) {
      return res.status(409).json("Account already exists");
    }

    const hashedPassword = bcrypt.hashSync(value.password, 10);

    const newPatient = await patientModel.create({
      ...value,
      password: hashedPassword,
    });

    // Send registration email
    await mailTransporter.sendMail({
      from: "Nheemsha18@gmail.com",
      to: newPatient.email,
      subject: "Welcome to LoveHealth!",
      html: registerUserMailTemplate.replace("{{username}}", newPatient.username),
    });

    res.status(201).json("Patient account registered successfully");
  } catch (error) {
    next(error);
  }
};

// Login Patient
export const loginPatient = async (req, res, next) => {
  try {
    const { error, value } = loginPatientValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const patient = await patientModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });

    if (!patient) {
      return res.status(404).json("Account does not exist");
    }

    const correctPassword = bcrypt.compareSync(value.password, patient.password);
    if (!correctPassword) {
      return res.status(401).json("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ accessToken, role: "patient", id: patient._id });
  } catch (error) {
    next(error);
  }
};

// Update Patient
export const updatePatient = async (req, res, next) => {
  try {
    const { error, value } = updatePatientValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const updatedPatient = await patientModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );

    res.status(200).json(updatedPatient);
  } catch (error) {
    next(error);
  }
};

// Get authenticated patient
export const getAuthenticatedPatient = async (req, res, next) => {
  try {
    const patient = await patientModel.findById(req.auth.id).select("-password");
    res.status(200).json(patient);
  } catch (error) {
    next(error);
  }
};

// Get all patients
export const getAllPatients = async (req, res) => {
  const allPatients = await patientModel.find({});
  res.status(200).json({ data: allPatients });
};

// Delete Patient
export const deletePatient = async (req, res) => {
  await patientModel.findByIdAndDelete(req.params.id);
  res.send("Deleted patient successfully");
};
