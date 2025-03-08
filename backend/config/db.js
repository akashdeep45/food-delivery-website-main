import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      console.warn("MONGO_URI environment variable not set. Using default connection string.");
      // Fall back to a default connection string if MONGO_URI is not set
      process.env.MONGO_URI = "mongodb://localhost:27017/food-delivery";
    }
    
    const db = await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
      connectTimeoutMS: 10000, // Give up initial connection after 10s
    });
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    // Don't exit the process, let the application continue
    // process.exit(1);
  }
};
