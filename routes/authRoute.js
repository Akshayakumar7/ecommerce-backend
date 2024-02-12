// authRoute.js
const express = require("express");
const { registerController, loginController, testController } = require("../controller/authController");
const { requireSignIn, isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();



// REGISTER || MOTHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController)

//test routes
router.get("/test", requireSignIn,isAdmin, testController)

module.exports = router;
