const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");

// get user info
const getUserController = async (req, res) => {
  try {
    //find user
    const user = await userModel.findById({ _id: req.body.id });
    console.log("user", user);
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

//update password
const updatePasswordController = async (req, res) => {
  try {
    const user = await userModel.findById({ _id: req.body.id });
    //check user
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).send({
        success: false,
        message: "Pls Provide the Both the passwords",
      });
    }
    //compare
    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid current password",
      });
    }

    //hash
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "password updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in update password api",
    });
  }
};

//reset password
const resetPasswordController = async (req, res) => {
  try {
    const { email, newPassword, answer } = req.body;
    if (!email || !newPassword || !answer) {
      return res.status(500).send({
        success: false,
        message: "Pls provide all fields",
      });
    }
    const user = await userModel.findOne({ email, answer });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //hash
    let salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    res.status(200).send({
      success: true,
      message: "password reset successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error in reset password api",
    });
  }
};

//delete account
const deleteProfileController = async (req, res) => {
  try {
    await userModel.findByIdAndDelete(req.params.id);
    return res.status(200).send({
      success: true,
      message: "Successfully deleted account",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in delete profile api",
    });
  }
};

module.exports = {
  getUserController,
  updateUserController,
  updatePasswordController,
  resetPasswordController,
  deleteProfileController,
};
