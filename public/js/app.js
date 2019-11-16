$(document).ready(function () {

    // Variables
    var socket = io();
    // var ownID = $("#waitingSection").find(".player").attr("id");
    var ownID = $(".currentUserId").attr("data-id");
    console.log(ownID);


    // Functions called on load
    changeIcon();
    startingSection();

    
    // SOCKET LISTENERS *********************************************
    socket.on("room update", function(currentUser) {
        // $("#" + currentUser.id).removeClass();
        // $("#" + currentUser.id).addClass("btn btn-dark player fill border border-success " + currentUser.console + " " + currentUser.room + "-" + currentUser.rl_rank + " " + currentUser.room + "-" + currentUser.cod_rank + " " + currentUser.room + "-" + currentUser.fortnite_rank + " " + currentUser.room);
        var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + currentUser.room + "-" + currentUser.rl_rank + " " + currentUser.room + "-" + currentUser.cod_rank + " " + currentUser.room + "-" + currentUser.fortnite_rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
        $("#" + currentUser.id).remove();
        if (currentUser.room === "rocketLeague") {
            $("#rlSection").append($(player));
        }
        else if (currentUser.room === "cod") {
            $("#codSection").append($(player));
        }
        else if (currentUser.room === "fortnite") {
            $("#fortniteSection").append($(player));
        }
        else if (currentUser.room === "waiting") {
            $("#waitingSection-" + currentUser.id).html(player);
        }
        changeIcon();
    });

    socket.on("profile update", function(currentUser) {
        var player = $("<button id='" + currentUser.id + "' match='" + currentUser.match + "' class='btn btn-dark player fill border border-success " + currentUser.console + " " + currentUser.room + "-" + currentUser.rl_rank + " " + currentUser.room + "-" + currentUser.cod_rank + " " + currentUser.room + "-" + currentUser.fortnite_rank + " " + currentUser.room + "'><span class='consoleDisplay'></span><span class='px-4'>" + currentUser.username + "</span><span class='iconDisplay'></span></button>");
        $("#" + currentUser.id).remove();
        if (currentUser.room === "rocketLeague") {
            $("#rlSection").append($(player));
        }
        else if (currentUser.room === "cod") {
            $("#codSection").append($(player));
        }
        else if (currentUser.room === "fortnite") {
            $("#fortniteSection").append($(player));
        }
        $("#profileName").html(currentUser.username);
        changeIcon();
    })

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
    })

    // Edit profile *********************************************************
    $("#editProfile").on("click", function() {
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
    }

    // notify();
    // function notify() {
    //     if ($("#" + ownID).attr("match") !== "none") {
    //         // alert($(".player").attr("match") + " is the same rank as you. Find him in game and party up!");
    //         $("#matchNotification").html($(".player").attr("match"));
    //         $("#matchModal").modal("show");
    //     }
    // }

    
    function changeIcon() {
        // ROCKET LEAGUE RANK ICONS
        $(".rocketLeague-bronze1").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlBronze1.png' width='35'>");
        $(".rocketLeague-bronze2").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlBronze2.png' width='35'>");
        $(".rocketLeague-bronze3").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlBronze3.png' width='35'>");
        $(".rocketLeague-silver1").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlSilver1.png' width='35'>");
        $(".rocketLeague-silver2").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlSilver2.png' width='35'>");
        $(".rocketLeague-silver3").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlSilver3.png' width='35'>");
        $(".rocketLeague-gold1").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlGold1.png' width='35'>");
        $(".rocketLeague-gold2").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlGold2.png' width='35'>");
        $(".rocketLeague-gold3").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlGold3.png' width='35'>");
        $(".rocketLeague-plat1").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlPlat1.png' width='35'>");
        $(".rocketLeague-plat2").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlPlat2.png' width='35'>");
        $(".rocketLeague-plat3").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlPlat3.png' width='35'>");
        $(".rocketLeague-d1").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlD1.png' width='35'>");
        $(".rocketLeague-d2").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlD2.png' width='35'>");
        $(".rocketLeague-d3").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlD3.png' width='35'>");
        $(".rocketLeague-champ1").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlChamp1.png' width='35'>");
        $(".rocketLeague-champ2").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlChamp2.png' width='35'>");
        $(".rocketLeague-champ3").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlChamp3.png' width='35'>");
        $(".rocketLeague-grand").find(".iconDisplay").html("<img src='images/rocketLeagueIcons/rlGrand.png' width='35'>");

        // FORTNITE RANK ICONS
        $(".fortnite-open1").find(".iconDisplay").html("<img src='images/fortniteIcons/open1.png' class='rounded' width='25'>");
        $(".fortnite-open2").find(".iconDisplay").html("<img src='images/fortniteIcons/open2.png' class='rounded' width='25'>");
        $(".fortnite-open3").find(".iconDisplay").html("<img src='images/fortniteIcons/open3.png' class='rounded' width='25'>");
        $(".fortnite-contender1").find(".iconDisplay").html("<img src='images/fortniteIcons/contender1.png' class='rounded' width='25'>");
        $(".fortnite-contender2").find(".iconDisplay").html("<img src='images/fortniteIcons/contender2.png' class='rounded' width='25'>");
        $(".fortnite-contender3").find(".iconDisplay").html("<img src='images/fortniteIcons/contender3.png' class='rounded' width='25'>");
        $(".fortnite-champ").find(".iconDisplay").html("<img src='images/fortniteIcons/champ.png' class='rounded' width='25'>");

        // COD RANKS
        $(".cod-novice").find(".iconDisplay").html("<div class='rounded-circle codIcon bg-primary'></div>");
        $(".cod-recruit").find(".iconDisplay").html("<div class='rounded-circle codIcon bg-success'></div>");
        $(".cod-hardened").find(".iconDisplay").html("<div class='rounded-circle codIcon bg-warning'></div>");
        $(".cod-veteran").find(".iconDisplay").html("<div class='rounded-circle codIcon bg-danger'></div>");

        // CONSOLE ICONS
        // If player is on ps4, display ps4 font-awesome icon
        $(".ps4").find(".consoleDisplay").html("<i class='fab fa-playstation text-primary'></i> ");
        // If player is on xbox, display xbox font-awesome icon
        $(".xbox").find(".consoleDisplay").html("<i class='fab fa-xbox text-success'></i> ");
        // If player is on pc, display pc font-awesome icon
        $(".pc").find(".consoleDisplay").html("<i class='fas fa-desktop text-danger'></i> ");
    }
});