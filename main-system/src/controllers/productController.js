const db = require("../models");
const Product = db.products;
const categoryController = require("./categoryController");
const cartController = require("./cartController");
const jwt = require("jsonwebtoken");

const productController = {
  getProductPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      const categories = await categoryController.getAllCategory(req, res);
      // Lấy tất cả sản phẩm
      const product1 = await Product.findAll();
      // let safeData = Object.assign({}, product1.dataValues);

      const result = {
        products: product1.map((product) => {
          return {
            ProductID: product.ProductID,
            ProductName: product.ProductName,
            Price: product.Price,
            Discount: product.Discount,
            ImageURL: product.ImageURL,
          };
        }),
      };

      const page = req.query.page;
      const sort = req.query.sort || "default";
      const filter = req.query.filter || "default";


      if (sort === "asc") {
        result.products.sort((a, b) => {
          return a.Price - b.Price;
        });
      }

      if (sort === "desc") {
        result.products.sort((a, b) => {
          return b.Price - a.Price;
        });
      }

      if (filter === "below500") {
        result.products = result.products.filter((product) => {
          return product.Price < 500000;
        });
      } else if (filter === "500to1000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 500000 && product.Price < 1000000;
        });
      }
      else if (filter === "1000to5000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 1000000 && product.Price < 5000000;
        });
      } else if (filter === "5000to10000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 5000000 && product.Price < 10000000;
        });
      } else if (filter === "above10000") {
        result.products = result.products.filter((product) => {
          return product.Price >= 10000000;
        });
      }

      const limit = 12;
      const startIndex = (page - 1) * limit;
      const endIndex = page * limit;
      const total = result.products.length;

      result.products = result.products.slice(startIndex, endIndex);
      const totalPages = Math.ceil(total / limit) || 1;
      result.totalPages = totalPages;
      result.currentPage = page;
      result.sort = sort;
      result.filter = filter;

      const shoppingCart = await cartController.getCartItemsDetail(req, res);
      return res.render("product", {
        isLoggedIn: !!token,
        username: username,
        categories: categories,
        page: result,
        shoppingCart: shoppingCart,
      });

    } catch (error) {
      console.log(error);
    }
  },

  getDetailProductPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      const categories = await categoryController.getAllCategory(req, res);
      const shoppingCart = await cartController.getCartItemsDetail(req, res);

      const { id } = req.params;
      const product1 = await Product.findByPk(id);

      if (!product1) {
        return res.status(404).send("Product not found");
      }

      let safeData = Object.assign({}, product1.dataValues);

      // Lấy tầm 10 sản phẩm có tên gần giống nhất,
      // chỉ càn = CategoryID
      const product2 = await Product.findAll({
        where: {
          CategoryID: product1.CategoryID,
        },
        limit: 10,
      });
      
      let safeData2 = product2.map((product) => {
        return {
          ProductID: product.ProductID,
          ProductName: product.ProductName,
          Price: product.Price,
          Discount: product.Discount,
          ImageURL: product.ImageURL,
        };
      });

      return res.render("detail_product", {
        isLoggedIn: !!token,
        username: username,
        categories: categories,
        product: safeData,
        shoppingCart: shoppingCart,
        relatedProducts: safeData2,
      });
    } catch (error) {
      console.log(error);
    }
  },

  findProduct: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      const categories = await categoryController.getAllCategory(req, res);
      const { keyword } = req.body;

      // Lấy tầm 5 sản phẩm có tên gần giống nhất, không phân biệt hoa thường
      const product1 = await Product.findAll({
        where: db.Sequelize.where(
          db.Sequelize.fn("LOWER", db.Sequelize.col("ProductName")),
          "LIKE",
          `%${keyword.toLowerCase()}%`
        ),
        limit: 5,
      });

      const shoppingCart = await cartController.getCartItemsDetail(req, res);

      // chỉ lấy tên và id của sản phẩm
      const result = {
        products: product1.map((product) => {
          return {
            ProductID: product.ProductID,
            ProductName: product.ProductName,
          };
        }),
      };

      return res.json(result);
    } catch (error) {
      console.log(error);
    }
  },

};

module.exports = productController;
