const { default: slugify } = require("slugify");
const categotyModal = require("../models/categotyModal");

const createCategoryController = async (req, res) => {
    try {
        const { name } = req.body;
        if (!name) {
            return res.status(401).send({ message: "Name is Required" });
        }
        const existingCategory = await categotyModal.findOne({ name });
        if (existingCategory) {
            return res.status(200).send({
                success: true,
                message: "Category Already Exist"
            })
        }
        const category = await new categotyModal({ name, slug: slugify(name) }).save();
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
        const category = await categotyModal.findByIdAndUpdate(id, { name, slug: slugify(name) }, { new: true })
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

module.exports = {
    createCategoryController,
    updateCategoryController
};