const express = require("express");
const { connect } = require("mongoose");
const exphbs = require("express-handlebars");
const HANDLEBARS = require("handlebars");
const app = express();
const moment = require("helper-moment");
const session = require("express-session");
const flash = require("connect-flash");
const cookieParser = require("cookie-parser");
const passport = require("passport");
// console.log(moment);
require("./config/passport")(passport);
//passport middleware

//register handlebars helper for core js
HANDLEBARS.registerHelper("mimetype", (obj) => {
  if (
    obj === "video/webm" ||
    obj === "video/mp4" ||
    obj === "video/x-matroska"
  ) {
    return obj;
  }
});

// HANDLEBARS.registerHelper("removeFirst6Char", (str) => {
//   let TrimValue = [...str].splice(6).join("");
//   return new HANDLEBARS.SafeString(TrimValue);
// });
HANDLEBARS.registerHelper("slice", (str) => {
  return str.slice(6);
});

require("dotenv").config();
const { DB } = require("./config/index");
//==middleware start here
app.engine("handlebars", exphbs({}));
app.set("view engine", "handlebars");
//==db conn
//let db_url = "mongodb://localhost:27017/photo-gallery";
//let db_url =
//"mongodb+srv://prodeskuser:prodeskpass021@prodeskcluster.9gaqm.mongodb.net/photo-gallery?retryWrites=true&w=majority";
connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  (err) => {
    if (err) throw err;
    console.log("db connected");
  }
);
//==serve static file
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/node_modules"));
//==url encodded
app.use(express.urlencoded({ extended: true }));

//conect flash and cookie-parser session middleware
app.use(cookieParser("secret"));
app.use(
  session({
    secret: "mysecretstring",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
//set global variable
app.use(function (req, res, next) {
  res.locals.SUCCESS_MESSAGE = req.flash("SUCCESS_MESSAGE");
  res.locals.ERROR_MESSAGE = req.flash("ERROR_MESSAGE");
  res.locals.error = req.flash("error");
  res.locals.user = req.user || null;
  next();
});

//basic home routes
app.get("/", (req, res) => {
  res.render("home");
  res.redirect("/gallery/public", 301, () => {});
});
//Gallery Routing
app.use("/gallery", require("./Routes/gallery"));
//auth routing
app.use("/auth", require("./Routes/auth"));

app.listen(4000, (err) => {
  if (err) throw err;
  console.log("Server at 4000");
});
