const route = require("express").Router();
const userController = require("../controllers/userController");
const authorMiddleware = require("../middlewares/authorMiddleware");

const initUserRoutes = (app) => {
    route.get("/", authorMiddleware.verifyToken, userController.getAllUsers);
    app.use("/user", route);
}

module.exports = initUserRoutes;
