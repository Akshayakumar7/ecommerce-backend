const { hashPassword, comparePassword } = require("../helpers/authHelper");
const userModal = require("../models/userModal");
const connectDB = require("../config/db");
const { response } = require("express");
const JWT = require('jsonwebtoken');

const registerController = async (req, res) => {
    try {
        // Make sure to call connectDB before accessing the database
        connectDB();
        const { name, email, password, phone, address, answer } = req.body;
        if (!name) {
            return res.status(400).send({ message: "Name is Required" });
        }
        if (!email) {
            return res.status(400).send({ message: "Email is Required" });
        }
        if (!password) {
            return res.status(400).send({ message: "Password is Required" });
        }
        if (!phone) {
            return res.status(400).send({ message: "Phone number is Required" });
        }
        if (!address) {
            return res.status(400).send({ message: "Address is Required" });
        }
        if (!answer) {
            return res.status(400).send({ message: "Answer is Required" });
        }

        const existingUser = await userModal.findOne({ email });
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: "Already Registered, please login",
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModal({
            name: name,
            email: email,
            phone: phone,
            address: address,
            password: hashedPassword,
            answer: answer
        }).save();
        res.status(201).send({
            success: true,
            message: "User Registered Successfully",
            user,
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error,
        });
    }
};

const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
                message: "Invalid email or password"
            })
        }
        //check user
        const user = await userModal.findOne({ email })
        if (!user) {
            return res.send({
                success: false,
                message: "Email is not registered"
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: "Invalid Password"
            })
        }
        //token
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })
        res.status(200).send({
            success: true,
            message: "Login successfully",
            user: {
                _id:user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token: token
        })
    } catch (error) {
        console.log("error>>>", error);
        res.status(500).send({
            success: false,
            message: "Error in login",
            error
        })
    }
}

//forgot password

const forgotPasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body;
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "New password is required" })
        }
        //check 
        const user = await userModal.findOne({ email, answer });
        //validation
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Wrong Email or Answer"
            })
        }
        const hashed = await hashPassword(newPassword);
        await userModal.findByIdAndUpdate(user._id, { password: hashed });
        res.status(200).send({
            success: true,
            message: "Password reset successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Something went wrong",
            error
        })
    }
}

const testController = (req, res) => {
    res.send("Protected routes")
}

module.exports = {
    registerController,
    loginController,
    testController,
    forgotPasswordController
};
