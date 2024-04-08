const express = require("express");
const router = express.Router();
const chapterController = require("../controllers/chapterCtrl");

router.post("/", chapterController.createChapter);

router.get("/", chapterController.getAllChapters);

router.get("/:id", chapterController.getChapterById);

router.put("/:id", chapterController.editChapter);

router.delete("/:id", chapterController.deleteChapter);

module.exports = router;
