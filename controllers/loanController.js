import Loan from "../models/LoanSchema.js";

const applyForLoan = async (req, res) => {
    try {
        const { no_of_dependents, education, self_employed, income_annum, loan_amount, loan_term, cibil_score, date_of_birth} = req.body;
        const userId = req.user.id; 
         // Ensure user is authenticated
         if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized: User not found" });
        }
        // console.log(userId);
        // console.log(req.body.date_of_birth);
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
            date_of_birth,
            self_employed,
            decision_by_ml: "Pending" // Default status
        });
       

        await loan.save();
        res.status(201).json({ message: "Loan application received", loan });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export default applyForLoan;