const categoryModel = require("../models/categoryModel");

//create category
const createCatController = async (req, res) => {
  try {
    const { title, imageUrl } = req.body;
    //validation
    if (!title) {
      return res.status(500).send({
        success: false,
        message: "please provide title for the category",
      });
    }
    const category = await categoryModel.create({ title, imageUrl });
    res.status(201).send({
      success: true,
      message: "category created successfully",
      category,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in category creating api",
      error,
    });
  }
};

//getAll category
const getAllCatController = async (req, res) => {
  try {
    const data = await categoryModel.find({});
    if (!data) {
      return res.status(404).send({
        success: false,
        message: "NO category found",
      });
    }
    res.status(200).send({
      success: true,
      totalCount: data.length,
      category: data,
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in getting all category api",
      error,
    });
  }
};

//update category
const updateCatController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide category id",
      });
    }
    const category = req.body;
    const updateCategory = await categoryModel.findByIdAndUpdate(
      id,
      { title: category.title, imageUrl: category.imageUrl },
      { new: true }
    );
    if (!updateCategory) {
      return res.status(500).send({
        success: false,
        message: "No update found!",
      });
    }
    res.status(200).send({
      success: true,
      message: "catergory updated successfully",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in updating category by id api",
      error,
    });
  }
};

//delete category by id
const deleteCatController = async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(500).send({
        success: false,
        message: "please provide category id",
      });
    }
    const category = await categoryModel.findById(id);
    if (!category) {
      return res.status(404).send({
        success: false,
        message: "cannot find the category with given id",
      });
    }
    await categoryModel.findByIdAndDelete(id);
    res.status(200).send({
      success: true,
      message: "successfully deleted the category!",
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      success: false,
      message: "error in deleting category by id api",
      error,
    });
  }
};

module.exports = {
  createCatController,
  getAllCatController,
  updateCatController,
  deleteCatController,
};
