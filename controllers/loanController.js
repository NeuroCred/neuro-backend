import Loan from "../models/LoanSchema.js";

export const applyForLoan = async (req, res) => {
    try {
        const { userId, no_of_dependents, education, self_employed, income_annum, loan_amount, loan_term, cibil_score } = req.body;

        // Create new loan application with "Pending" status
        const loan = new Loan({
            userId, 
            no_of_dependents, 
            education, 
            self_employed, 
            income_annum, 
            loan_amount,
            loan_term, 
            cibil_score,
            decision_by_ml: "Pending" // Default status
        });

        await loan.save();
        res.status(201).json({ message: "Loan application received", loan });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
