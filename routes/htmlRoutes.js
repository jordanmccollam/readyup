var db = require("../models");

module.exports = function (app) {
  // Load index page
  app.get("/", function (req, res) {
      res.render("index", data = {
        isAuthenticated: req.isAuthenticated()
      });
  });

  // Render info page
  app.get("/info", function (req, res) {
    res.render("info");
  });

  // Render 404 page for any unmatched routes
  app.get("*", function (req, res) {
    res.render("404");
  });
};