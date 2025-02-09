import mongoose from "mongoose";
import User from "../models/UserSchema.js";
import { getGridFSBucket } from "../config/db.js";

// 📌 Upload File Controller
  const uploadFile = async (req, res) => {
    try {
      const { userId } = req.params; // Get userId from URL params
      const { documentType } = req.body; // Get documentType from request body
  
      // Validate documentType
      if (!["Aadhar", "PAN"].includes(documentType)) {
        return res.status(400).json({ message: "Invalid document type. Allowed: Aadhar, PAN." });
      }
  
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded!" });
      }
  
      // Find user in database
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found!" });
      }
  
      // Create document entry
      const newDocument = {
        documentType,
        fileId: new mongoose.Types.ObjectId(req.file.id), // Store GridFS file ID
        filename: req.file.filename,
        uploadDate: new Date(),
        status: "Pending",
      };
  
      // Push the new document into user's documents array
      user.documents.push(newDocument);
      await user.save();
  
      console.log("📄 File Uploaded Successfully:", req.file);
  
      res.status(201).json({
        message: "File uploaded and stored successfully!",
        fileId: req.file.id,
        userId: user._id,
        document: newDocument,
      });
    } catch (error) {
      console.error("❌ Error uploading file:", error);
      res.status(500).json({ message: "Internal server error", error: error.message });
    }
  };

// 📌 Get File by ID Controller
const getFileById = async (req, res) => {
  try {
    const gridFSBucket = getGridFSBucket();
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    const fileStream = gridFSBucket.openDownloadStream(fileId);

    fileStream.on("error", (err) => {
      console.error("❌ Error streaming file:", err);
      return res.status(404).json({ message: "File not found" });
    });

    fileStream.pipe(res);
  } catch (error) {
    console.error("❌ Error retrieving file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// 📌 Delete File by ID Controller
const deleteFileById = async (req, res) => {
  try {
    const gridFSBucket = getGridFSBucket();
    const fileId = new mongoose.Types.ObjectId(req.params.id);
    await gridFSBucket.delete(fileId);

    console.log(`🗑️ File ${fileId} deleted successfully`);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    console.error("❌ Error deleting file:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const docController = {
    uploadFile,
    getFileById,
    deleteFileById,
  };
  export default docController;
