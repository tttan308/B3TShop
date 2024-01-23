const express = require("express");
const initWebRoute = require("./routers/web");
const { engine } = require("express-handlebars");

require("dotenv").config();
const app = express();
const port = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./views");
app.use(express.static("public"));

initWebRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
