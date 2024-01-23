const getHomePage = async (req, res) => {
  try {
    return res.render("home");
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getHomePage,
};
