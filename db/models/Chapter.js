const mongoose = require("mongoose");

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Content",
  },
});

const Chapter = mongoose.model("Chapter", chapterSchema);

module.exports = Chapter;
