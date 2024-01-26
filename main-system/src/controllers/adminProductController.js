const customErr = require("../models/customErr");
const jwt = require("jsonwebtoken");
const adminProductController = {
  getAddProductPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username1 = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login-admin");
      } else {
        res.render("add-product-page", { layout: "admin" });
      }
    } catch (error) {
      next(new customErr(error.message, 505));
    }
  },
  getListProductPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username1 = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login-admin");
      } else {
        res.render("list-product-page", { layout: "admin" });
      }
    } catch (error) {
      next(new customErr(error.message, 505));
    }
  },
  getCategoryProductPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username1 = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login-admin");
      } else {
        res.render("category-product-page", { layout: "admin" });
      }
    } catch (error) {
      next(new customErr(error.message, 505));
    }
  },
};

module.exports = adminProductController;
