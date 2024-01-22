const customErr = require("../models/customErr");

const getHomePage = async (req, res) => {
  try {
    return res.render("home", {
      isLogin: false,
    });
  } catch (error) {
    next(new customErr(error.message, 505));
  }
};
const getContractPage = async (req, res) => {
  try {
    return res.render("contact");
  } catch (error) {
    next(new customErr(error.message, 505));
  }
};
module.exports = {
  getHomePage,
  getContractPage,
};
