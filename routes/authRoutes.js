const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/authControllers");

const router = express.Router();

//routes
//register || post
router.post("/register", registerController);

//login || post
router.post("/login", loginController);
module.exports = router;
