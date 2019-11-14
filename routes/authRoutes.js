var db = require("../models");

// Using BCRYPT so that users password is hashed in our database
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (app, passport) {

  // Dummy page for testing features
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
          if (otherUsersData[i].room === "rocketLeague" && otherUsersData[i].id !== userID) {
            rlPlayers.push(otherUsersData[i]);
          } else if (otherUsersData[i].room === "fortnite" && otherUsersData[i].id !== userID) {
            fortnitePlayers.push(otherUsersData[i]);
          } else if (otherUsersData[i].room === "cod" && otherUsersData[i].id !== userID) {
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
            match: currentUserData.match
          },
          rlPlayers: rlPlayers,
          fortnitePlayers: fortnitePlayers,
          codPlayers: codPlayers
        }
        res.render("queue", data);
      })
    });
  });

  // Match
  app.post("/rlmatch", function(req, res) {
    var userID;
    if (req.user.user_id) {
      userID = req.user.user_id
    } else {
      userID = req.user
    }

    db.Profile.findAll({
      where: {
        room: "rocketLeague"
      }
    }).then(function(data) {
      db.Profile.findOne({
        where: {
          id: userID
        }
      }).then(function(currentUserData) {
        var users = [];
  
        for (var i = 0; i < data.length; i++) {
          if (data[i].id !== userID) {
            users.push(data[i]);
          }
        }
  
        for (var x = 0; x < users.length; x++) {
          if (users[x].rl_rank === currentUserData.rl_rank) {
  
            db.Profile.update({
              match: users[x].username
            },
            {
              where: {
                id: userID
              }
            })
          } else {
            db.Profile.update({
              match: "none"
            },
            {
              where: {
                id: userID
              }
            })
          }
  
        }
      })
    })
  });

  app.post("/codmatch", function(req, res) {
    var userID;
    if (req.user.user_id) {
      userID = req.user.user_id
    } else {
      userID = req.user
    }

    db.Profile.findAll({
      where: {
        room: "cod"
      }
    }).then(function(data) {
      db.Profile.findOne({
        where: {
          id: userID
        }
      }).then(function(currentUserData) {
        var users = [];
  
        for (var i = 0; i < data.length; i++) {
          if (data[i].id !== userID) {
            users.push(data[i]);
          }
        }
  
        for (var x = 0; x < users.length; x++) {
          if (users[x].cod_rank === currentUserData.cod_rank) {
  
            db.Profile.update({
              match: users[x].username
            },
            {
              where: {
                id: userID
              }
            })
          } else {
            db.Profile.update({
              match: "none"
            },
            {
              where: {
                id: userID
              }
            })
          }
  
        }
      })
    })
  });

  app.post("/fortnitematch", function(req, res) {
    var userID;
    if (req.user.user_id) {
      userID = req.user.user_id
    } else {
      userID = req.user
    }

    db.Profile.findAll({
      where: {
        room: "fortnite"
      }
    }).then(function(data) {
      db.Profile.findOne({
        where: {
          id: userID
        }
      }).then(function(currentUserData) {
        var users = [];
  
        for (var i = 0; i < data.length; i++) {
          if (data[i].id !== userID) {
            users.push(data[i]);
          }
        }
  
        for (var x = 0; x < users.length; x++) {
          if (users[x].fortnite_rank === currentUserData.fortnite_rank) {
  
            db.Profile.update({
              match: users[x].username
            },
            {
              where: {
                id: userID
              }
            })
          } else {
            db.Profile.update({
              match: "none"
            },
            {
              where: {
                id: userID
              }
            })
          }
  
        }
      })
    })
  });

  app.post("/resetMatch", function(req, res) {
    var userID;
    if (req.user.user_id) {
      userID = req.user.user_id
    } else {
      userID = req.user
    }
    db.Profile.update({
      match: "none"
    },
    {
      where: {
        id: userID
      }
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

  // Edit profile
  app.post("/editProfile", function (req, res) {
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
    }).then(function (data) {
      // If username is blank, use pre-existing
      var usernameValue;
      if (req.body.username.length === 0) {
        usernameValue = data.username;
      } else {
        usernameValue = req.body.username;
      }

      db.Profile.update({
        username: usernameValue,
        console: req.body.console,
        rl_rank: req.body.rl_rank,
        fortnite_rank: req.body.fortnite_rank,
        cod_rank: req.body.cod_rank,
        room: "waiting",
        match: "none"
      }, {
        where: {
          id: userID
        }
      }).then(function (data) {
        res.redirect("/queue");
      })
    });
  });

  // Update room
  app.post("/updateRoom", function (req, res) {
    var userID;
    if (req.user.user_id) {
      userID = req.user.user_id
    } else {
      userID = req.user
    }
    db.Profile.update({
      room: req.body.room
    }, {
      where: {
        id: userID
      }
    });
  })


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