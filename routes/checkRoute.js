import express from "express";
import helloUser from "../controllers/checkController.js";

const router = express.Router();

router.get("/hello", (req, res) => {
    res.status(200).json({ message: "Hello, World!" });
  });


export default router;
