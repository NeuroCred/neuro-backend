import Loan from "../models/Loan"; // Loan schema
import User from "../models/User"; // User schema

// Apply for Loan Controller
export const applyForLoan = async (req, res) => {
    try {
        const { userId, loan_type, loan_amount, tenure, interest_rate, employment_type, income, cibil_score, collateral, loan_purpose } = req.body;

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Validate required fields
        if (!loan_type || !loan_amount || !tenure || !interest_rate || !employment_type || !income || !cibil_score || !loan_purpose) {
            return res.status(400).json({ message: "Missing required loan details" });
        }

        // Create new Loan Application with status "Pending"
        const newLoan = new Loan({
            userId,
            loan_type,              // e.g., Home Loan, Personal Loan, Business Loan
            loan_amount,            // Loan amount requested
            tenure,                 // Loan tenure (months/years)
            interest_rate,          // Interest rate applicable
            employment_type,        // Salaried / Self-Employed
            income,                 // Monthly/Annual Income
            cibil_score,            // CIBIL Score of the user
            collateral,             // Any collateral details (if applicable)
            loan_purpose,           // Purpose of loan (Education, Business, etc.)
            loan_status: "Pending", // Initial status of the loan application
            application_date: new Date(), // Auto-set application date
        });

        // Save to database
        await newLoan.save();
        res.status(201).json({ message: "Loan application submitted successfully", loanId: newLoan._id, loan_status: newLoan.loan_status });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error submitting loan application" });
    }
};
