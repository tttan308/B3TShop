const db = require('../models');
const Transaction = db.transactions;

const paymentController = {
    authorizePayment: async (req, res) => {
        try {
            const { accountID, amount } = req.body;

            const transaction = await Transaction.create({
                AccountID: accountID,
                Amount: amount,
                Status: 'pending',
                DateCreated: new Date()
            });

            return res.status(200).send(transaction);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    }
}

module.exports = paymentController;