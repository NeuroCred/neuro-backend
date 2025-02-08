import express from "express";
import  applyForLoan  from "../controllers/loanController.js";
import authMiddleware from "../middlewares/authMiddleware.js";


const router = express.Router();


router.post("/apply",  authMiddleware, applyForLoan );

export default router;
