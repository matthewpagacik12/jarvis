import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";
import connect, { Jarvis } from "../server/db.js";

dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(cors());
app.use(express.json());
const db = connect();

app.get("/", async (req, res) => {
  res.status(200).json({ message: "open ai backend" });
});

app.post("/", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    var newJarvis = new Jarvis({
      message: prompt,
      received: true,
      created_at: new Date(),
    });
    newJarvis.save();
   
      const response = await openai.createCompletion({
        model: "text-davinci-003",
        prompt: `${prompt}`,
        temperature: 0,
        frequency_penalty: 0.5,
        presence_penalty: 0,
      });
      res.status(200).json({
        bot: response.data.choices[0].text,
      });
   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

app.listen(process.env.PORT || 5000, () => {
  console.log("Server is running on port 5000");
});
