const config = require("../config/connectStr");
require("dotenv").config();
const initOptions = {};
const pgp = require("pg-promise")(initOptions);
const db = pgp(config);
module.exports = db;