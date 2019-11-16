var db = require("../models");

// Using BCRYPT so that users password is hashed in our database
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (app, passport) {

  //  Queue page
  app.get("/queue", authenticationMiddleware(), function (req, res) {
    var userID;
    if (req.user.user_id) {
      userID = req.user.user_id
    } else {
      userID = req.user
    }
    db.Profile.findOne({
      where: {
        id: userID
      }
    }).then(function (currentUserData) {
      db.Profile.findAll({
        where: {
          room: ["rocketLeague", "fortnite", "cod"]
        }
      }).then(function (otherUsersData) {
        var rlPlayers = [];
        var fortnitePlayers = [];
        var codPlayers = [];
        for (var i = 0; i < otherUsersData.length; i++) {
          if (otherUsersData[i].room === "rocketLeague") {
            rlPlayers.push(otherUsersData[i]);
          } else if (otherUsersData[i].room === "fortnite") {
            fortnitePlayers.push(otherUsersData[i]);
          } else if (otherUsersData[i].room === "cod") {
            codPlayers.push(otherUsersData[i]);
          }
        }
        var data = {
          currentUser: {
            username: currentUserData.username,
            console: currentUserData.console,
            cod_rank: currentUserData.cod_rank,
            rl_rank: currentUserData.rl_rank,
            fortnite_rank: currentUserData.fortnite_rank,
            room: currentUserData.room,
            match: currentUserData.match,
            id: currentUserData.id
          },
          rlPlayers: rlPlayers,
          fortnitePlayers: fortnitePlayers,
          codPlayers: codPlayers
        }
        res.render("queue", data);
      })
    });
  });

  // Returning User (Login)
  app.post("/login", passport.authenticate("local", {
    successRedirect: "/queue",
    failureRedirect: "/"
  }));

  // Logout
  app.get("/logout", function (req, res) {
    var userID;
    if (req.user.user_id) {
      userID = req.user.user_id
    } else {
      userID = req.user
    }
    db.Profile.update({
      room: "waiting"
    }, {
      where: {
        id: userID
      }
    }).then(function (data) {
      req.logout();
      req.session.destroy();
      res.redirect("/");
    })
  });


  // New user
  app.post("/newuser", function (req, res) {
    var password = req.body.password
    bcrypt.hash(password, saltRounds, function (err, hash) {
      db.Profile.create({
        username: req.body.username,
        password: hash
      }).then(function (data) {

        const user_id = data.id;

        req.login(user_id, function (err) {
          res.redirect("/queue");
        });
      });
    });
  });

  passport.serializeUser(function (user_id, done) {
    done(null, user_id);
  });

  passport.deserializeUser(function (user_id, done) {
    done(null, user_id);
  });

  // Call this function right after the route ("/") to restrict access if not logged in...
  function authenticationMiddleware() {
    return (req, res, next) => {
      console.log(`req.session.passport.user: ${JSON.stringify(req.session.passport)}`);
      if (req.isAuthenticated()) return next();
      res.redirect("/")
    }
  }
};