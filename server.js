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
var http = require("http").createServer(app);
var io = require("socket.io")(http);
var PORT = process.env.PORT || 3000;


io.on("connection", function (socket) {

  socket.on("room update", function (newRoom) {
    // io.emit("room update", newRoom);
    db.Profile.update({
      room: newRoom.room,
      match: "none"
    }, {
      where: {
        id: newRoom.id
      }
    }).then(function (data) {
      db.Profile.findOne({
        where: {
          id: newRoom.id
        }
      }).then(function(currentUserData) {
        console.log("Room updated");
        var currentUser = {
          username: currentUserData.username,
            console: currentUserData.console,
            cod_rank: currentUserData.cod_rank,
            rl_rank: currentUserData.rl_rank,
            fortnite_rank: currentUserData.fortnite_rank,
            room: currentUserData.room,
            match: currentUserData.match,
            id: currentUserData.id
        }
        io.emit("room update", currentUser);
      })
    });
  });

  socket.on("profile update", function(profileEdits) {
    db.Profile.findOne({
      where: {
        id: profileEdits.id
      }
    }).then(function(oldUserData) {
      // If username is blank, use pre-existing
      var usernameValue;
      if (profileEdits.username.length === 0) {
        usernameValue = oldUserData.username;
      } else {
        usernameValue = profileEdits.username;
      }

      db.Profile.update({
        username: usernameValue,
        console: profileEdits.console,
        rl_rank: profileEdits.rl_rank,
        fortnite_rank: profileEdits.fortnite_rank,
        cod_rank: profileEdits.cod_rank,
        match: "none"
      },
      {
        where: {
          id: profileEdits.id
        }
      }).then(function(uselessData) {
        db.Profile.findOne({
          where: {
            id: profileEdits.id
          }
        }).then(function(currentUserData) {
          console.log("Profile Edited");
          var currentUser = {
            username: currentUserData.username,
              console: currentUserData.console,
              cod_rank: currentUserData.cod_rank,
              rl_rank: currentUserData.rl_rank,
              fortnite_rank: currentUserData.fortnite_rank,
              room: currentUserData.room,
              match: currentUserData.match,
              id: currentUserData.id
          }
          io.emit("profile update", currentUser);
        })
      })
    })
  });

  // Matching
  socket.on("rl match", function(ownID) {
    db.Profile.findOne({
      where: {id: ownID}
    }).then(function(oldUserData) {
      db.Profile.findAll({
        where: {room: "rocketLeague"}
      }).then(function(RlUsers) {
        var bestMatch;
        var bestMatchID;
        for (var x = 0; x < RlUsers.length; x++) {
          if (RlUsers[x].rl_rank === oldUserData.rl_rank && RlUsers[x].id !== oldUserData.id) {
            bestMatch = RlUsers[x].username;
            db.Profile.update({
              match: bestMatch
            },{
              where: {id: ownID}
            }).then(function() {
              db.Profile.findOne({
                where: {id: ownID}
              }).then(function(currentUserData) {
                io.emit("rl match", currentUserData);
              })
            })
          } else {
            db.Profile.update({
              match: "none"
            },{
              where: {id: ownID}
            }).then(function() {
              db.Profile.findOne({
                where: {id: ownID}
              }).then(function(currentUserData) {
                io.emit("rl match", currentUserData);
              })
            })
          };
        }
      })
    })
  });
  socket.on("cod match", function(ownID) {
    db.Profile.findOne({
      where: {id: ownID}
    }).then(function(oldUserData) {
      db.Profile.findAll({
        where: {room: "cod"}
      }).then(function(codUsers) {
        var bestMatch;

        for (var x = 0; x < codUsers.length; x++) {
          if (codUsers[x].cod_rank === oldUserData.cod_rank && codUsers[x].id !== oldUserData.id) {
            bestMatch = codUsers[x].username;

            db.Profile.update({
              match: bestMatch
            },{
              where: {id: ownID}
            }).then(function() {
              db.Profile.findOne({
                where: {id: ownID}
              }).then(function(currentUserData) {
                io.emit("cod match", currentUserData);
              })
            })
          } else {
            db.Profile.update({
              match: "none"
            },{
              where: {id: ownID}
            }).then(function() {
              db.Profile.findOne({
                where: {id: ownID}
              }).then(function(currentUserData) {
                io.emit("cod match", currentUserData);
              })
            })
          }
        }
      })
    })
  });
  socket.on("fortnite match", function(ownID) {
    db.Profile.findOne({
      where: {id: ownID}
    }).then(function(oldUserData) {
      db.Profile.findAll({
        where: {room: "fortnite"}
      }).then(function(fortniteUsers) {
        var bestMatch;

        for (var x = 0; x < fortniteUsers.length; x++) {
          if (fortniteUsers[x].fortnite_rank === oldUserData.fortnite_rank && fortniteUsers[x].id !== oldUserData.id) {
            bestMatch = fortniteUsers[x].username;

            db.Profile.update({
              match: bestMatch
            },{
              where: {id: ownID}
            }).then(function() {
              db.Profile.findOne({
                where: {id: ownID}
              }).then(function(currentUserData) {
                io.emit("fortnite match", currentUserData);
              })
            })
          } else {
            db.Profile.update({
              match: "none"
            },{
              where: {id: ownID}
            }).then(function() {
              db.Profile.findOne({
                where: {id: ownID}
              }).then(function(currentUserData) {
                io.emit("fortnite match", currentUserData);
              })
            })
          }
        }
      })
    })
  });
});

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

// FOR TESTING USE CODE BELOW (and comment out ^)
// var options = {
//   host: "localhost",
//   port: 3306,
//   user: "jordanM",
//   password: "jojo1997",
//   database: "readyUp_db"
// }

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
require("./routes/authRoutes")(app, passport, io);
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
  http.listen(PORT, function () {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;