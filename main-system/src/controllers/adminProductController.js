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
    res.render("edit-product-page", { layout: "admin", product: product });
  },

  getListProductPage: async (req, res) => {
    //include category
    const products = await Product.findAll({
      include: [
        {
          model: db.categories,
          as: "Category",
          attributes: ["CategoryName"],
        },
      ],
    });

    res.render("list-product-page", { layout: "admin", products: products });
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

  updateProduct: async (req, res) => {
    //productID = :id
    const { ProductID } = req.params;

    const { ProductName, Price, Detail, CategoryID } = req.body;
    const product = await Product.findByPk(ProductID);
    product.ProductName = ProductName;
    product.Price = Price;
    product.Detail = Detail;
    product.CategoryID = CategoryID;
    await product.save();

    // //rename image to productID
    const oldPath = path.join(__dirname, `../../public/images/products/${req.file.filename}`);
    const newPath = path.join(__dirname, `../../public/images/products/${product.ProductID}.jpg`);
    fs.rename(oldPath, newPath, function (err) {
      if (err) throw err;
      console.log("File Renamed.");
    });

    res.redirect("/admin/product/list");
  },
};

module.exports = adminProductController;
