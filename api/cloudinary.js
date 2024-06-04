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

async function deleteAudio(publicId) {
  try {
    // Use the Cloudinary SDK to delete the file
    const result = await cloudinary.uploader.destroy(`audio/${publicId}`, {
      resource_type: "video",
    });
    console.log("File deleted:", result);
  } catch (error) {
    console.error("Error deleting file:", error);
  }
}

module.exports = {
  deleteAudio,
};
