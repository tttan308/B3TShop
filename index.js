const express = require("express");
const initWebRoute = require("./routers/web");
const { engine } = require("express-handlebars");
const customErr = require("./models/customErr");
const initProductRoute = require("./routers/product");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");

initWebRoute(app);
initProductRoute(app);

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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
