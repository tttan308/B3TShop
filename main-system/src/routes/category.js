const express = require("express");
const categoryController = require("../controllers/categoryController");
const route = express.Router();
const { verifyToken } = require("../middlewares/authorMiddleware");

const initCategoryRoute = (app) => {

    app.use("/categories", route);
}

module.exports = initCategoryRoute; 
