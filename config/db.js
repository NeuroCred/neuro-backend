import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";
import dotenv from "dotenv";
dotenv.config();

let gridFSBucket; // Declare GridFSBucket globally

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected Successfully");

    // Wait for the MongoDB connection to be open before initializing GridFSBucket
    conn.connection.on("open", () => {
      console.log(" MongoDB connection is now open. Initializing GridFSBucket...");
      gridFSBucket = new GridFSBucket(conn.connection.db, { bucketName: "uploads" });
      console.log("GridFSBucket initialized successfully!");
    });

  } catch (error) {
    console.error("MongoDB Connection Failed:", error);
    process.exit(1);
  }
};

// Function to get GridFSBucket safely
const getGridFSBucket = () => {
  if (!gridFSBucket) {
    throw new Error("GridFSBucket is not initialized yet.");
  }
  return gridFSBucket;
};

// Export function to get GridFSBucket safely
export { getGridFSBucket };
export default connectDB;
