$(document).ready(function () {

    // Variables ********************************************************
    var userLoggedIn;
    var newUser;
    var userLoggingIn;

    // CLICK EVENTS ***************************************************
    // Login Button
    $("#loginBtn").on("click", function () {
        event.preventDefault();

        $("#errorMessage").hide();
        $("#loginModal").modal("show");

        $("#loginSubmit").on("click", function () {
            event.preventDefault();
            login();
            clearValues();
        })
    });

    // Create account button || Sign up button
    $("#createBtn").on("click", function () {
        event.preventDefault();

        $("#createModal").modal("show");

        $("#createSubmit").on("click", function () {
            event.preventDefault();
            createAccount();
            clearValues();
        })
    });

    // Logout
    $("#logoutBtn").on("click", function () {
        event.preventDefault();
        logout();
    })

    // Functions *****************************************************************
    function createAccount() {
        newUser = {
            username: $("#createUsername").val(),
            password: $("#createPassword").val(),
            console: $("#createConsole input:radio:checked").val()
        };

        $.post("/newuser", newUser);
        login();
    };

    function login() {
        userLoggedIn = {
            username: $("#loginUsername").val() || $("#createUsername").val(),
            password: $("#loginPassword").val() || $("#createPassword").val(),
            console: $("#loginConsole input:radio:checked").val() || ("#createConsole input:radio:checked").val()
        }

        if (sessionStorage.getItem("loggedIn") === "false" || sessionStorage.getItem("loggedIn") === null) {

            $.post("/login", userLoggedIn, function (data) {
                if (data === "error") {
                    $("#errorMessage").show();
                } else {
                    console.log(userLoggedIn.username);
                    sessionStorage.setItem("userLoggedIn", userLoggedIn.username);
                    sessionStorage.setItem("loggedIn", true);
                    $("#loginModal").modal("hide");
                    $("#createModal").modal("hide");
                }
            });
        }
    }

    function logout() {
        if (sessionStorage.getItem("loggedIn") === "true") {
            var userToLogOut = {
                username: sessionStorage.getItem("userLoggedIn")
            }
            $.post("/logout", userToLogOut);
            sessionStorage.setItem("loggedIn", false);
            sessionStorage.removeItem("userLoggedIn");
            location.reload();
        }
    };

    function clearValues() {
        $("#loginUsername").val("");
        $("#loginPassword").val("");
        $("#createUsername").val("");
        $("#createPassword").val("");
    }

    // END of jQuery
})