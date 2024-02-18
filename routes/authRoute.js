// authRoute.js
const express = require("express");
const {
    registerController,
    loginController,
    testController,
    forgotPasswordController
} = require("../controller/authController");
const { requireSignIn,
    isAdmin } = require("../middlewares/authMiddleware");

const router = express.Router();



// REGISTER || MOTHOD POST
router.post("/register", registerController);

// LOGIN || POST
router.post("/login", loginController);

//Forgot password || POST
router.post("/forgot-password", forgotPasswordController)

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

//protected route auth
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

//protected admin route auth

router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})
module.exports = router;
