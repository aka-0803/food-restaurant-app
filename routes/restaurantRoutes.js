const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {
  createRestaurantController,
  getRestaurantDataController,
  getRestaurantByIdController,
  deleteRestaurantController,
} = require("../controllers/restaurantController");

const router = express.Router();

//routes
//create restaurant || post
router.post("/create", authMiddleware, createRestaurantController);

//get all
router.get("/getAll", getRestaurantDataController);

//get by id
router.get("/get/:id", getRestaurantByIdController);

//delete
router.delete("/delete/:id", authMiddleware, deleteRestaurantController);

module.exports = router;
