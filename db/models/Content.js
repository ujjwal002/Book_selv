const mongoose = require("mongoose");

const subParagraphSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

const contentSchema = new mongoose.Schema({
  chapter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Chapter",
    required: true,
  },
  heading: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  paragraphs: [
    {
      type: String,
      required: true,
    },
  ],
  subParagraphs: [[subParagraphSchema]],
});

const Content = mongoose.model("Content", contentSchema);

module.exports = Content;
