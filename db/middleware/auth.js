const jwt = require("jsonwebtoken");

require("dotenv").config();

exports.auth = (req, res, next) => {
  try {
    const token = req.body.token;
    console.log(req.body);
    console.log("ujjwal");
    console.log(token);
    if (!token) {
      console.log(token);
      return res.status(401).json({
        success: false,
        message: "Token missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      console.log(error);
      return res.status(401).json({
        success: false,
        message: "invalid token",
      });
      next();
    }
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "something went wrong while verifying the token",
    });
  }
};

exports.isAdmin = (req, res, next) => {
  try {
    if (req.user.role != "Admin") {
      return res.status(401).json({
        success: true,
        message: "this is the protected routes for Admin",
      });
    }
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "user cannnot be modifies",
    });
  }
};
