const express = require("express");
const cartController = require("../controllers/cartController");
const route = express.Router();

const initCartRoute = (app) => {
  route.get("/", cartController.getCartPage);
  app.use("/checkout", cartController.getCheckoutPage);
  app.use("/cart", route);
};
module.exports = initCartRoute;
