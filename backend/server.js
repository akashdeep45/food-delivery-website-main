import express from "express";
import multer from "multer";
import userRouter from "./routes/userRoute.js";
import foodRouter from "./routes/foodRoute.js";
import { connectDB } from "./config/db.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cartRouter from "./routes/cartRoute.js";
import "dotenv/config";
import orderRouter from "./routes/orderRoute.js";

const PORT = process.env.PORT || 4000;
const app = express();

// Connect to the database
try {
  connectDB();
  console.log("Attempting to connect to MongoDB...");
} catch (error) {
  console.error("Failed to connect to MongoDB:", error);
  console.log("Server will continue to run without database connection");
}

// Middleware
app.use(express.json());
const allowedOrigins = [
  "https://food-website-by-arunkumar.onrender.com",
  "https://admin-food-website.onrender.com",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://localhost:3002"
];
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Headers", "token, Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Routes
app.use("/api/user", userRouter);
app.use("/api/food", foodRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);

// Add a test route that doesn't require database connection
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working! Database connection may be limited." });
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
