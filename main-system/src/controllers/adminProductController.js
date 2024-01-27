const db = require("../models");
const Product = db.products;
const fs = require("fs");
const path = require("path");

const adminProductController = {
  getAddProductPage: async (req, res) => {
    res.render("add-product-page", { layout: "admin" });
  },
  getEditProductPage: async (req, res) => {
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.render("edit-product-page", { layout: "admin", product: product.toJSON() });
  },

  getListProductPage: async (req, res) => {
    const products = await Product.findAll({
      include: [
        {
          model: db.categories,
          as: "Category",
          attributes: ["CategoryName"],
        },
      ],
    });

    console.log(products[0].ProductName);

    res.render("list-product-page", { layout: "admin", products: products.map((p) => p.toJSON()) });
  },

  addProduct: async (req, res) => {
    const { ProductName, Price, Detail, CategoryID } = req.body;
    const newProduct = await Product.create({
      ProductName,
      Price,
      Detail,
      CategoryID,
    });

    if (req.file) {
      // //rename image to productID
      const oldPath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
      const newPath = path.join(__dirname, `../../public/images/products/${newProduct.ProductID}.jpg`);
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
      });
    }
    res.render("add-product-page", { layout: "admin", message: "Add product successfully" });
  },

  updateProduct: async (req, res) => {
    //url = /admin/product/edit/:id
    const ProductID = req.params.id;
    console.log(ProductID);

    const { ProductName, Price, Detail, CategoryID } = req.body;
    const product = await Product.findByPk(ProductID);
    product.ProductName = ProductName;
    product.Price = Price;
    product.Detail = Detail;
    product.CategoryID = CategoryID;
    await product.save();

    if (req.file) {
      // //rename image to productID
      const oldPath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
      const newPath = path.join(__dirname, `../../public/images/products/${product.ProductID}.jpg`);
      fs.rename(oldPath, newPath, function (err) {
        if (err) throw err;
      });
    }

    res.redirect("/admin/product/list");
  },
};

module.exports = adminProductController;
