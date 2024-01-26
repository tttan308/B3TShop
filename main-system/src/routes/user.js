const route = require("express").Router();
const userController = require("../controllers/userController");
const authorMiddleware = require("../middlewares/authorMiddleware");

const initUserRoutes = (app) => {
    route.get("/", authorMiddleware.verifyToken, userController.getAllUsers);

    route.get("/profile", authorMiddleware.verifyToken, userController.getUserProfile);

    route.get("/profile/edit", authorMiddleware.verifyToken, userController.getEditProfile);

    route.post("/profile/edit", authorMiddleware.verifyToken, userController.postEditProfile);
    
    app.use("/user", route);
}

module.exports = initUserRoutes;
