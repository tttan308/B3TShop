const express = require("express");
const cartController = require("../controllers/cartController.js");
const route = express.Router();
const { verifyToken } = require("../middlewares/authorMiddleware");

const initCartRoute = (app) => {
  route.get("/", cartController.getCartPage);
  route.post("/add", verifyToken, cartController.addCart);
  route.get("/checkout", verifyToken, cartController.getCheckoutPage);
  app.use("/cart", verifyToken, route);
};

module.exports = initCartRoute;
