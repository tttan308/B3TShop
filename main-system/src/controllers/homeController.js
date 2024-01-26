const customErr = require("../models/customErr");
const jwt = require("jsonwebtoken");
const categoryController = require("./categoryController");
const cartController = require("./cartController");

const homeController = {

  getHomePage: async (req, res) => {
    
    const token = req.cookies.accessToken;
    const username = token ? jwt.decode(token).username : null;
    const categories = await categoryController.getAllCategory(req, res);
    const get4ProductOfEachCategory = await categoryController.get4ProductOfEachRootCategory(req, res); 
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
      return res.render("contact");
    } catch (error) {
      next(new customErr(error.message, 505));
    }
  },

  getAdminPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username1 = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login-admin");
      }
      else {
        res.render('admin_page',
          { layout: 'admin' });
      }

    } catch (error) {
      next(new customErr(error.message, 505));
    }
  },

  getCategoriesPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      const isAdmin = token ? jwt.decode(token).isAdmin : null;

      if (!token || !isAdmin) {
        return res.redirect("/auth/login-admin");
      }
      else {
        const categories = await categoryController.getAllCategory(req, res);
        res.render('categories_manage',
          {
            layout: 'admin',
            isLoggedIn: !!token,
            username: username,
            categories: categories,
          });
      }

    } catch (error) {
      next(new customErr(error.message, 505));
    }
  },
};

module.exports = homeController;
