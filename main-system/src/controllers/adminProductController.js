const db = require("../models");
const Product = db.products;
const fs = require("fs");
const path = require("path");

const adminProductController = {
  getAddProductPage: async (req, res) => {
    res.render("add-product-page", { layout: "admin" });
  },
  getListProductPage: async (req, res) => {
    res.render("list-product-page", { layout: "admin" });
  },

  addProduct: async (req, res) => {
    const { ProductName, Price, Detail, CategoryID } = req.body;
    const newProduct = await Product.create({
      ProductName,
      Price,
      Detail,
      CategoryID,
    });

    // //rename image to productID
    const oldPath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
    const newPath = path.join(__dirname, `../../public/images/products/${newProduct.ProductID}.jpg`);
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      console.log("File Renamed.");
    });

    res.render("add-product-page", { layout: "admin", message: "Add product successfully" });
  },
};

module.exports = adminProductController;
