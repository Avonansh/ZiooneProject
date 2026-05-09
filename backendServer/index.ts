
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

let PORT = 3001;

dotenv.config();

//express app
const app = express();

//this allows the frontend and backend to talk to each other even 
//being on the different ports
app.use(cors());
//helps the backend to read the json data
app.use(express.json());

//object of the ai with an api key
const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

//server receiving requests
app.get("/", (_, res) =>{
    res.send("AI Server Running");
});

app.post("/api/chat", async (req, res) => {
  try {
    const prompt = req.body?.prompt;

    const completion =
      await openai.chat.completions.create({
        model: "gpt-4.1-mini",
        messages: [
          {
            role: "system",
            content:
              "You are a sassy AI assistant",
          },
          {
            role: "user",
            content: prompt,
          },
        ],
      });

    const response = completion.choices[0]?.message.content;
    console.log("Response: " + response);

    res.json({ response });
    } 
    catch (error) {
    console.error(error);

    res.status(500).json({
      error: "AI request failed",
    });
  }

});

//server listening requests
app.listen(PORT, () => {
    console.log("Backend Server running");
}
);


