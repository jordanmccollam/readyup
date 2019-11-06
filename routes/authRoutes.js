var db = require("../models");

module.exports = function(app) {

    // New user
    app.post("/newuser", function(req, res) {
        db.Profile.create({
            username: req.body.username,
            password: req.body.password,
            console: req.body.console,
            loggedin: true
        }).then(function(data) {
            res.json(data);
        });
    });

    app.post("/login", function(req, res) {
        db.Profile.findOne({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function(data) {
            if (data) {
                login(req, res);
            } else {
                res.json("error");
            }
        })
    });

    function login(req, res) {
        db.Profile.update({
            console: req.body.console,
            loggedin: true,
            room: "waiting"
        },
        {
            where: {
                username: req.body.username,
                password: req.body.password
            }
        }).then(function(data) {
            res.json(data);
        })
    }

    app.post("/logout", function(req, res) {
        console.log(req.body);
        db.Profile.update({
            loggedin: false,
            room: "waiting"
        },
        {
            where: {
                username: req.body.username,
                loggedin: true
            }
        })
    });
};