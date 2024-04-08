const express = require("express");

const router = express.Router();

const { Login, Signup } = require("../controllers/UserCtrl");
const { auth, isStudent, isAdmin } = require("../middleware/auth");

router.post("/login", Login);
router.post("/signup", Signup);

router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    sucess: true,
    message: "welcome to the protected routes of admin",
  });
});

module.exports = router;
