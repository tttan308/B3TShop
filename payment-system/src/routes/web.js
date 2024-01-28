const express = require("express");
const route = express.Router();
const homeController = require("../controllers/homeController.js");

const initHomeRoute = (app) => {
    route.get("/deposit", homeController.getHomePage);
    route.get("/logout", homeController.logout);
    route.get("/history", homeController.getHistoryPage);
    app.use("/", route);
}

module.exports = initHomeRoute;