const fs = require("fs");
const path = require("path");
const OpenAI = require("openai");
var cloudinary = require("cloudinary").v2;
require("dotenv").config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const openai = new OpenAI({
  organization: process.env.ORGANIZATION,
  project: process.env.PROJECT,
  apiKey: process.env.API_KEY,
});

const speechFile = path.resolve("./speech2.mp3");

async function main() {
  const mp3 = await openai.audio.speech.create({
    model: "tts-1",
    voice: "alloy",
    input:
      "Next week, I'm going to the first international conference on AI in the metaverse. I'm excited to meet other AI researchers and learn about the latest developments in AI. I'll be presenting my research on AI in virtual worlds and how it can be used to create more immersive and interactive experiences. I hope to get feedback from other researchers and collaborate on future projects. I'm also looking forward to exploring the metaverse and seeing how AI is being used to create new and exciting virtual worlds. I'll be sure to share my experiences and insights with you when I get back.",
  });
  console.log(speechFile);
  const buffer = Buffer.from(await mp3.arrayBuffer());
  await fs.promises.writeFile(speechFile, buffer);

  // upload audio file to cloudinary
  cloudinary.uploader.upload(
    speechFile,
    { resource_type: "video", public_id: "speech2" },
    function (error, result) {
      if (error) {
        console.error("Error uploading to Cloudinary:", error);
      } else {
        console.log("Upload successful:", result);
      }
    }
  );
}

main();
