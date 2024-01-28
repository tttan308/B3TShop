const db = require('../models');
const Transaction = db.transactions;
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const PaymentAccount = db.paymentAccounts;
const dotenv = require('dotenv');
dotenv.config();

const paymentController = {
    getPaymentPage: async (req, res) => {
        try {
            const token = req.query.token || req.cookies.payment_token;
            // Lưu token vào cookie
            res.cookie('payment_token', token, { maxAge: 900000, httpOnly: true });

            const username = jwt.verify(token, process.env.JWT_SECRET).username;
            const amountToPay = jwt.verify(token, process.env.JWT_SECRET).amountToPay;

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

            // Lay ra balance cua user
            const balance = paymentAccount.Balance;

            // Render payment page
            res.render('payment', {
                username: username,
                amountToPay: amountToPay,
                balance: balance
            });

        } catch (error) {
            console.log(error);
        }
    },

    getPaymentPage2: async (req, res) => {
        console.log(req.cookies.payment_token);
        try {
            const token = req.cookies.payment_token;
            const username = jwt.verify(token, process.env.JWT_SECRET).username;
            const amountToPay = jwt.verify(token, process.env.JWT_SECRET).amountToPay;

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

            // Lay ra balance cua user
            const balance = paymentAccount.Balance;

            // Render payment page
            res.render('payment', {
                username: username,
                amountToPay: amountToPay,
                balance: balance
            });

        } catch (error) {
            console.log(error);
        }
    },

    pay: async (req, res) => {
        try {
            const token = req.cookies.payment_token;

            const username = jwt.verify(token, process.env.JWT_SECRET).username;
            const amountToPay = jwt.verify(token, process.env.JWT_SECRET).amountToPay;

            const paymentAccount = await PaymentAccount.findOne({
                where: {
                    Username: username
                }
            });

            const balance = paymentAccount.Balance;

            if (balance < amountToPay) {
                res.json({ message: 'Không đủ tiền' })
            }

            const newBalance = balance - amountToPay;

            await PaymentAccount.update({
                Balance: newBalance
            }, {
                where: {
                    Username: username
                }
            });

            const newTransaction = await Transaction.create({
                Username: username,
                Amount: amountToPay,
                TransactionDate: new Date()
            });

            
            res.json({ token: token, message: 'Thanh toán thành công' });

        } catch (error) {
            console.log(error);
        }
    }

}

module.exports = paymentController;