const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const OpenAI = require("openai");

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY, 
});

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/generate-sql", async (req, res) => {
	const { command } = req.body;

	try {
		const prompt = `Translate the following command to SQL: ${command}`;
		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo", // or use "text-davinci-003" for completions
			messages: [{ role: "user", content: prompt }],
		});

		const sqlQuery = response.choices[0].message.content.trim();
		res.json({ sqlQuery });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Failed to generate SQL query" });
	}
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
