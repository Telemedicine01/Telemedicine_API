import { GoogleGenAI } from '@google/genai';


const gemini = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export const getGeminiResponse = async (req, res) => {
  //Add user validation step before message is sent
  // Add error handling and message validations

  message = process.env.GEMINI_CONTEXT.concat(' ', req.body);
  response.send(
    await gemini.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: message,
    })
  );
};
