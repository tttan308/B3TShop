const express = require("express");
const homeController = require("../controllers/homeController");
const adminProductController = require("../controllers/adminProductController");
const { verifyToken } = require("../middlewares/authorMiddleware");
const categoryController = require("../controllers/categoryController");
const route = express.Router();
const { uploadProduct } = require("../middlewares/uploadImage");

const initAdminRoute = (app) => {
  // Route quản lý danh mục
  route.get("/", homeController.getAdminPage);
  route.get("/categories", verifyToken, homeController.getCategoriesPage);
  route.get("/categories/get", verifyToken, categoryController.getCategoryByName);
  route.post("/categories/add", verifyToken, categoryController.addCategory);
  route.delete("/categories/delete", verifyToken, categoryController.deleteCategory);
  route.put("/categories/update", verifyToken, categoryController.updateCategory);

  // Route quản lý sản phẩm
  route.get("/product/add", verifyToken, adminProductController.getAddProductPage);
  route.get("/product/list", verifyToken, adminProductController.getListProductPage);
  route.post("/product/add", verifyToken, uploadProduct.single("image"), adminProductController.addProduct);
  route.get("/product/edit/:id", verifyToken, adminProductController.getEditProductPage);
  route.post("/product/edit/:id", verifyToken, uploadProduct.single("image"), adminProductController.updateProduct);
  route.delete("/product/delete/:id", verifyToken, adminProductController.deleteProduct);

  // Route quản lý đơn hàng

  // Route quản lý người dùng

  app.use("/admin", route);
};

module.exports = initAdminRoute;
