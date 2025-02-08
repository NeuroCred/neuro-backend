import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },

    // Only user-input fields needed by the AI model
    no_of_dependents: { type: Number, required: true },
    education: { type: String, enum: ['Graduate', 'Not Graduate'], required: true },
    self_employed: { type: Boolean, required: true },
    income_annum: { type: Number, required: true },
    loan_amount: { type: Number, required: true },
    loan_term: { type: Number, required: true },
    cibil_score: { type: Number, min: 300, max: 900, required: true },

    // AI model decision
    decision_by_ml: { type: String, enum: ['Approved', 'Rejected','Pending'], default: "Pending" },

}, { timestamps: true });

const Loan = mongoose.model("Loan", LoanSchema);
export default Loan;
