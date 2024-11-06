const restaurantModel = require("../models/restaurantModel");

//CREATE RESTAURANT

const createRestaurantController = async (req, res) => {
  try {
    const restaurantData = req.body;  
    //validation
    if (!restaurantData.title || !restaurantData.coords) {
      return res.status(500).send({
        success: false,
        message: "pls send the required fields in body",
      });
    }

    const newRestaurant = new restaurantModel(restaurantData);
    await newRestaurant.save();

    res.status(201).send({
      success: true,
      message: "new restaurant created!",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in creating restaurant api",
      error,
    });
  }
};

//GET ALL RESTAURANT DATA
const getRestaurantDataController = async (req, res) => {
  try {
    const restaurants = await restaurantModel.find({});
    if (!restaurants) {
      return res.status(404).send({
        success: false,
        message: "NO restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: restaurants.length,
      restaurants,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in getting all restaurant",
      error,
    });
  }
};

//GET RESTAURANT BY ID
const getRestaurantByIdController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "No id found for restaurant!",
      });
    }
    const restaurant = await restaurantModel.findById(id);
    if (!restaurant) {
      return res.status(404).send({
        success: false,
        message: "NO restaurant found",
      });
    }
    res.status(200).send({
      success: true,
      restaurant,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in getting restaurant by id!",
      error,
    });
  }
};

//DELETE RESTAURANT
const deleteRestaurantController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(404).send({
        success: false,
        message: "No id found for restaurant!",
      });
    }
    await restaurantModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "restaurant deleted successfully!",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "error in deleting restaurant api!",
      error,
    });
  }
};

module.exports = {
  createRestaurantController,
  getRestaurantDataController,
  getRestaurantByIdController,
  deleteRestaurantController,
};
