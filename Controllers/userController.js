import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
} from "../Validators/userValidators.js";
import { UserModel } from "../Models/userModel.js";

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
  //send registration email to user
  // const sendWelcomeEmail = await sendEmail(
  //   result.email,
  //   "WELCOME TO TELEMED!",
  //   `<!DOCTYPE html>
  //   <html>
  // 	<head>
  // 	  <style>
  // 		body {
  // 		  font-family: Arial, sans-serif;
  // 		  background-color: #f4f4f4;
  // 		  margin: 0;
  // 		  padding: 0;
  // 		}
  // 		.email-container {
  // 		  max-width: 600px;
  // 		  margin: auto;
  // 		  background: #ffffff;
  // 		  border-radius: 8px;
  // 		  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  // 		  overflow: hidden;
  // 		}
  // 		.header {
  // 		  background: rgb(39, 133, 211);
  // 		  color: white;
  // 		  text-align: center;
  // 		  padding: 20px;
  // 		  font-size: 28px;
  // 		}
  // 		.body {
  // 		  padding: 20px;
  // 		  color: #333333;
  // 		  line-height: 1.6;
  // 		  font-size: 18px;
  // 		}
  // 		.button {
  // 		  display: inline-block;
  // 		  margin: 20px 0;
  // 		  padding: 12px 20px;
  // 		  background-color: rgb(39, 133, 211);
  // 		  color: white;
  // 		  text-decoration: none;
  // 		  border-radius: 5px;
  // 		  font-size: 18px;
  // 		  text-align: center;
  // 		}
  // 		.footer {
  // 		  text-align: center;
  // 		  background: #eeeeee;
  // 		  padding: 10px;
  // 		  font-size: 12px;
  // 		  color: #777777;
  // 		}
  // 	  </style>
  // 	</head>
  // 	<body>
  // 	  <div class="email-container">
  // 		<div class="header">
  // 		  TELEMED
  // 		</div>
  // 		<div class="body">
  // 		  <p>Hello ${result.username},</p>
  // 		  <p>We're thrilled to have you join our community! 🎉</p>
  // 		  <p>Your journey into the world of affordable healthcare starts now. Research, consult, and get in touch with doctors with ease!</p>
  // 		  <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
  // 		  <a href="https://advertisement-api-zwzm.onrender.com/users/login" class="button">Login to Your Account</a>
  // 		</div>
  // 		<div class="footer">
  // 		  © 2025 TELEMED All Rights Reserved.
  // 		</div>
  // 	  </div>
  // 	</body>
  //   </html>`
  // );
  // console.log(sendWelcomeEmail);

  //return response
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
