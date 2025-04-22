// Routes/messageRoutes.js
import {Router} from 'express';
import { getMessages, sendMessage } from '../Controllers/message.js';

export const messageRouter = Router();

// GET chat history between two users
messageRouter.get('/:senderId/:receiverId', getMessages);

// POST send a new message
messageRouter.post('/message', sendMessage);

export default messageRouter;