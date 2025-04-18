import { Router } from 'express';
import { getGeminiResponse } from '../Controllers/chatController.js';

export const chatRouter = Router();

chatRouter.post('/chat', getGeminiResponse);

export default chatRouter;
