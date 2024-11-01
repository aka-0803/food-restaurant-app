const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// get user info
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }
    //hide the password
    user.password = undefined;

    res.status(200).send({
      success: true,
      message: "User data successfully",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in get user api",
      error,
    });
  }
};

//update user

const updateUserController = async (req, res) => {
  try {
    // find user
    const user = await userModel.findById({ _id: req.body.id });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "user not found",
      });
    }
    // update part
    const { userName, address, phone } = req.body;
    if (userName) user.userName = userName;
    if (address) user.address = address;
    if (phone) user.phone = phone;
    //save user
    await user.save();

    res.status(200).send({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in update user api",
      error,
    });
  }
};

module.exports = { getUserController, updateUserController };
