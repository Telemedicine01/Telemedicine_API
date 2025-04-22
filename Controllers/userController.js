import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,} from "../Validators/userValidators.js";
import { UserModel } from "../Models/userModel.js";
import {
  mailTransporter,
  registerUserMailTemplate,
} from "../Utils/mailling.js";

export const registerUser = async (req, res, next) => {
  //validate user information
  const { error, value } = registerUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //check if user exists already
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (user) {
    return res.status(409).json("account already exists");
  }
  //hash plaintext password
  const hashedPassword = bcrypt.hashSync(value.password, 10);
  //create user record in database
  const result = await UserModel.create({
    ...value,
    password: hashedPassword,
  });
  // Send registration email to user
  await mailTransporter.sendMail({
    from: "Nheemsha18@gmail.com",
    to: value.email,
    subject: "Welcome to Anthon Memorial Hospital",
    html: registerUserMailTemplate.replace("{{username}}", value.username),
  });

  res.status(201).json("Account registered successfully");
};

export const loginUser = async (req, res, next) => {
  //validate user information
  const { error, value } = loginUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  // find matching user record in database
  const user = await UserModel.findOne({
    $or: [{ username: value.username }, { email: value.email }],
  });
  if (!user) {
    return res.status(404).json("user does not exists");
  }
  //compare incoming password with saved password
  const correctPassword = bcrypt.compareSync(value.password, user.password);
  if (!correctPassword) {
    return res.status(401).json("invalid credentials");
  }
  //generate access token for user
  const accessToken = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "24h", // Token expiration
    }
  );

  // Return response with token and role
  res.status(200).json({ accessToken, role: user.role, id: user.id });
};

export const updateUser = async (req, res, next) => {
  //validate request body
  const { error, value } = updateUserValidator.validate(req.body);
  if (error) {
    return res.status(422).json(error);
  }
  //update user in database
  const result = await UserModel.findByIdAndUpdate(
    //for an admin to update themselves
    req.params.id,
    value,
    { new: true }
  );
  //return response
  res.status(200).json(result);
};

export const getAuthenticated = async (req, res, next) => {
  try {
    //Get user by id using req.auth.id
    const result = await UserModel.findById(req.auth.id).select({
      password: false,
    });
    //return response
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getAllUsers = async (req, res) => {
  const allUsers = await UserModel.find({});
  res.status(200).json({ data: allUsers });
};

export const deleteUser = async (req, res) => {
  const deleteUserById = await UserModel.findByIdAndDelete(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );
  res.send("deleted user successfully");
};
