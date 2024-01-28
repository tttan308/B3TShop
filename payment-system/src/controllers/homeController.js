const db = require('../models');
const PaymentAccount = db.paymentAccounts;
const jwt = require('jsonwebtoken');
const Transaction = db.transactions;

const homeController = {
    getHomePage: async (req, res) => {
        const payment_token = req.cookies.payment_token;
        const username = jwt.verify(payment_token, process.env.JWT_SECRET).username;
        const amountToPay = jwt.verify(payment_token, process.env.JWT_SECRET).amountToPay;
        const paymentAccount = await PaymentAccount.findOne({
            where: {
                Username: username
            }
        });
        const balance = paymentAccount.Balance;

        res.render("deposit", {
            username: username,
            amountToPay: amountToPay,
            balance: balance
        });
    },

    logout: (req, res) => {
        res.clearCookie("payment_token");
        res.redirect("/");
    },

    getHistoryPage: async (req, res) => {
        try {
            const payment_token = req.cookies.payment_token;
            const username = jwt.verify(payment_token, process.env.JWT_SECRET).username;
            const transactions = await Transaction.findAll({
                where: {
                    Username: username
                }
            });

            const paymentAccount = await PaymentAccount.findOne({
                where: {
                    Username: username
                }
            });
            const balance = paymentAccount.Balance;

            let safeData = Object.assign({}, transactions.dataValues);

            safeData = transactions.map((transaction) => {
                return Object.assign({}, transaction.dataValues);
            }
            );
            res.render("history", {
                username: username,
                transactions: safeData,
                balance: balance
            });
        } catch (error) {
            console.log(error);
        }
    },
}

module.exports = homeController;