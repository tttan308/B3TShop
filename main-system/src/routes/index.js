const initAuthRoute = require("./auth");
const initWebRoute = require("./web");
const initCartRoute = require("./cart");
const initProductRoute = require("./product");
const initUserRoutes = require("./user");
const initAdminRoute = require("./admin");
const initCategoryRoute = require("./category");initCategoryRoute

module.exports = (app) => {
  initWebRoute(app);  
  initAuthRoute(app);
  initCartRoute(app);
  initProductRoute(app);
  initUserRoutes(app);
  initAdminRoute(app);
  initCategoryRoute(app);
};