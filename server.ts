import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import axios from "axios";
import * as cheerio from "cheerio";
import { GoogleGenAI } from "@google/genai";
import "dotenv/config";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Initialize Gemini
  const genAI = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

  // Proxy endpoint to fetch website content
  app.get("/api/fetch-url", async (req, res) => {
    const { url } = req.query;
    if (!url || typeof url !== "string") {
      return res.status(400).json({ error: "URL is required" });
    }

    try {
      const response = await axios.get(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
        timeout: 15000,
      });

      const $ = cheerio.load(response.data);
      
      // Basic cleaning for context window optimization
      $("script").remove();
      $("style").remove();
      $("iframe").remove();
      $("img").each((_i, el) => {
        $(el).attr("src", "(image omitted)");
      });
      
      const cleanHtml = $.html().substring(0, 50000); // Limit size
      const textContent = $("body").text().replace(/\s+/g, ' ').trim().substring(0, 10000);

      res.json({
        html: cleanHtml,
        text: textContent,
      });
    } catch (error: any) {
      console.error("Fetch error:", error.message);
      res.status(500).json({ error: "Failed to fetch URL content", details: error.message });
    }
  });

  // Analysis endpoint
  app.post("/api/analyze", async (req, res) => {
    const { url } = req.body;
    if (!url) return res.status(400).json({ error: "URL is required" });

    try {
      // 1. Fetch content
      const fetchResponse = await axios.get(url, {
        headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
        timeout: 10000,
      }).catch(() => null);

      let context = "";
      if (fetchResponse) {
        const $ = cheerio.load(fetchResponse.data);
        $("script, style, iframe, svg").remove();
        context = `HTML Snippet:\n${$.html().substring(0, 20000)}\n\nText Content:\n${$("body").text().substring(0, 5000)}`;
      }

      const prompt = `Analyze and provide a comprehensive reconstruction of the website: ${url}.
        ${context ? `Use the following fetched content as reference:\n${context}` : "The content could not be fetched directly, please use your internal knowledge of this domain if possible."}

        Provide a very detailed breakdown of the following, ensuring the structure is clear and professional:
        - sourceCode: A complete, high-fidelity React/Tailwind/HTML reconstruction of the main page elements. 
        - logicExplanation: An architectural structural analysis. Arrange this in comprehensive bullet points covering state, events, and data flow.
        - designPatterns: A visual grammar analysis. Arrange this in comprehensive bullet points covering typography, spacing, color theory, and UI component behavior.
        - technologies: A comprehensive list of every library and tool detected or inferred.

        Return ONLY a JSON object matching this structure:
        {
          "sourceCode": "string",
          "logicExplanation": "string",
          "designPatterns": "string",
          "technologies": ["string"]
        }`;

      // 2. Prompt Gemini
      const response = await (genAI as any).models.generateContent({
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        }
      });
      
      const outputText = response.text;
      const cleanJson = outputText.replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
      
      res.json(JSON.parse(cleanJson));
    } catch (error: any) {
      console.error("AI Analysis error:", error);
      res.status(500).json({ error: "AI analysis failed", details: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
