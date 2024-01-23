const express = require("express");
const homeController = require("../controllers/homeController");
const route = express.Router();

const initWebRoute = (app) => {
  route.get("/", homeController.getHomePage);
  app.use("/", route);
};
module.exports = initWebRoute;
