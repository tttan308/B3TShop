const initAuthRoute = require("./auth");
const initWebRoute = require("./web");
const initCartRoute = require("./cart");
const initProductRoute = require("./product");
const initUserRoutes = require("./user");

module.exports = (app) => {
  initAuthRoute(app);
  initWebRoute(app);  
  initCartRoute(app);
  initProductRoute(app);
  initUserRoutes(app);
};