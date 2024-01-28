const express = require("express");
const route = express.Router();
const orderController = require("../controllers/orderController.js");
const { verifyToken } = require("../middlewares/authorMiddleware");

const initOrder = (app) => {
    route.get("/", verifyToken, orderController.getOrderPage);
    app.use("/order", route);
}

module.exports = initOrder;