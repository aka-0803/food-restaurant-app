const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const {
  updateUserController,
  getUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
} = require("../controllers/userController");

const router = express.Router();

//routes
// GET USER || GET
router.get("/getUser", authMiddleware, getUserController);

// UPDATE PROFILE
router.put("/updateUser", authMiddleware, updateUserController);

//UPDATE PASSWORD
router.post("/updatePassword", authMiddleware, updatePasswordController);

//RESET THE PASSWORD
router.post("/resetPassword", authMiddleware, resetPasswordController);

//DELETE ACCOUNT
router.delete("/deleteUser/:id", authMiddleware, deleteProfileController);

module.exports = router;
