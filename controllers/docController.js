import mongoose from "mongoose";
import { getGridFSBucket } from "../config/db.js";

// 📌 Upload File Controller
const uploadFile = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded!" });
  }

  console.log("📄 File Uploaded Successfully:", req.file);
  res.status(201).json({ fileId: req.file.id, message: "File uploaded successfully!" });
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
