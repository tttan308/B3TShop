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
    const detail = await Order.findByPk(req.params.id, {
      include: [
        {
          model: db.users,
          as: "User",
          attributes: [
            "FullName",
            "Address",
          ],
        },
        {
          model: db.orderdetails,
          as: "OrderDetails",
          include: [
            {
              model: db.products,
              as: "Product",
              attributes: ["ProductName", "Price"],
            },
          ],
        },
      ],
    });

    return res.render("order-detail", {
      layout: "admin",
      order: detail.toJSON(),
    });
  },


  deleteOrder: async (req, res) => {
    const id = req.params.id;
    const order = await Order.findByPk(id);
    await order.destroy();
    res.send(order.toJSON());
  }
}
