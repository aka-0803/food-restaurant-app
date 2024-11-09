const foodModel = require("../models/foodModel");

const createFoodController = async (req, res) => {
  try {
    const foodData = req.body;
    if (!foodData.title || !foodData.description || !foodData.price) {
      return res.status(500).send({
        success: false,
        message: "Please provide all fields",
      });
    }
    const newFood = await foodModel.create(foodData);
    res.status(201).send({
      success: true,
      message: "New Food Item Added",
      newFood,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in create food api",
      error,
    });
  }
};

const getAllFoodItemController = async (req, res) => {
  try {
    const foodData = await foodModel.find({});
    if (!foodData) {
      return res.status(404).send({
        success: false,
        message: "No data found in Food DB!",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: foodData.length,
      foods: foodData,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in get all food api",
      error,
    });
  }
};

const getFoodByIdController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(500).send({
        success: false,
        message: "pls provide the food ID",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with the given ID",
      });
    }
    res.status(200).send({
      success: true,
      food,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in get food by id api",
      error,
    });
  }
};

const getFoodByRestaurantController = async (req, res) => {
  try {
    const restaurantID = req.params.id;
    if (!restaurantID) {
      return res.status(500).send({
        success: false,
        message: "pls provide ID",
      });
    }
    const food = await foodModel.find({ restaurant: restaurantID });
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "NO food found with restaurant ID",
      });
    }
    res.status(200).send({
      success: true,
      message: "food base on restaurant",
      food,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in get food by restaurant api",
      error,
    });
  }
};

const updateFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "no food id was found",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "NO Food Found",
      });
    }
    const updateFood = req.body;
    const updatedFood = await foodModel.findByIdAndUpdate(foodID, updateFood, {
      new: true,
    });
    res.status(200).send({
      success: true,
      message: "Food Item was updated!",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in get food by restaurant api",
      error,
    });
  }
};

const deleteFoodController = async (req, res) => {
  try {
    const foodID = req.params.id;
    if (!foodID) {
      return res.status(404).send({
        success: false,
        message: "provide food id",
      });
    }
    const food = await foodModel.findById(foodID);
    if (!food) {
      return res.status(404).send({
        success: false,
        message: "No food found with id",
      });
    }
    await foodModel.findByIdAndDelete(foodID);
    res.status(200).send({
      success: true,
      message: "Food Item Deleted",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in get food by restaurant api",
      error,
    });
  }
};

module.exports = {
  createFoodController,
  getAllFoodItemController,
  getFoodByIdController,
  updateFoodController,
  deleteFoodController,
  getFoodByRestaurantController
};
