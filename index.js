import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import cors from "cors";
import userRouter from "./Routes/userRoute.js";
import chatRouter from './Routes/chatRoute.js';


//Make database connection
await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch(err => console.log("error"));

const app = express();

app.use(express.json());

app.use(userRouter);
app.use(chatRouter);

app.use(cors());

// const PORT = process.env.PORT || 4500;

// Server listening on PORT 3000
app.listen(4500, () => console.log(`Server is listening on PORT 4500`));
