const getCartPage = async (req, res) => {
  try {
    return res.render("cart");
  } catch (error) {
    console.log(error);
  }
};
const getCheckoutPage = async (req, res) => {
  try {
    return res.render("checkout");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getCartPage,
  getCheckoutPage,
};
