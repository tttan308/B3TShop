const getProductPage = async (req, res) => {
  try {
    return res.render("product");
  } catch (error) {
    console.log(error);
  }
};
const getDetailProductPage = async (req, res) => {
  try {
    return res.render("detail_product");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getProductPage,
  getDetailProductPage,
};
