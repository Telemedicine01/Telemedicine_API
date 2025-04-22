//messageController

import {messageModel} from '../Models/messageModel.js';

// Get messages between two users (doctor & patient)
export const getMessages = async (req, res) => {
  const { senderId, receiverId } = req.params;

  try {
    const messages = await messageModel.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    }).sort({ timestamp: 1 }); // Sort by time
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// Send a new message
export const sendMessage = async (req, res) => {
  const { senderId, receiverId, text } = req.body;

  try {
    const newMessage = new messageModel({ senderId, receiverId, text });
    await newMessage.save();
    res.status(201).json(newMessage);
  } catch (err) {
    console.error('Error sending message:', err.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
};
