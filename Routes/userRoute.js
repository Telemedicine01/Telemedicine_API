import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getAuthenticated,
  loginUser,
  registerUser,
  updateUser,
} from "../Controllers/userController.js";
import { auth, authorize } from "../Middlewares/authUser.js";

export const userRouter = Router();

userRouter.post("/users/register", registerUser);

userRouter.post("/users/login", loginUser);

userRouter.patch("/users/:id", auth, authorize(["admin"]), updateUser);

userRouter.get("/users", auth, authorize(["admin"]), getAllUsers);

userRouter.get("/users/me", getAuthenticated);

userRouter.delete("/users/:id", auth, authorize(["admin"]), deleteUser);

export default userRouter;
