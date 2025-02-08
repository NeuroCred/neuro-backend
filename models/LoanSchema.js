import mongoose from "mongoose";
const Schema = mongoose.Schema;
import User from "./UserSchema.js"

const LoanSchema = new Schema({

    // Only user-input fields needed by the AI model
    no_of_dependents: { type: Number },
    education: { type: String, enum: ['Graduate', 'Not Graduate'], required: true },
    self_employed: { type: Boolean, required: true },
    income_annum: { type: Number, required: true },
    loan_amount: { type: Number, required: true },
    loan_term: { type: Number, required: true },
    cibil_score: { type: Number, min: 300, max: 900, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date_of_birth: { type: Date, required: true },
    self_employed:{
        type:Boolean,},
    // AI model decision
    decision_by_ml: { type: String, enum: ['Approved', 'Rejected','Pending'], default: "Pending" },

}, { timestamps: true });

const Loan = mongoose.model("Loan", LoanSchema);
export default Loan;
