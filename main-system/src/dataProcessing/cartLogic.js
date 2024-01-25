const Cart = require("../models/cartModel");
const CartDetail = require("../models/cartDetailModel");
const Product = require("../models/productModel");

module.exports = {
  getCart: async (cartId) => {
    const cart = await Cart.findById(cartId);
    return cart;
  },

  getCartByUserId: async (userId) => {
    const cart = await Cart.findOne({ UserID: userId });
    return cart;
  },

  getCartDetail: async (cartId) => {
    const cartDetail = await CartDetail.find({ CartID: cartId });
    return cartDetail;
  },

  getCartDetailByUserId: async (userId) => {
    const cart = await Cart.findOne({ UserID: userId });
    const cartDetail = await CartDetail.find({ CartID: cart.CartID });
    return cartDetail;
  },

  addProductToCart: async (cartId, productId, quantity) => {
    const cartDetail = await CartDetail.findOne({ CartID: cartId, ProductID: productId });
    if (cartDetail) {
      cartDetail.Quantity += quantity;
      await cartDetail.save();
    } else {
      const cartDetail = new CartDetail({
        CartID: cartId,
        ProductID: productId,
        Quantity: quantity,
      });
      await cartDetail.save();
    }
  },

  updateProductInCart: async (cartId, productId, quantity) => {
    const cartDetail = await CartDetail.findOne({ CartID: cartId, ProductID: productId });
    if (cartDetail) {
      cartDetail.Quantity = quantity;
      await cartDetail.save();
    }
  },

  deleteProductInCart: async (cartId, productId) => {
    const cartDetail = await CartDetail.findOne({ CartID: cartId, ProductID: productId });
    if (cartDetail) {
      await cartDetail.remove();
    }
  },

  deleteCart: async (cartId) => {
    const cart = await Cart.findById(cartId);
    if (cart) {
      await cart.remove();
    }
  },

  deleteCartDetail: async (cartId) => {
    const cartDetail = await CartDetail.find({ CartID: cartId });
    if (cartDetail) {
      await cartDetail.remove();
    }
  },

  deleteCartDetailByProductId: async (cartId, productId) => {
    const cartDetail = await CartDetail.findOne({ CartID: cartId, ProductID: productId });
    if (cartDetail) {
      await cartDetail.remove();
    }
  },

  deleteCartDetailByCartId: async (cartId) => {
    const cartDetail = await CartDetail.find({ CartID: cartId });
    if (cartDetail) {
      await cartDetail.remove();
    }
  },

  deleteCartDetailByProductId: async (cartId, productId) => {
    const cartDetail = await CartDetail.findOne({ CartID: cartId, ProductID: productId });
    if (cartDetail) {
      await cartDetail.remove();
    }
  },
};
