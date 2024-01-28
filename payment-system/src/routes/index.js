const initPayment = require("./payment.js");
const initHomeRoute = require("./web.js");

module.exports = (app) => {
    initPayment(app);
    initHomeRoute(app);
}
