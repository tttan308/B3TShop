const express = require("express");
const homeController = require("../controllers/homeController");
const { verifyToken } = require("../middlewares/authorMiddleware");
const categoryController = require("../controllers/categoryController");
const route = express.Router();

const initAdminRoute = (app) => {
    route.get("/", homeController.getAdminPage);
    route.get("/categories", verifyToken, homeController.getCategoriesPage);
    route.get("/categories/get", verifyToken, categoryController.getCategoryByName)
    route.post("/categories/add", verifyToken, categoryController.addCategory);
    route.delete("/categories/delete", verifyToken, categoryController.deleteCategory);
    route.put("/categories/update", verifyToken, categoryController.updateCategory);
    app.use("/admin", route);
}

module.exports = initAdminRoute;