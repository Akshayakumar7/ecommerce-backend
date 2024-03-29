const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");  // Fix the typo here
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const categoryRoutes = require("./routes/categoryRoutes");
const productRoutes = require("./routes/productRoutes");
const cors = require("cors")

// Configure env
dotenv.config();

// Database config
connectDB();

// Rest object
const app = express();

// Middleware
app.use(cors())
app.use(express.json());
app.use(morgan("dev"));  // Fix the typo here

// Routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes)

app.get("/", (req, resp) => {
    resp.send("<h1>Welcome to ecommerce app</h1>");
});

// PORT
const PORT = process.env.PORT || 8080;

// Run listen
app.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});
