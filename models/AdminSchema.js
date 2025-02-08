import mongoose from "mongoose";
const Schema = mongoose.Schema;


const AdminSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    bank_id: { type: mongoose.Schema.Types.ObjectId, ref: "BankConfig", required: true },
    bank_branch: {
      branch_name: String,
      ifsc_code: String,
    },
    role: { type: String, enum: ['Loan Officer', 'Manager', 'Admin'], required: true },
    rbi_compliance_training: { type: Boolean, default: false },
  }, { timestamps: true });
  
  const Admin = mongoose.model("Admin", AdminSchema);
  export default Admin;