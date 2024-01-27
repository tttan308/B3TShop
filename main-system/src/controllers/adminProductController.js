const db = require("../models");
const Product = db.products;
const fs = require("fs");
const path = require("path");

const adminProductController = {
  getAddProductPage: async (req, res) => {
    const categories = await db.categories.findAll();
    res.render("add-product-page", { layout: "admin", categories: categories.map((c) => c.toJSON()) });
  },
  getEditProductPage: async (req, res) => {
    const categories = await db.categories.findAll();
    const { id } = req.params;
    const product = await Product.findByPk(id);
    res.render("edit-product-page", { layout: "admin", product: product.toJSON(), categories: categories.map((c) => c.toJSON()) });
  },

  getListProductPage: async (req, res) => {
    const pageSize = 8;
    const page = req.query.page || 1;
    const offset = (page - 1) * pageSize;
    const name = req.query.name || "";

    //get total page
    const total = await Product.count({
      where: {
        ProductName: { [db.Sequelize.Op.like]: `%${name}%` },
      },
    });
    const totalPages = Math.ceil(total / pageSize);

    //sort by name and include category name
    const products = await Product.findAll({
      where: {
        ProductName: { [db.Sequelize.Op.like]: `%${name}%` },
      },
      include: [
        {
          model: db.categories,
          as: "Category",
          attributes: ["CategoryName"],
        },
      ],
      order: [["ProductName", "ASC"]],
      limit: pageSize,
      offset: offset,
    });

    // const products = await Product.findAll({
    //   include: [
    //     {
    //       model: db.categories,
    //       as: "Category",
    //       attributes: ["CategoryName"],
    //     },
    //   ],
    // });

    res.render("list-product-page", { layout: "admin", products: products.map((p) => p.toJSON()), totalPages: totalPages, page: page, name: name });
  },

  addProduct: async (req, res) => {
    const { name, price, quantity, detail, categoryID } = req.body;
    const newProduct = await Product.create({
      ProductName: name,
      Price: price,
      Quantity: quantity,
      Detail: detail,
      CategoryID: categoryID,
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

    const { name, price, quantity, detail, categoryID } = req.body;
    const product = await Product.findByPk(ProductID);
    product.ProductName = name;
    product.Price = price;
    product.Quantity = quantity;
    product.Detail = detail;
    product.CategoryID = categoryID;

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
  deleteProduct: async (req, res) => {
    const id = req.params.id;
    const product = await Product.findByPk(id);
    await product.destroy();
    res.send(product.toJSON());

    //delete image
    const imagePath = path.join(__dirname, `../../public/images/products/${id}.jpg`);
    fs.unlink(imagePath, function (err) {
      if (err) throw err;
    });
  },
};

module.exports = adminProductController;
