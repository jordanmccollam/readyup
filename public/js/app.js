$(document).ready(function () {

    // Variables
    var socket = io();
    var ownID = $(".currentUserId").attr("data-id");


    // Functions called on load
    changeIcon();
    startingSection();
    match();
    
    // SOCKET LISTENERS *********************************************
    socket.on("room update", function(currentUser) {
        var rank;
        var modal = $('<div class="modal" tabindex="-1" role="dialog" id="matchModal-' + currentUser.id + '"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title">Match!</h5><button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body text-center"><p><span id="matchNotification" class="text-success customFont"></span> is your skill level.</p><p>Find each other in game and party up!</p></div><div class="modal-footer"><button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button></div></div></div></div>')
        $("#" + currentUser.id).remove();
        $("#matchModal-" + currentUser.id).remove();
        if (currentUser.room === "rocketLeague") {
            rank = currentUser.rl_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#rlSection").append($(player));
            $("#matchContainer-" + currentUser.id).html($(modal));
        }
        else if (currentUser.room === "cod") {
            rank = currentUser.cod_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#codSection").append($(player));
            $("#matchContainer-" + currentUser.id).html($(modal));
        }
        else if (currentUser.room === "fortnite") {
            rank = currentUser.fortnite_rank
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#fortniteSection").append($(player));
            $("#matchContainer-" + currentUser.id).html($(modal));
        }
        changeIcon();
        match();
    });

    socket.on("profile update", function(currentUser) {
        var rank;
        $("#" + currentUser.id).remove();
        $("#profileBar-" + currentUser.id).remove();
        if (currentUser.room === "rocketLeague") {
            rank = currentUser.rl_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#rlSection").append($(player));
        }
        else if (currentUser.room === "cod") {
            rank = currentUser.cod_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#codSection").append($(player));
        }
        else if (currentUser.room === "fortnite") {
            rank = currentUser.fortnite_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#fortniteSection").append($(player));
        }
        // $("#profileName").html(currentUser.username);
        $("#editProfile-" + currentUser.id).html($("<h1 class='customFont currentUserId profileBar " + currentUser.console + " " + currentUser.rl_rank + " " + currentUser.cod_rank + " " + currentUser.fortnite_rank +  "' data-id='" + currentUser.id + "'><div class='container profileBar'><div class='row profileBar'><div class='col-2 profileBar consoleDisplay'></div><div class='col-2 profileBar'></div><div class='col-4 profileBar' id='profileName'>" + currentUser.username + "</div><div class='col-1 profileBar rlIcon'></div><div class='col-2 profileBar codIcon'></div><div class='col-1 profileBar fortniteIcon'></div></div></div></h1>"));
        changeIcon();
        match(currentUser.match);
    });

    socket.on("rl match", function(currentUser, bestMatchID) {
        var rank;
        $("#" + currentUser.id).remove();
        if (currentUser.room === "rocketLeague") {
            rank = currentUser.rl_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#rlSection").append($(player));
        }
        else if (currentUser.room === "cod") {
            rank = currentUser.cod_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#codSection").append($(player));
        }
        else if (currentUser.room === "fortnite") {
            rank = currentUser.fortnite_rank
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#fortniteSection").append($(player));
        }
        else if (currentUser.room === "waiting") {
            $("#waitingSection-" + currentUser.id).html(player);
        }
        changeIcon();
        notify(bestMatchID);
    });
    socket.on("cod match", function(currentUser) {
        var rank;
        $("#" + currentUser.id).remove();
        if (currentUser.room === "rocketLeague") {
            rank = currentUser.rl_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#rlSection").append($(player));
        }
        else if (currentUser.room === "cod") {
            rank = currentUser.cod_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#codSection").append($(player));
        }
        else if (currentUser.room === "fortnite") {
            rank = currentUser.fortnite_rank
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#fortniteSection").append($(player));
        }
        else if (currentUser.room === "waiting") {
            $("#waitingSection-" + currentUser.id).html(player);
        }
        changeIcon();
        notify();
    });
    socket.on("fortnite match", function(currentUser) {
        var rank;
        $("#" + currentUser.id).remove();
        if (currentUser.room === "rocketLeague") {
            rank = currentUser.rl_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#rlSection").append($(player));
        }
        else if (currentUser.room === "cod") {
            rank = currentUser.cod_rank;
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#codSection").append($(player));
        }
        else if (currentUser.room === "fortnite") {
            rank = currentUser.fortnite_rank
            var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
            $("#fortniteSection").append($(player));
        }
        else if (currentUser.room === "waiting") {
            $("#waitingSection-" + currentUser.id).html(player);
        }
        changeIcon();
        notify();
    });

    // ENTER BUTTONS ***********************************
    $("#enterRl").on("click", function() {
        event.preventDefault();
        var newRoom = {
            room: "rocketLeague",
            id: ownID
        }
        socket.emit("room update", newRoom);
    });
    $("#enterCod").on("click", function() {
        event.preventDefault();
        var newRoom = {
            room: "cod",
            id: ownID
        }
        socket.emit("room update", newRoom);
    });
    $("#enterFortnite").on("click", function() {
        event.preventDefault();
        var newRoom = {
            room: "fortnite",
            id: ownID
        }
        socket.emit("room update", newRoom);
    });
    $("#leaveQueues").on("click", function() {
        event.preventDefault();
        var newRoom = {
            room: "waiting",
            id: ownID
        }
        socket.emit("room update", newRoom);
    });

    // Edit profile *********************************************************
    $("#editProfile-" + ownID).on("click", function() {
        event.preventDefault();
        $("#editModal").modal("show");
    });

    $("#editSubmit").on("click", function() {
        event.preventDefault();
        var profileEdits = {
            username: $("#editUsername").val(),
            console: $("#editConsole").val(),
            rl_rank: $("#rl_rank").val(),
            cod_rank: $("#cod_rank").val(),
            fortnite_rank: $("#fortnite_rank").val(),
            id: ownID
        };
        socket.emit("profile update", profileEdits);
        $("#editUsername").val("");
        $("#editModal").modal("hide");
    });

    // Change Sections **********************************************************
    function startingSection() {
        if ($("#" + ownID).hasClass("rocketLeague")) {
            $("#rlSection").append($("#" + ownID));
        } else if ($("#" + ownID).hasClass("cod")) {
            $("#codSection").append($("#" + ownID));
        } else if ($("#" + ownID).hasClass("fortnite")) {
            $("#fortniteSection").append($("#" + ownID));
        }

        var newRoom = {
            room: "waiting",
            id: ownID
        }
        socket.emit("room update", newRoom);
    };

    function match() {
        if ($("#" + ownID).hasClass("rocketLeague")) {
            socket.emit("rl match", ownID);
        } else if ($("#" + ownID).hasClass("cod")) {
            socket.emit("cod match", ownID);
        } else if ($("#" + ownID).hasClass("fortnite")) {
            socket.emit("fortnite match", ownID);
        } else if ($("#" + ownID).hasClass("waiting")) {
            socket.emit("rl match", ownID);
        }
    };

    function notify() {
        if ($("#" + ownID).attr("match") !== "none") {
            $("#matchNotification").html($("#" + ownID).attr("match"));
            $("#matchModal-" + ownID).modal("show");
            $("#" + ownID).attr("match", "none");
        }
    }

    
    function changeIcon() {
        // ROCKET LEAGUE RANK ICONS
        $(".bronze1").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlBronze1.png' width='35'>");
        $(".bronze2").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlBronze2.png' width='35'>");
        $(".bronze3").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlBronze3.png' width='35'>");
        $(".silver1").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlSilver1.png' width='35'>");
        $(".silver2").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlSilver2.png' width='35'>");
        $(".silver3").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlSilver3.png' width='35'>");
        $(".gold1").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlGold1.png' width='35'>");
        $(".gold2").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlGold2.png' width='35'>");
        $(".gold3").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlGold3.png' width='35'>");
        $(".plat1").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlPlat1.png' width='35'>");
        $(".plat2").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlPlat2.png' width='35'>");
        $(".plat3").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlPlat3.png' width='35'>");
        $(".d1").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlD1.png' width='35'>");
        $(".d2").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlD2.png' width='35'>");
        $(".d3").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlD3.png' width='35'>");
        $(".champ1").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlChamp1.png' width='35'>");
        $(".champ2").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlChamp2.png' width='35'>");
        $(".champ3").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlChamp3.png' width='35'>");
        $(".grand").find(".iconDisplay, .rlIcon").html("<img src='images/rocketLeagueIcons/rlGrand.png' width='35'>");

        // FORTNITE RANK ICONS
        $(".open1").find(".iconDisplay, .fortniteIcon").html("<img src='images/fortniteIcons/open1.png' class='rounded' width='25'>");
        $(".open2").find(".iconDisplay, .fortniteIcon").html("<img src='images/fortniteIcons/open2.png' class='rounded' width='25'>");
        $(".open3").find(".iconDisplay, .fortniteIcon").html("<img src='images/fortniteIcons/open3.png' class='rounded' width='25'>");
        $(".contender1").find(".iconDisplay, .fortniteIcon").html("<img src='images/fortniteIcons/contender1.png' class='rounded' width='25'>");
        $(".contender2").find(".iconDisplay, .fortniteIcon").html("<img src='images/fortniteIcons/contender2.png' class='rounded' width='25'>");
        $(".contender3").find(".iconDisplay, .fortniteIcon").html("<img src='images/fortniteIcons/contender3.png' class='rounded' width='25'>");
        $(".champ").find(".iconDisplay, .fortniteIcon").html("<img src='images/fortniteIcons/champ.png' class='rounded' width='25'>");

        // COD RANKS
        $(".novice").find(".iconDisplay, .codIcon").html("<div class='rounded-circle codIcon bg-primary'></div>");
        $(".recruit").find(".iconDisplay, .codIcon").html("<div class='rounded-circle codIcon bg-success'></div>");
        $(".hardened").find(".iconDisplay, .codIcon").html("<div class='rounded-circle codIcon bg-warning'></div>");
        $(".veteran").find(".iconDisplay, .codIcon").html("<div class='rounded-circle codIcon bg-danger'></div>");

        // CONSOLE ICONS
        // If player is on ps4, display ps4 font-awesome icon
        $(".ps4").find(".consoleDisplay").html("<i class='fab fa-playstation text-primary'></i> ");
        // If player is on xbox, display xbox font-awesome icon
        $(".xbox").find(".consoleDisplay").html("<i class='fab fa-xbox text-success'></i> ");
        // If player is on pc, display pc font-awesome icon
        $(".pc").find(".consoleDisplay").html("<i class='fas fa-desktop text-danger'></i> ");
    }
});