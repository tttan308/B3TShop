const db = require("../models");
const Order = db.orders;
const jwt = require("jsonwebtoken");



module.exports = {
  getOrderPage: async (req, res) => {
    const name = req.query.name || "";

    //rename User.FullName to UserFullName
    const orders = await Order.findAll({
      include: [
        {
          model: db.users,
          as: "User",
          attributes: ["FullName"],
        },
      ],
      where: {
        "$User.FullName$": {
          [db.Sequelize.Op.like]: `%${name}%`,
        },
      },
      order: [["OrderDate", "DESC"]],
    });

    return res.render("order-manage", {
      layout: "admin",
      orders: orders.map((o) => o.toJSON()),
    });

  },

  getOrderDetailPage: async (req, res) => {
    const id = req.params.id; 
    const order = await Order.findByPk(id);
    const products = await order.getProducts();
    const user = await order.getUser();
    const orderProducts = products.map((p) => p.toJSON());
    const orderUser = user.toJSON();
    const orderInfo = order.toJSON();
    const orderDetail = {
      ...orderInfo,
      User: orderUser,
      Products: orderProducts,
    };
    return res.render("order-detail", {
      layout: "admin",
      order: orderDetail,
    });
  },


  deleteOrder: async (req, res) => {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    await order.destroy();
    res.send(order.toJSON());
  }
}
