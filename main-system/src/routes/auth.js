const route = require("express").Router();
const authController = require("../controllers/authController");
const authorMiddleware = require("../middlewares/authorMiddleware");

const initAuthRoute = (app) => {
  route.get("/register", (req, res) => {
    res.render("register", { layout: false });
  });

  route.post("/register", authController.registerUser);

  route.get("/login", (req, res) => {
    res.render("login", { layout: false });
  });

  route.post("/login", authController.loginUser);

  route.get("/refresh", authController.requestRefreshToken);

  route.post("/logout", authorMiddleware.verifyToken, authController.logOut);

  app.use("/auth", route);
};

module.exports = initAuthRoute;
