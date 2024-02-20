const mongoose = require("mongoose");

const categoryScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Category", categoryScheme);