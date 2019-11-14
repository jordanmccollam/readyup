require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");
var path = require("path");
var env = process.env.NODE_ENV || "development";
var config = require(__dirname + "/config/config.json")[env];

var db = require("./models");

// Auth Packages
var session = require("express-session");
var passport = require("passport");
var LocalStrategy = require('passport-local').Strategy;
var MySQLStore = require('express-mysql-session')(session);
var bcrypt = require("bcrypt");


var app = express();
var PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({
  extended: false
}));
app.use(express.json());
app.use(express.static("public"));

// Middleware for Authentication
  var options = {
    host: "kavfu5f7pido12mr.cbetxkdyhwsb.us-east-1.rds.amazonaws.com",
    port: 3306,
    user: "duj3hj41l7leydji",
    password: "osa5lial2f22x1nl",
    database: "c3reychmec54nnqc"
  }

var sessionStore = new MySQLStore(options);
app.use(session({
  // Secret should be a random string
  secret: 'kladjaojlqeppacan',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
  // If using HTTPS make sure to uncomment the line below *
  // cookie: { secure: true }
}));
app.use(passport.initialize());
app.use(passport.session());

// Handlebars
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
require("./routes/apiRoutes")(app);
require("./routes/authRoutes")(app, passport);
require("./routes/htmlRoutes")(app);

passport.use(new LocalStrategy(
  function (username, password, done) {
    console.log(username);
    console.log(password);
    db.Profile.findAll({
      where: {
        username: username
      }
    }).then(function (data) {

      if (data.length === 0) {
        done(null, false);
      } else {
        const hash = data[0].password;
        bcrypt.compare(password, hash, function (err, response) {
          if (response) {
            return done(null, {
              user_id: data[0].id
            });
          } else {
            return done(null, false);
          }
        })
      }
    });
  }
));

var syncOptions = {
  force: false
};

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function () {
  app.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;