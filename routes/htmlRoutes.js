var db = require("../models");

module.exports = function (app) {
  // Chat page for learning socket io
  app.get("/chat", function(req, res) {
    res.render("chat");
  })

  // Load index page
  app.get("/", function (req, res) {
    if (req.isAuthenticated()) {
      var userID;
      if (req.user.user_id) {
        userID = req.user.user_id;
      } else {
        userID = req.user;
      }
      db.Profile.update({
        room: "waiting",
        match: "none"
      },
      {
        where: {
          id: userID
        }
      })
    }

      res.render("index", data = {
        isAuthenticated: req.isAuthenticated()
      });
  });

  // Render info page
  app.get("/info", function (req, res) {
    if (req.isAuthenticated()) {
      var userID;
      if (req.user.user_id) {
        userID = req.user.user_id;
      } else {
        userID = req.user;
      }
      db.Profile.update({
        room: "waiting",
        match: "none"
      },
      {
        where: {
          id: userID
        }
      })
    }

    res.render("info", data = {
      isAuthenticated: req.isAuthenticated()
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};