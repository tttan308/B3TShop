const Product = require("../models/Product");
const OrderDetail = require("../models/OrderDetail");

module.exports = {
  getProducts: async (categoryId, searchText, { minPrice, maxPrice }, pageNumber, pageSize) => {
    const query = {};
    if (categoryId) {
      query.CategoryID = categoryId;
    }
    if (searchText) {
      query.Name = { $regex: searchText, $options: "i" };
    }
    if (minPrice && maxPrice) {
      query.Price = { $gte: minPrice, $lte: maxPrice };
    }
    const totalProducts = await Product.countDocuments(query);
    const totalPage = Math.ceil(totalProducts / pageSize);

    //get product(name, price, image)
    const products = await Product.find(query)
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select("ProductName Price ImageURL");

    return { pageNumber, pageSize, totalPage, totalProducts, products };
  },

  //product detail
  getProductDetail: async (productId) => {
    const product = await Product.findById(productId);
    return product;
  },

  getTopFiveSellingProduct: async () => {
    const topSellingProduct = await OrderDetail.aggregate([
      {
        $group: {
          _id: "$ProductID",
          totalQuantity: { $sum: "$Quantity" },
        },
      },
      {
        $sort: { totalQuantity: -1 },
      },
      {
        $limit: 5,
      },
    ]);
    return topSellingProduct;
  },

  getRelatedProduct: async (product) => {
    const relatedProducts = await Product.find({
      CategoryID: product.CategoryID,
      _id: { $ne: productId },
    }).limit(8);
    return relatedProducts;
  },

  //create product
  createProduct: async (product) => {
    const newProduct = await Product.create(product);
    return newProduct;
  },

  //update product
  updateProduct: async (productId, product) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, product, {
      new: true,
    });
    return updatedProduct;
  },

  updateProductImage: async (productId, imageURL) => {},

  //delete product
  deleteProduct: async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    //TODO: Delete image
    return deletedProduct;
  },
};
