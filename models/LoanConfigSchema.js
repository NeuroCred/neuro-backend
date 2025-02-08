import mongoose from "mongoose";
const Schema = mongoose.Schema;


const LoanConfigSchema = new Schema({
    bank_name: { type: String, required: true },
    branch: { type: String, required: true },
    ifsc_code: { type: String, required: true },
    base_interest_rate: { type: Number, required: true },
    rbi_repo_rate: {
      current_rate: { type: Number, required: true },
      history: [{ date: Date, rate: Number }],
    },
    risk_based_interest_rates: {
      cibil_750_above: Number,
      cibil_650_750: Number,
      cibil_below_650: Number,
    },
    minimum_cibil_score_required: { type: Number, required: true },
    loan_processing_fee_percentage: { type: Number },
    prepayment_penalty: { type: Number },
    loan_disbursement_mode: { type: String, enum: ['NEFT', 'RTGS', 'UPI', 'Cheque'] },
    loan_approval_workflow: [{ step: String, role: String, conditions: String }],
    rbi_compliance_version: { type: String },
  }, { timestamps: true });
  
  const LoanConfig = mongoose.model("LoanConfig", LoanConfigSchema);
  export default LoanConfig;