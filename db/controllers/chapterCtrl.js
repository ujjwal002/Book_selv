const Chapter = require("../models/Chapter");
const Group = require("../models/Group");

exports.createChapter = async (req, res) => {
  try {
    const { name, content, groupId } = req.body;

    if (!name || !content || !groupId) {
      return res.status(400).json({
        success: false,
        message: "Please provide a name, content, and groupId for the chapter",
      });
    }

    const chapter = await Chapter.create({ name, content });
    const group = await Group.findByIdAndUpdate(
      groupId,
      { $push: { chapters: chapter._id } },
      { new: true }
    );

    if (!group) {
      return res.status(404).json({
        success: false,
        message: "Group not found",
      });
    }

    res.status(201).json({
      success: true,
      chapter,
      message: "Chapter created successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to create chapter",
    });
  }
};

exports.getAllChapters = async (req, res) => {
  try {
    const chapters = await Chapter.find();
    res.status(200).json({
      success: true,
      chapters,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chapters",
    });
  }
};

exports.getChapterById = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const chapter = await Chapter.findById(chapterId);

    if (!chapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    res.status(200).json({
      success: true,
      chapter,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chapter",
    });
  }
};

exports.editChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const { name, content } = req.body;

    if (!name || !content) {
      return res.status(400).json({
        success: false,
        message: "Please provide a name and content for the chapter",
      });
    }

    const updatedChapter = await Chapter.findByIdAndUpdate(
      chapterId,
      { name, content },
      { new: true }
    );

    if (!updatedChapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    res.status(200).json({
      success: true,
      updatedChapter,
      message: "Chapter updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to update chapter",
    });
  }
};

exports.deleteChapter = async (req, res) => {
  try {
    const chapterId = req.params.id;
    const deletedChapter = await Chapter.findByIdAndDelete(chapterId);

    if (!deletedChapter) {
      return res.status(404).json({
        success: false,
        message: "Chapter not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chapter deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to delete chapter",
    });
  }
};
