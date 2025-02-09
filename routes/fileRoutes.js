import express from "express";
import upload from "../middlewares/uploadMiddleware.js";
import docController from "../controllers/docController.js";

const router = express.Router();

router.post("/upload/:userId", upload.single("file"), docController.uploadFile);
router.get("/file/:id", docController.getFileById);
router.delete("/file/:id",docController.deleteFileById);

export default router;
 