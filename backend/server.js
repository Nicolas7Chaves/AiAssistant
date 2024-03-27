import express from 'express';
import cors from 'cors';
import { createReadStream } from 'fs';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

if (!process.env.OPENAI_API_KEY) throw new Error("OpenAI API key is missing or invalid.");

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

const filepath = "backend/movies.json"

app.get('/', async (_req, res) => {
    try {
        const fileStream = createReadStream(filepath);
        const file = await openai.files.create({
            file: fileStream,
            purpose: "assistants",
        });
        console.log(file);
        res.send('File uploaded successfully.');
    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error with the app.get');
    }
});


async function createAssistant() {
    const myAssistant = await openai.beta.assistants.create({
        instructions: "You are great at recommending movies. When asked a question, use the information in the provided file to form a friendly response. If you cannot find the answer in the file, do your best to infer what the answer should be.",
        name: "Movie Expert",
        tools: [{ type: "retrieval"}],
        model: "gpt-4-1106-preview",
        //file id is retrieved from console.log(file) object
        file_ids: ["file-zptnBHmoYczbdjLhPEu0lo2N"]
    });
    console.log(myAssistant);
}
createAssistant()
// assistId is retrieved from createAssistant object
const asstID = "asst_OK5bfSQIqW8FUIk6MbuXrGSu"

// const thread = await openai.beta.threads.create();
// console.log(thread)
// Id retrieved from thread object
const threadID = "thread_vsVE2HYCm1RsxBVkcdi3rVcL"

async function createMessage() {
    const threadMessages = await openai.beta.threads.messages.create(
        "thread_abc123",
        {
            role: "user",
            content: "How does AI work? Explain it in simple terms."
        }
    );
}