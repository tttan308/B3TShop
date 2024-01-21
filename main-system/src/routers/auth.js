const express = require("express");
const authController = require("../controllers/authController");
const route = express.Router();

const initAuthRoute = (app) => {
  route.get("/login", authController.getLoginPage);
  route.get("/register", authController.getRegisterPage);
  app.use("/auth", route);
};
module.exports = initAuthRoute;
