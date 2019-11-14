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
var options;
if (process.env.JAWSDB_URL) {
  options = process.env.JAWSDB_URL;
} else {
  options = {
    host: config.host,
    port: 3306,
    user: config.username,
    password: config.password,
    database: config.database
  }
}
var sessionStore = new MySQLStore(options);
app.use(session({
  // Secret should be a random string
  secret: 'kladjaojlqeppacan',
  resave: false,
  store: sessionStore,
  saveUninitialized: false,
  // If using HTTPS make sure to uncomment the line below *
  cookie: { secure: true }
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