const express = require("express");
const productController = require("../controllers/productController");
const route = express.Router();

const initProductRoute = (app) => {
  route.get("/", productController.getProductPage);
  app.use("/product", route);
};
module.exports = initProductRoute;
