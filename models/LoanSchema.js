import mongoose from "mongoose";
const Schema = mongoose.Schema;

const LoanSchema = new Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    linked_bank_id: { type: mongoose.Schema.Types.ObjectId, ref: "LoanConfig", required: true },
    loan_type: { type: String, enum: ['Home Loan', 'Car Loan', 'Personal Loan', 'Education Loan'], required: true },
    loan_category: { type: String, enum: ['Secured', 'Unsecured'], required: true },
    loan_purpose: { type: String },
    custom_interest_rate: { type: Number },
    min_cibil_required: { type: Number },
    max_loan_amount: { type: Number, required: true },
    tenure_range: {
      min: { type: Number, required: true },
      max: { type: Number, required: true },
    },
    collateral_required: { type: Boolean, default: false },
    special_discounts: [{ category: String, discount_percentage: Number }],
    default_rate_for_this_loan: { type: Number },
    status: { type: String, enum: ['Pending', 'Approved', 'Rejected'], default: 'Pending' },
    rejection_reasons: [{ type: String }], // Reason for rejection if loan is not approved
    loan_decision: { type: String, enum: ['Approved', 'Rejected'], default: 'Pending' },
    decision_by_ml: { type: String, enum: ['Approved', 'Rejected'], required: true }, // Decision based on ML model
}, { timestamps: true });

const Loan = mongoose.model("Loan", LoanSchema);
export default Loan;
