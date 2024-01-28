const customErr = require("../models/customErr");
const jwt = require("jsonwebtoken");
const db = require("../models");
const Order = db.orders;
const User = db.users;
const Product = db.products;
const OrderDetail = db.orderDetails;
const Cart = db.carts;
const CartItem = db.cartItems;
const categoryController = require("./categoryController");
const cartController = require("./cartController");

const orderController = {
    getOrderPage: async (req, res) => {
        try {
            const token_payment = req.cookies.payment_token;
            const token = req.cookies.accessToken;
            let username = null;
            let amountToPay = null;
            if (token_payment !== undefined) {
                username = jwt.verify(token_payment, process.env.JWT_SECRET).username || null;
                amountToPay = jwt.verify(token_payment, process.env.JWT_SECRET).amountToPay || null;
            }
            else {
                username = jwt.decode(token).username;
                amountToPay = 0;
            }



            if (!token) {
                return res.redirect("/auth/login");
            }

            const user = await User.findOne({
                where: {
                    Username: username
                }
            });

            const cart = await Cart.findAll({
                where: {
                    UserID: user.UserID
                }
            });

            const cartId = cart[0].CartID;

            // find cartItems with CartID = cart.CartID
            const cartItems = await CartItem.findAll({
                where: {
                    CartID: cartId
                }
            });

            let order = null;
            if (token_payment !== undefined) {
                order = await Order.create({
                    UserID: user.UserID,
                    OrderDate: new Date(),
                    TotalAmount: amountToPay,
                    Status: "Đã thanh toán"
                });

                await OrderDetail.bulkCreate(cartItems.map((cartItem) => {
                    return {
                        OrderID: order.OrderID,
                        ProductID: cartItem.ProductID,
                        Quantity: cartItem.Quantity,
                        Price: cartItem.Price
                    }
                }));
            }

            // Lấy ra toàn bộ order của user
            const orders = await Order.findAll({
                where: {
                    UserID: user.UserID
                }
            });

            let safeData = [];

            safeData = orders.map((order) => {
                return Object.assign({}, order.dataValues);
            });
            const shoppingCart = await cartController.getCartItemsDetail(req, res);
            const categories = await categoryController.getAllCategory(req, res);

            // xóa token_payment
            res.clearCookie("payment_token");
            // Sau khi tất cả đã xong thì xóa cart 
            
            await CartItem.destroy({
                where: {
                    CartID: cartId
                }
            });

            res.render("order", {
                isLoggedIn: !!token,
                username: username,
                categories: categories,
                shoppingCart: shoppingCart,
                orders: safeData
            });
        } catch (error) {
            console.log(error);
        }
    },
};

module.exports = orderController;
