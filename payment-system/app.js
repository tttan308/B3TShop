const express = require('express');
const bodyParser = require('body-parser');
const { engine } = require("express-handlebars");
const handlebars = require('handlebars');
const app = express();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.use(express.json());

// Template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");

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
