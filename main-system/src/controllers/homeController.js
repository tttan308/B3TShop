const customErr = require("../models/customErr");
const jwt = require("jsonwebtoken");
const categoryController = require("./categoryController");
const cartController = require("./cartController");

const homeController = {
  getHomePage: async (req, res) => {
    const token = req.cookies.accessToken;
    const username = token ? jwt.decode(token).username : null;
    
    if(!token) {
      return res.redirect("/auth/login");
    }
    const categories = await categoryController.getAllCategory(req, res);
    const get4ProductOfEachCategory =
      await categoryController.get4ProductOfEachRootCategory(req, res);
    const shoppingCart = await cartController.getCartItemsDetail(req, res);
    return res.render("home", {
      isLoggedIn: !!token,
      username: username,
      categories: categories,
      get4ProductOfEachCategory: get4ProductOfEachCategory,
      shoppingCart: shoppingCart,
    });
  },

  getContractPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      console.log("token in home page:", token);
      const username = token ? jwt.decode(token).username : null;
      const categories = await categoryController.getAllCategory(req, res);
      const get4ProductOfEachCategory =
        await categoryController.get4ProductOfEachRootCategory(req, res);
      const shoppingCart = await cartController.getCartItemsDetail(req, res);
      return res.render("contact", {
        isLoggedIn: !!token,
        username: username,
        categories: categories,
        get4ProductOfEachCategory: get4ProductOfEachCategory,
        shoppingCart: shoppingCart,
      });
    } catch (error) {
      next(new customErr(error.message, 505));
    }
  },

  getAdminPage: async (req, res) => {
    // try {
    //   const token = req.cookies.accessToken;
    //   const username1 = token ? jwt.decode(token).username : null;

    //   if (!token) {
    //     return res.redirect("/auth/login-admin");
    //   } else {
    //     res.render("admin_page", { layout: "admin" });
    //   }
    // } catch (error) {
    //   next(new customErr(error.message, 505));
    // }
    //TODO: remove this
    res.render("admin_page", { layout: "admin" });
  },

  getCategoriesPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      // const isAdmin = token ? jwt.decode(token).isAdmin : null;
      // if (!token || !isAdmin) {
      //   return res.redirect("/auth/login-admin");
      // } else {
      const categories = await categoryController.getAllCategory(req, res);
      res.render("categories_manage", {
        layout: "admin",
        isLoggedIn: !!token,
        username: username,
        categories: categories,
      });
      // }
    } catch (error) {
      next(new customErr(error.message, 505));
    }
    //TODO: remove this
    const categories = await categoryController.getAllCategory(req, res);
    res.render("categories_manage", {
      layout: "admin",
      // isLoggedIn: !!token,
      // username: username,
      categories: categories,
    });

  },
};

module.exports = homeController;
