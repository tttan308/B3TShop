const db = require("../models");
const Order = db.orders;
const OrderDetail = db.orderDetails;
const Product = db.products;

module.exports = {
  getTopSellingProductData: async (req, res) => {
    const topSellingProducts = await db.sequelize.query(
      `SELECT
            od."ProductID",
            p."ProductName",
            SUM(od."Quantity") AS "TotalQuantitySold"
        FROM
            "OrderDetails" od
        JOIN
            "Orders" o ON od."OrderID" = o."OrderID"
        JOIN
            "Products" p ON od."ProductID" = p."ProductID"
        WHERE
            o."OrderDate" >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY
            od."ProductID", p."ProductName"
        ORDER BY
            "TotalQuantitySold" DESC
        LIMIT 10;`
    );


    const productNames = topSellingProducts[0].map((p) => {
      return p.ProductName;
    });
    const quantities = topSellingProducts[0].map((p) => {
      return p.TotalQuantitySold;
    });

    const data = {
      productName: productNames,
      quantitiy: quantities,
    };
    

    res.status(200).json(data);
  },

  getRevenueByDayData: async (req, res) => {
    const revenueByDay = await db.sequelize.query(
      `SELECT
          o."OrderDate",
          SUM(od."Quantity" * od."Price") AS TotalIncome
      FROM
          "Orders" o
      JOIN
          "OrderDetails" od ON o."OrderID" = od."OrderID"
      WHERE
          o."OrderDate" >= CURRENT_DATE - INTERVAL '30 days'
      GROUP BY
          o."OrderDate"
      ORDER BY
          o."OrderDate";
      `,
      { type: db.sequelize.QueryTypes.SELECT }
    )

      const date = revenueByDay.map((d) => {
        return d.OrderDate.getDate();
      });
      const revenue = revenueByDay.map((d) => {
        return d.TotalIncome;
      });
      
      const data = {
        date: date,
        revenue: revenue,
      };

    // const data = revenueByDay.map((d) => {
    //   return {
    //     Date: [1, 2]
    //     // Date: d.OrderDate,
    //     // revenue: d.TotalIncome,
    //   };
    // });

    res.status(200).json(data);
  },
};  