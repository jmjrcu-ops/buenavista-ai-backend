import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// CHAT ENDPOINT
app.post("/api/chat", async (req, res) => {
  const { message } = req.body;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional, multilingual janitorial assistant for Buenavista Services Inc."
        },
        { role: "user", content: message }
      ]
    })
  });

  const data = await response.json();
  res.json({ reply: data.choices[0].message.content });
});

// QUOTE ENDPOINT
app.post("/api/quote", async (req, res) => {
  const { squareFeet } = req.body;

  const base = squareFeet * 0.15;
  const withGrowth = base * 1.2; // +20%
  const competitive = withGrowth * 0.9; // -10%

  res.json({
    estimate: competitive,
    status: "Pending management approval"
  });
});

app.listen(3000, () => {
  console.log("Buenavista AI backend running");
});
