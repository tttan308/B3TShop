const getLoginPage = async (req, res) => {
  try {
    return res.render("login", { layout: false });
  } catch (error) {
    console.log(error);
  }
};
const getRegisterPage = async (req, res) => {
  try {
    return res.render("register", { layout: false });
  } catch (error) {
    console.log(error);
  }
};
module.exports = {
  getLoginPage,
  getRegisterPage,
};
