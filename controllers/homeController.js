const customErr = require("../models/customErr");

const getHomePage = async (req, res) => {
  try {
    return res.render("home");
  } catch (error) {
    next(new customErr(error.message, 505));
  }
};
module.exports = {
  getHomePage,
};
