const { default: slugify } = require("slugify");
const categoryModal = require("../models/categoryModal")

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is Required" });
        }
        const existingCategory = await categoryModal.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exist"
            })
        }
        const category = await new categoryModal({ name, slug: slugify(name) }).save();
        res.status(201).send({
            success: true,
            message: "new category created",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error in Category"
        })
    }
}

//update category 

const updateCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        const { id } = req.params;
        const category = await categoryModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
        res.status(200).send({
            success: true,
            message: "Updated successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while updating Category"
        })
    }
}


const categoryController = async (req, res) => {
    try {
        const category = await categoryModal.find({});
        res.status(200).send({
            success: true,
            message: "Successfully fetched all category",
            category
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching category"
        })
    }
}

const singleCategoryController = async (req, res) => {
    try {
        const category = await categoryModal.findOne({
            slug: req.params.slug
        })
        res.status(200).send({
            success: true,
            message: "Get single category successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while fetching single category"
        })
    }
}

const deleteCategoryController = async (req, res) => {
    try {
        const { id } = req.params;
        const category = await categoryModal.findByIdAndDelete(id)
        res.status(200).send({
            success: true,
            message: "deleted successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            error,
            message: "Error while deleting category"
        })
    }
}

module.exports = {
    createCategoryController,
    updateCategoryController,
    categoryController,
    singleCategoryController,
    deleteCategoryController
};