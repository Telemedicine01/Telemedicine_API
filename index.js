import mongoose from "mongoose";
import express from "express";
import "dotenv/config";
import dotenv from 'dotenv';
import cors from "cors";
import userRouter from "./Routes/userRoute.js";
import chatRouter from "./Routes/chatRoute.js";
import articleRouter from "./Routes/article.js";
import {messageRouter} from "./Routes/message.js";
import appointmentRoutes from "./routes/appointmentRoutes.js";
import http from 'http';
import { Server } from 'socket.io';


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
app.use(userRouter);
app.use(chatRouter);
app.use(articleRouter);
app.use(messageRouter);
app.use(appointmentRoutes);

//message
app.use(cors());

const server = http.createServer(app); // Create HTTP server for the message
const io = new Server(server, {
  cors: {
    origin: '*', // Or your frontend URL
    methods: ['GET', 'POST'],
  },
});

// Listen for WebSocket events(Socket.IO events)
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  //Example: Handler messages
  socket.on('sendMessage', async ({ text, senderId, receiverId }) => {
    // Optionally save to MongoDB
    io.emit('receiveMessage', { text, senderId, receiverId, timestamp: Date.now() });
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
}); //ends

// const PORT = process.env.PORT || 4500;
app.listen(4500, () => console.log(`Server is listening on PORT 4500`));



