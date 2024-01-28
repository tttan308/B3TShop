const db = require('../models');
const Transaction = db.transactions;
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
let paymentSessions = {};
const PaymentAccount = db.paymentAccounts;

const paymentController = {
    authorizePayment: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            // verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const username = decoded.username;
            const amount = req.body.amount;

            //Kiểm tra xem PaymentAccount có tồn tại không
            // Nếu không thì tự động tạo mới
            // Nếu có thì lấy ra    
            const paymentAccount = await PaymentAccount.findOne({
                where: {
                    Username: username
                }
            });

            if (!paymentAccount) {
                const newPaymentAccount = await PaymentAccount.create({
                    Username: username,
                    Balance: 0
                });

            }

            const paymentSessionId = await paymentController.createPaymentSession(amount, username);
            const paymentUrl = `http://localhost:5000/payment?sessionId=${paymentSessionId}`;

            res.json({ paymentUrl });
            // // Kiểm tra xem có đủ tiền để thanh toán không
            // // Nếu không thì trả về lỗi
            // // Nếu có thì trừ tiền và tạo transaction
            // if (paymentAccount.Balance < amount) {
            //     return res.status(400).send({
            //         message: 'Not enough money'
            //     });
            // }

            // // Trừ tiền
            // paymentAccount.Balance -= amount;
            // await paymentAccount.save();

            // // Tạo transaction
            // const transaction = await Transaction.create({
            //     Username: username,
            //     Amount: amount
            // });

            // return res.status(200).send(transaction);
        } catch (error) {
            console.log(error);
            return res.status(500).send(error);
        }
    },

    getPaymentPage: (req, res) => {
        // const token = req.headers.authorization.split(' ')[1];
        // const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // const username = decoded.username;
        // return res.render('home', {
        //     username: username
        // });
    },

    createPaymentSession: async (amount, username) => {
        const sessionId = `sess_${new Date().getTime()}`;

        paymentSessions[sessionId] = {
            amount: amount,
            username: username,
            createdAt: new Date()
        };

        return sessionId;
    },

    getPaymentSession: (sessionId) => {
        return paymentSessions[sessionId];
    },
}

module.exports = paymentController;