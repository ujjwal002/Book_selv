const express = require("express");
const router = express.Router();
const groupController = require("../controllers/groupCtrl");

router.post("/", groupController.createGroup);

router.get("/", groupController.getAllGroups);

router.get("/:id", groupController.getGroupById);

router.put("/:id", groupController.editGroup);

router.delete("/:id", groupController.deleteGroup);

module.exports = router;
