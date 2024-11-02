const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

//REGISTER
const registerController = async (req, res) => {
  try {
    const { userName, email, password, phone, address, answer } = req.body;
    //validation
    if (!userName || !email || !password || !phone || !address || !answer) {
      res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }
    //check user
    const existing = await userModel.findOne({ email });
    if (existing) {
      return res.status(500).send({
        success: false,
        message: "User Already exist with Email Id, Please login again",
      });
    }
    //hash the password
    var salt = bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    //creating new user
    const user = await userModel.create({
      userName,
      email,
      phone,
      address,
      password: hashedPassword,
      answer,
    });
    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Error in Register API",
      error,
    });
  }
};

//LOGIN
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    //validation
    if (!email || !password) {
      return res.status(500).send({
        success: false,
        message: "Please provide email or password",
      });
    }
    //find user in db
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User Not Found",
      });
    }

    //check user password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(500).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    // creating the token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    user.password = undefined;
    res.status(200).send({
      success: true,
      message: "Login successfully",
      token,
      user,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "Error in login api",
      error,
    });
  }
};

module.exports = { registerController, loginController };
