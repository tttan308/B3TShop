const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const app = express();

const customErr = require("./src/models/customErr");

// Config
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");

// Routes
const initRoutes = require("./src/routes");
initRoutes(app);

app.use((err, req, res, next) => {
  let sc = 500;
  if (err instanceof customErr) {
    sc = err.statusCode;
  }
  res.status(sc).render("error", {
    layout: false,
    statusCode: sc,
    message: err.message,
    description: err.stack,
  });
});

// Connect to DB
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
