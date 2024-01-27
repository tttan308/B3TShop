const db = require("../models");
const Cart = db.carts;
const CartItem = db.cartItems;
const jwt = require("jsonwebtoken");
const User = db.users;
const Product = db.products;
const https = require("https");
const fetch = require("node-fetch");

const agent = new https.Agent({
  rejectUnauthorized: false,
});

const cartController = {
  addCart: async (req, res) => {
    try {
      const { productId, quantity } = req.body;

      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login");
      }

      const user = await User.findOne({
        where: {
          Username: username,
        },
      });

      if (!user) {
        return res.redirect("/auth/login");
      }

      const cart = await Cart.findOne({
        where: {
          UserID: user.UserID,
        },
      });

      if (!cart) {
        const newCart = await Cart.create({
          UserID: user.UserID,
          DateCreated: new Date(),
        });

        await CartItem.create({
          CartID: newCart.CartID,
          ProductID: parseInt(productId),
          Quantity: parseInt(quantity),
        });

        console.log("Add to cart successfully");

        return res.status(200).send("Add to cart successfully");
      } else {
        const cartItem = await CartItem.findOne({
          where: {
            CartID: cart.CartID,
            ProductID: parseInt(productId),
          },
        });

        console.log(cartItem);

        if (!cartItem) {
          await CartItem.create({
            CartID: cart.CartID,
            ProductID: parseInt(productId),
            Quantity: parseInt(quantity),
          });
        } else {
          await CartItem.update(
            {
              Quantity: cartItem.Quantity + parseInt(quantity),
            },
            {
              where: {
                CartID: cart.CartID,
                ProductID: parseInt(productId),
              },
            }
          );
        }
      }

      return res.status(200).send("Add to cart successfully");
    } catch (error) {
      console.log(error);
    }
  },

  getCartPage: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login");
      }

      const user = await User.findOne({
        where: {
          Username: username,
        },
      });

      if (!user) {
        return res.redirect("/auth/login");
      }

      const cart = await Cart.findOne({
        where: {
          UserID: user.UserID,
        },
      });

      if (!cart) {
        return res.render("cart", {
          isLoggedIn: !!token,
          username: username,
          cartItems: [],
        });
      }

      const cartItems = await CartItem.findAll({
        where: {
          CartID: cart.CartID,
        },
      });

      const result = [];

      // trong mỗi cartItem, lấy ra thông tin của sản phẩm qua ProductID,
      //result chỉ lấy ẢNH SẢN PHẨM	TÊN SẢN PHẨM	GIÁ SẢN PHẨM	SỐ LƯỢNG	THÀNH TIỀN\
      for (let i = 0; i < cartItems.length; i++) {
        const product = await Product.findByPk(
          cartItems[i].dataValues.ProductID
        );
        if (!product) {
          continue;
        }
        const safeData = Object.assign({}, product.dataValues);
        result.push({
          ...safeData,
          Quantity: cartItems[i].Quantity,
        });
      }
      console.log(result);

      return res.render("cart", {
        isLoggedIn: !!token,
        username: username,
        cartItems: result,
      });
    } catch (error) {
      console.log(error);
    }
  },

  getCartItemsDetail: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login");
      }

      const user = await User.findOne({
        where: {
          Username: username,
        },
      });

      if (!user) {
        return res.redirect("/auth/login");
      }

      const cart = await Cart.findOne({
        where: {
          UserID: user.UserID,
        },
      });

      if (!cart) {
        return [];
      }

      const cartItems = await CartItem.findAll({
        where: {
          CartID: cart.CartID,
        },
      });

      const result = [];

      // trong mỗi cartItem, lấy ra thông tin của sản phẩm qua ProductID,
      //result chỉ lấy ẢNH SẢN PHẨM	TÊN SẢN PHẨM	GIÁ SẢN PHẨM	SỐ LƯỢNG	THÀNH TIỀN\
      for (let i = 0; i < cartItems.length; i++) {
        const product = await Product.findByPk(
          cartItems[i].dataValues.ProductID
        );
        if (!product) {
          continue;
        }
      }
    } catch (error) {
      console.log(error);
    }
  },

  getAllPriceInCartItems: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;

      return result;
    } catch (error) {
      console.log(error);
    }
  },

  getAllPriceInCartItems: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login");
      }

      const user = await User.findOne({
        where: {
          Username: username,
        },
      });

      if (!user) {
        return res.redirect("/auth/login");
      }

      const cart = await Cart.findOne({
        where: {
          UserID: user.UserID,
        },
      });

      if (!cart) {
        return 0;
      }

      const cartItems = await CartItem.findAll({
        where: {
          CartID: cart.CartID,
        },
      });

      let totalPrice = 0;

      // trong mỗi cartItem, lấy ra thông tin của sản phẩm qua ProductID,
      //result chỉ lấy ẢNH SẢN PHẨM	TÊN SẢN PHẨM	GIÁ SẢN PHẨM	SỐ LƯỢNG	THÀNH TIỀN\
      for (let i = 0; i < cartItems.length; i++) {
        const product = await Product.findByPk(
          cartItems[i].dataValues.ProductID
        );
        if (!product) {
          continue;
        }
        const safeData = Object.assign({}, product.dataValues);
        totalPrice += safeData.Price * cartItems[i].Quantity;
      }

      return totalPrice;
    } catch (error) {
      console.log(error);
    }
  },

  getCheckoutPage: async (req, res) => {
    // Gửi request lên payment-system ở host 5000 để lấy thông tin tài khoản ngân hàng
    // gửi kèm token và số tiền cần thanh toán
    // nhận về thông tin tài khoản ngân hàng
    // render ra trang checkout
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;

      if (!token) {
        return res.redirect("/auth/login");
      }

      const user = await User.findOne({
        where: {
          Username: username,
        },
      });

      if (!user) {
        return res.redirect("/auth/login");
      }

      const response = await fetch("https://localhost:5000/payment", {
        method: "POST",
        body: JSON.stringify({
          amount: totalPriceInCartItems,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        agent,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const paymentAccounts = await response.json();

      return res.render("checkout", {
        isLoggedIn: !!token,
        username: username,
        paymentAccounts,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = cartController;
