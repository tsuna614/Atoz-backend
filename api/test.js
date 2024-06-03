const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
const uuid = require("uuid");
var cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// openai configuration
const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.API_KEY,
});

const speechFile = path.resolve("./speech.mp3");

async function generateAudio(listeningSentence, id) {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input: listeningSentence,
    // "Next week, I'm going to the first international conference on AI in the metaverse. I'm excited to meet other AI researchers and learn about the latest developments in AI. I'll be presenting my research on AI in virtual worlds and how it can be used to create more immersive and interactive experiences. I hope to get feedback from other researchers and collaborate on future projects. I'm also looking forward to exploring the metaverse and seeing how AI is being used to create new and exciting virtual worlds. I'll be sure to share my experiences and insights with you when I get back.",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

  // upload audio file to cloudinary
  cloudinary.uploader.upload(
    speechFile,
    { resource_type: "video", folder: "audio", public_id: id },
    function (error, result) {
      if (error) {
        console.error("Error uploading to Cloudinary:", error);
      } else {
        console.log("Upload successful:", result);
      }
    }
  );
}

async function generateQuiz(message) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      {
        role: "user",
        content:
          "class ListeningQuiz {\nfinal String fullSentence;\nfinal List<String> answers;\nListeningQuiz(required this.fullSentence, required this.answers);\n}\n Providing that answers is an array containing every word in the fullSentence. Try to create one example based on this class and convert it to one-level high JSON file. This example should be one single English-learning quiz question with the topic related to: " +
          message +
          ". The sentence shouldn't be longer than 15 words.",
      },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });
  // console.log(JSON.parse(completion.choices[0].message.content).fullSentence);
  const generatedUid = uuid.v4();
  await generateAudio(
    JSON.parse(completion.choices[0].message.content).fullSentence,
    generatedUid
  );
  return [completion.choices[0].message.content, generatedUid];
}

async function speechToText(fileName) {
  const audioFilePath = path.join(__dirname, "..", "assets", "temp" + fileName);

  console.log(audioFilePath);

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(audioFilePath),
    model: "whisper-1",
    response_format: "text",
    language: "en",
  });

  console.log(transcription);

  return transcription;
}

module.exports = { generateQuiz, speechToText };
