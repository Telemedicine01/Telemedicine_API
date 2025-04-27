import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { doctorModel } from "../Models/doctorModel.js";
import {
  registerDoctorValidator,
  loginDoctorValidator,
  updateDoctorValidator,
} from "../Validators/doctorValidator.js";
import {
  mailTransporter,
  registerUserMailTemplate,
} from "../Utils/mailling.js";

// Register Doctor
export const registerDoctor = async (req, res, next) => {
  try {
    const { error, value } = registerDoctorValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const doctor = await doctorModel.findOne({ email: value.email });
    if (doctor) {
      return res.status(409).json("Account already exists");
    }

    const hashedPassword = bcrypt.hashSync(value.password, 10);

    const newDoctor = await doctorModel.create({
      ...value,
      password: hashedPassword,
    });

    // Send registration email
    await mailTransporter.sendMail({
      from: "Nheemsha18@gmail.com",
      to: newDoctor.email,
      subject: "Welcome to LoveHealth,!",
      html: registerUserMailTemplate.replace("{{username}}", newDoctor.email),
    });

    res.status(201).json("Doctor account registered successfully");
  } catch (error) {
    next(error);
  }
};

// Login Doctor
export const loginDoctor = async (req, res, next) => {
  try {
    const { error, value } = loginDoctorValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const doctor = await doctorModel.findOne({
      $or: [{ username: value.username }, { email: value.email }],
    });
    if (!doctor) {
      return res.status(404).json("Account does not exist");
    }

    const correctPassword = bcrypt.compareSync(value.password, doctor.password);
    if (!correctPassword) {
      return res.status(401).json("Invalid credentials");
    }

    const accessToken = jwt.sign(
      { id: doctor._id, role: "doctor" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ accessToken, role: "doctor", id: doctor._id });
  } catch (error) {
    next(error);
  }
};

// Update Doctor
export const updateDoctor = async (req, res, next) => {
  try {
    const { error, value } = updateDoctorValidator.validate(req.body);
    if (error) {
      return res.status(422).json(error.details[0].message);
    }

    const updatedDoctor = await doctorModel.findByIdAndUpdate(
      req.params.id,
      value,
      { new: true }
    );

    res.status(200).json(updatedDoctor);
  } catch (error) {
    next(error);
  }
};

// Get authenticated doctor
export const getAuthenticatedDoctor = async (req, res, next) => {
  try {
    const doctor = await doctorModel.findById(req.auth.id).select("-password");
    res.status(200).json(doctor);
  } catch (error) {
    next(error);
  }
};

// Get all doctors
export const getAllDoctors = async (req, res) => {
  const allDoctors = await doctorModel.find({});
  res.status(200).json({ data: allDoctors });
};

// Delete Doctor
export const deleteDoctor = async (req, res) => {
  await doctorModel.findByIdAndDelete(req.params.id);
  res.send("Deleted doctor successfully");
};
