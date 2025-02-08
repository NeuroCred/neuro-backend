import express from "express";
import { applyForLoan } from "../controllers/loanController.js";

const router = express.Router();

// Route for applying for a loan
router.post("/apply", applyForLoan);

export default router;
