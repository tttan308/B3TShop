const express = require("express");
const productController = require("../controllers/productController");
const route = express.Router();

const initProductRoute = (app) => {
  route.get("/?", productController.getProductPage);
  route.get("/detail/:id", productController.getDetailProductPage);
  route.post("/find", productController.findProduct);
  app.use("/product", route);
};
module.exports = initProductRoute;
