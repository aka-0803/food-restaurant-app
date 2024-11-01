const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  updateUserController,
  getUserController,
} = require("../controllers/userController");

const router = express.Router();

//routes
// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);

module.exports = router;
