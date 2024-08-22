import express from 'express';
import * as dotenv from 'dotenv';
import { OpenAI } from "openai";

dotenv.config();

const router = express.Router();

const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

router.route('/').get((req, res) => {
  res.status(200).json({ message: "Hello from DALL.E ROUTES" })
})

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt,
      n: 1,
      size: '1024x1024'
    });

    const image = response.data[0].url;

    res.status(200).json({ photo: image });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
});

export default router;