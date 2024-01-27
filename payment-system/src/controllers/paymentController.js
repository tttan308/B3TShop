const db = require('../models');
const Transaction = db.transactions;
const jwt = require('jsonwebtoken');
const paymentController = {
    authorizePayment: async (req, res) => {
        console.log('authorizePayment');
        try {

            // get token from authorization header Bearer
            const token = req.headers.authorization.split(' ')[1];
            console.log(token);
            // get accountID from token
            const accountID = token ? jwt.decode(token).accountID : null;
            // get amount from body
            const { amount } = req.body;

            console.log(accountID);
            console.log(amount);

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