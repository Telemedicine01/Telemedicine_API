import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import dotenv from "dotenv";
import cors from "cors";
import patientRouter from "./Routes/patientRoute.js";
import doctorRouter from "./Routes/doctorRoute.js";
import chatRouter from "./Routes/chatRoute.js";
import articleRouter from "./Routes/article.js";
import { messageRouter } from "./Routes/message.js";
import appointmentRouter from "./Routes/appointmentRoutes.js";
import doctorProfileRoutes from "./Routes/doctorProfile.js";
import { DoctorProfileModel } from "./Models/doctorProfile.js";
import patientProfileRouter from "./Routes/patientProfileRoute.js";
import path from "path";
import http from "http";
import { Server } from "socket.io";
import doctorProfileRouter from "./Routes/doctorProfile.js";

//Make database connection
await mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database connected"))
  .catch((err) => console.log("error"));

//message
dotenv.config();

const app = express();

app.use(express.json());

//routes
app.use(doctorRouter);
app.use(patientRouter);
app.use(chatRouter);
app.use(articleRouter);
app.use(messageRouter);
app.use(appointmentRouter);
app.use(patientProfileRouter);
app.use(doctorProfileRouter);
app.use(express.static(path.join(process.cwd(), "uploads")));

export { doctorProfileRoutes, DoctorProfileModel };

//message
app.use(cors());

const server = http.createServer(app); // Create HTTP server for the message
const io = new Server(server, {
  cors: {
    origin: "*", // Or your frontend URL
    methods: ["GET", "POST"],
  },
});

// Listen for WebSocket events(Socket.IO events)
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  //Example: Handler messages
  socket.on("sendMessage", async ({ text, senderId, receiverId }) => {
    // Optionally save to MongoDB
    io.emit("receiveMessage", {
      text,
      senderId,
      receiverId,
      timestamp: Date.now(),
    });
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
}); //ends

// Start server
const PORT = process.env.PORT || 4500;
server.listen(PORT, () => console.log(`Server is listening on PORT ${PORT}`));
