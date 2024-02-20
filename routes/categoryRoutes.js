const express = require("express");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");
const { createCategoryController, updateCategoryController } = require("../controller/categoryController");

const router = express.Router();

//create category
router.post("/create-category", requireSignIn, isAdmin, createCategoryController);

//update category
router.put("/update-category:id", requireSignIn, isAdmin, updateCategoryController);


module.exports = router;
