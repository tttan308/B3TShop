const express = require("express");
const route = express.Router();
const paymentController = require("../controllers/paymentController.js");
const initPayment = (app) => {
    route.post("/", paymentController.authorizePayment);
    app.use("/payment", route);
}

module.exports = initPayment;