const express = require("express");
const cartController = require("../controllers/categoryController");
const route = express.Router();
const { verifyToken } = require("../middlewares/authorMiddleware");

const initCartRoute = (app) => {
  // route.get("/", cartController.getCartPage);
  // app.use("/checkout", cartController.getCheckoutPage);
  app.use("/cart", verifyToken, route);
};

module.exports = initCartRoute;
