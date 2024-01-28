const db = require("../models");
const Cart = db.carts;
const CartItem = db.cartItems;
const jwt = require("jsonwebtoken");
const User = db.users;
const Product = db.products;
const https = require("https");

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
      const shoppingCart = await cartController.getCartItemsDetail(req, res);
      const totalPriceInCartItems = await cartController.getAllPriceInCartItems(req, res);
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

      return res.render("cart", {
        isLoggedIn: !!token,
        username: username,
        cartItems: result,
        shoppingCart: shoppingCart,
        totalPriceInCartItems: totalPriceInCartItems,
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
        const safeData = Object.assign({}, product.dataValues);
        result.push({
          ...safeData,
          Quantity: cartItems[i].Quantity,
        });
      }


      return result;
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
        return res.redirect("/auth/login");
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
        const safeData1 = Object.assign({}, product.dataValues);
        result.push({
          ...safeData1,
          Quantity: cartItems[i].Quantity,
        });
      }

      const totalPriceInCartItems = await cartController.getAllPriceInCartItems(req, res);
      const shoppingCart = await cartController.getCartItemsDetail(req, res);
      let safeData = Object.assign({}, user.dataValues);
      return res.render("checkout", {
        isLoggedIn: !!token,
        username: username,
        user: safeData,
        cartItems: result,
        totalPriceInCartItems: totalPriceInCartItems,
        shoppingCart: shoppingCart,
      });
    } catch (error) {
      console.log(error);
    }
  },

  updateCart: async (req, res) => {
    // data từ client: {productId, quantity}
    try {
      // [ { productId: 43, quantity: 1 }, { productId: 53, quantity: 4 } ]
      // Lấy ra hết các productId và quantity
      const newCartItems = req.body;

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

      console.log(cart);

      if (!cart) {
        return res.redirect("/auth/login");
      }

      // Xóa hết các cartItem cũ
      await CartItem.destroy({
        where: {
          CartID: cart.CartID,
        },
      });

      // Thêm các cartItem mới, nếu quantity = 0 thì không thêm
      for (let i = 0; i < newCartItems.length; i++) {
        if (newCartItems[i].quantity === 0) {
          continue;
        }

        await CartItem.create({
          CartID: cart.CartID,
          ProductID: parseInt(newCartItems[i].productId),
          Quantity: parseInt(newCartItems[i].quantity),
        });
      }


      console.log("Update cart successfully");
      return res.status(200).send("Update cart successfully");
    } catch (error) {
      console.log(error);
    }
  },

  deleteCart: async (req, res) => {
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
        return res.redirect("/auth/login");
      }

      await CartItem.destroy({
        where: {
          CartID: cart.CartID,
        },
      });

      console.log("Delete cart successfully");
      return res.status(200).send("Delete cart successfully");
    } catch (error) {
      console.log(error);
    }
  },

  getAmountToPay: async (req, res) => {
    try {
      const token = req.cookies.accessToken;
      const username = token ? jwt.decode(token).username : null;
      const amountToPay = await cartController.getAllPriceInCartItems(req, res);
      
      //token-payment chứa username, amountToPay
      const token_payment = jwt.sign( {username: username, amountToPay: amountToPay}, process.env.JWT_SECRET , { expiresIn: 60 * 60 * 24 * 30 } );

      return res.status(200).send(token_payment);
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports = cartController;
