const express = require("express");
const route = express.Router();
const paymentController = require("../controllers/paymentController.js");
const initPayment = (app) => {
    route.get("/?", paymentController.getPaymentPage);
    route.get("/", paymentController.getPaymentPage2)
    route.get("/pay", paymentController.pay)
    app.use("/payment", route);
}

module.exports = initPayment;