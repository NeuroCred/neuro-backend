import mongoose from "mongoose";
const Schema = mongoose.Schema;
import Loan from "./LoanSchema.js"

const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 
  },
  otp: { type: String },
  otpExpires: { type: Date },
  password: { type: String, required: true },
  phone: { 
    type: String, 
    required: true, 
    unique: true, 
    match: /^[6-9]\d{9}$/ 
  },
  date_of_birth: { type: Date },
  father_name: { type: String },
  mother_name: { type: String },
  address: {
    country: String,
    state: String,
    city: String,
    pin: String,
  },
  self_employed:{
    type: Boolean,
  },
  income: { type: Number, min: 0, default: 0 },
  credit_score: { type: Number, min: 300, max: 900, default: 700 },
  documents: [{
    documentType:{
      type: String,
      enum:['Aadhar', 'PAN']
    },
    fileId: mongoose.Schema.Types.ObjectId,  // Reference to the file in GridFS
    filename: String,  // Name of the file stored in GridFS
    uploadDate: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ['Pending', 'Approved', 'Rejected'],
      default: 'Pending'
    }
  }],
  loans: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Loan' }],
}, { timestamps: true });

UserSchema.index({ email: 1, phone: 1 }, { unique: true }); // Indexing

const User = mongoose.model("User", UserSchema);
export default User;
