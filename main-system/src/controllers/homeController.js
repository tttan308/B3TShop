const customErr = require("../models/customErr");
const jwt = require("jsonwebtoken");
const getHomePage = async (req, res) => {
  const token = req.cookies.accessToken;
  const username = token ? jwt.decode(token).username : null;

  return res.render("home", {
    isLoggedIn: !!token,
    username: username,
  });

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
