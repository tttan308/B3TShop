const express = require('express');
const cors = require("cors");
const { engine } = require("express-handlebars");
const handlebars = require('handlebars');
const app = express();
const cookieParser = require("cookie-parser");

const dotenv = require("dotenv");
dotenv.config();

app.use(cors());
app.use(cookieParser());

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());

// Template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");

//handlebars-helper
handlebars.registerHelper("formatPrice", function (price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
});

handlebars.registerHelper('formatDate', function(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN'); 
});

// Khởi tạo Route
app.get('/', (req, res) => res.render('home'));
const initRoutes = require("./src/routes");
initRoutes(app);

const PORT = process.env.PORT || 5000;

// HTTPS
const https = require('https');
const fs = require('fs');
const options ={
  key: fs.readFileSync('_certs/key.pem'),
  cert : fs.readFileSync('_certs/cert.pem')
};
const httpsServer = https.createServer(options, app);
httpsServer.listen(PORT, () => {
  console.log(`https://localhost:${PORT}`);
});
// app.listen(PORT, () => {
//     console.log(`http://localhost:${PORT}`);
//   });
