import { GoogleGenAI } from '@google/genai';

const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiResponse = async (req, res) => {
  try {
    const userMessage = req.body.message;

    if (!userMessage) {
      return res.status(400).json({ error: 'Message is required in the request body.' });
    }

    const message = process.env.GEMINI_CONTEXT + ' ' + userMessage;

    const result = await gemini.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message,
    });

    res.send(result);
  } catch (error) {
    console.error('Error in getGeminiResponse:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

