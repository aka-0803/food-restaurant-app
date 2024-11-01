const express = require("express");
const {
  getUserController,
  updateUserController,
} = require("../controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = express.Router();

//routes
//get user
router.get("/getUser", authMiddleware, getUserController);

//update user
router.put("/updateUser", authMiddleware, updateUserController);

module.exports = router;
