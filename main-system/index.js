const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const cookieParser = require("cookie-parser");
const { engine } = require("express-handlebars");
const app = express();
const handlebars = require("handlebars");
const morgan = require("morgan");
const https = require("https");

const customErr = require("./src/models/customErr");
const passport = require("passport");
require("./src/middlewares/passport-gg");
var session = require("express-session");
// Config
app.use(express.static("public"));
app.use(morgan("dev"));
app.use(cors());
app.use(cookieParser());
app.use(express.json());

// Body parser
app.use(express.urlencoded({ extended: true }));

// Template engine
app.engine(".hbs", engine({ extname: ".hbs" }));
app.set("view engine", ".hbs");
app.set("views", "./src/views");

// Session
app.use(
  session({
    secret: "ducba",
    resave: true,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser(async (user, done) => {
  try {
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

handlebars.registerHelper("formatPrice", function (price) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(price);
});

handlebars.registerHelper("calculateOldPrice", function (price, discount) {
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format((price * 100) / (100 - discount));
});

handlebars.registerHelper("ifCond", function (v1, operator, v2, options) {
  switch (operator) {
    case "==":
      return v1 == v2 ? options.fn(this) : options.inverse(this);
    case "===":
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case "<":
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case "<=":
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case ">":
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case ">=":
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
});

handlebars.registerHelper("calculateTotalPrice", function (price, quantity) {
  let totalPrice = price * quantity;
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(totalPrice);
});

handlebars.registerHelper("calculateTotalCartPrice", function (cartItems) {
  let total = 0;
  if (Array.isArray(cartItems)) {
    cartItems.forEach((item) => {
      let price = parseFloat(item.Price);
      total += price * item.Quantity;
    });
  }
  return new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(total);
});

handlebars.registerHelper("calcOldPrice", function (price, discount) {
  const oldPrice = parseFloat(price) / (1 - discount / 100);
  return oldPrice.toFixed(2);
});

handlebars.registerHelper("eachPagination", function (totalPages, options) {
  let result = "";

  for (let i = 1; i <= totalPages; i++) {
    result += options.fn(i);
  }

  return result;
});

handlebars.registerHelper('pagination1', function (currentPage, totalPages, sort, filter, options) {
  let result = '<ul class="list-item clearfix">';

  // Nút Lùi Trang
  if (currentPage > 1) {
    result += `<li><a href="?page=${currentPage - 1}&sort=${sort}&filter=${filter}" title="">Previous</a></li>`;
  }

  for (let i = 1; i <= totalPages; i++) {
    if (i === 1 || i === totalPages || i === currentPage || Math.abs(currentPage - i) <= 3) {
      result += `<li><a href="?page=${i}&sort=${sort}&filter=${filter}" title="">${i}</a></li>`;
    } else if (i === 2 || i === totalPages - 1) {
      result += `<li>...</li>`;
    }
  }

  // Nút Tiến Trang
  if (currentPage < totalPages) {
    const nextPage = parseInt(currentPage) + 1;
    result += `<li><a href="?page=${nextPage}&sort=${sort}&filter=${filter}" title="">Next</a></li>`;
  }

  result += '</ul>';
  return new handlebars.SafeString(result);
});

handlebars.registerHelper('eq', function(arg1, arg2, options) {
  return arg1 == arg2;
});

handlebars.registerHelper('or', function(arg1, arg2, options) {
  return arg1 || arg2;
});

handlebars.registerHelper('not', function(arg1, options) {
  return !arg1;
});

handlebars.registerHelper('formatDate', function(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString('vi-VN'); 
});

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

// HTTPS
const fs = require("fs");
const options = {
  key: fs.readFileSync("_certs/key.pem"),
  cert: fs.readFileSync("_certs/cert.pem"),
};
const httpsServer = https.createServer(options, app);

const port = process.env.PORT || 3000;
// app.listen(port, () => {
//   console.log(`http://localhost:${port}`);
// });

httpsServer.listen(port, () => {
  console.log(`https://localhost:${port}`);
});
