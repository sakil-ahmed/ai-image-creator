const express = require("express");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const postSchema = require("./../mongodb/models/post");

const router = express.Router();

cloudinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Get all posts
router.route("/").get(async (req, res) => {
  try {
    const posts = await postSchema.find({});
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});

// Create a post
router.route("/").post(async (req, res) => {
  try {
    const { name, prompt, photo } = req.body;
    const photoUrl = await cloudinary.uploader.upload(photo);
    const newPost = await postSchema.create({
      name,
      prompt,
      photo: photoUrl.url,
    });
    res.status(200).json({ success: true, data: newPost });
  } catch (error) {
    res.status(500).json({ success: false, message: error });
  }
});
module.exports = router;
