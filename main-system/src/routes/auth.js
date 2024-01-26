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

  route.get("/login-admin", (req, res) => {
    res.render("login-admin", { layout: false });
  });

  route.post("/login-admin", authController.loginAdmin);

  route.get("/refresh", authController.requestRefreshToken);

  route.get("/logout", authorMiddleware.verifyToken, (req, res) => {
    res.clearCookie("accessToken");
    res.clearCookie("refreshToken");
    res.redirect("/");
  });

  route.post("/logout", authorMiddleware.verifyToken, authController.logOut);

  app.use("/auth", route);
};

module.exports = initAuthRoute;
