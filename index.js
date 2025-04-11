import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./Routes/userRoute.js";

//Make database connection
await mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("error"));

const app = express();

app.use(express.json());
app.use(cors());
app.use(userRouter);

app.listen(3000, () => console.log(`Server is listening on PORT 3000`));
