const db = require('../models');
const Product = db.products;
const categoryController = require("./categoryController");
const jwt = require("jsonwebtoken");

const productController = {
  getProductPage: async (req, res) => {
    try {
      return res.render("product");
    } catch (error) {
      console.log(error);
    }
  },

  getDetailProductPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      const categories = await categoryController.getAllCategory(req, res);
      const { id } = req.params;
      const product1 = await Product.findByPk(id);

      if (!product1) {
        return res.status(404).send('Product not found');
      }

      let safeData = Object.assign({}, product1.dataValues);

      return res.render("detail_product", {
        isLoggedIn: !!token,
        username: username,
        categories: categories,
        product: safeData,
      });

    } catch (error) {
      console.log(error);
    }
  },

};

module.exports = productController;
