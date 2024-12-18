const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");
const adminMiddleware = require("../middlewares/adminMiddleware");
const {
  createFoodController,
  getAllFoodItemController,
  getFoodByIdController,
  updateFoodController,
  deleteFoodController,
  getFoodByRestaurantController,
  placeOrderController,
  orderStatusController,
} = require("../controllers/foodController");

const router = express.Router();

//create food || post
router.post("/create", authMiddleware, createFoodController);

//get all food
router.get("/getAll", getAllFoodItemController);

//get food by id
router.get("/get/:id", getFoodByIdController);

//get by restaurant
router.get("/getRestaurant/:id", getFoodByRestaurantController);

//update || put
router.put("/update/:id", authMiddleware, updateFoodController);

//delete
router.delete("/delete/:id", authMiddleware, deleteFoodController);

//place order
router.post("/placeOrder", authMiddleware, placeOrderController);

//update order
router.put("/order/:id", authMiddleware,adminMiddleware, orderStatusController);
module.exports = router;
