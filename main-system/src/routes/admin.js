const express = require("express");
const homeController = require("../controllers/homeController");
const adminProductController = require("../controllers/adminProductController");
const { verifyToken } = require("../middlewares/authorMiddleware");
const categoryController = require("../controllers/categoryController");
const route = express.Router();

const initAdminRoute = (app) => {
  // Route quản lý danh mục
  route.get("/", homeController.getAdminPage);
  route.get("/categories", verifyToken, homeController.getCategoriesPage);
  route.get(
    "/categories/get",
    verifyToken,
    categoryController.getCategoryByName
  );
  route.post("/categories/add", verifyToken, categoryController.addCategory);
  route.delete(
    "/categories/delete",
    verifyToken,
    categoryController.deleteCategory
  );
  route.put(
    "/categories/update",
    verifyToken,
    categoryController.updateCategory
  );

  route.get(
    "/product/add",
    verifyToken,
    adminProductController.getAddProductPage
  );
  route.get(
    "/product/list",
    verifyToken,
    adminProductController.getListProductPage
  );

  // Route quản lý sản phẩm

  // Route quản lý đơn hàng

  // Route quản lý người dùng

  app.use("/admin", route);
};

module.exports = initAdminRoute;
