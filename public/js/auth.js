$(document).ready(function () {


    // EDIT PROFILE
    $("#editProfile").on("click", function() {
        event.preventDefault();
        $("#editModal").modal("show");
    });

    // CONSOLE ICONS
    // If player is on ps4, display ps4 font-awesome icon
    $(".ps4").prepend("<i class='fab fa-playstation text-primary'></i> ");
    // If player is on xbox, display xbox font-awesome icon
    $(".xbox").prepend("<i class='fab fa-xbox text-success'></i> ");
    // If player is on pc, display pc font-awesome icon
    $(".pc").prepend("<i class='fas fa-desktop text-danger'></i> ");

    // ROCKET LEAGUE RANK ICONS
    $(".rocketLeague-bronze1").append("<img src='images/rocketLeagueIcons/rlBronze1.png' width='35'>");
    $(".rocketLeague-bronze2").append("<img src='images/rocketLeagueIcons/rlBronze2.png' width='35'>");
    $(".rocketLeague-bronze3").append("<img src='images/rocketLeagueIcons/rlBronze3.png' width='35'>");
    $(".rocketLeague-gold1").append("<img src='images/rocketLeagueIcons/rlGold1.png' width='35'>");
    $(".rocketLeague-gold2").append("<img src='images/rocketLeagueIcons/rlGold2.png' width='35'>");
    $(".rocketLeague-gold3").append("<img src='images/rocketLeagueIcons/rlGold3.png' width='35'>");
    $(".rocketLeague-plat1").append("<img src='images/rocketLeagueIcons/rlPlat1.png' width='35'>");
    $(".rocketLeague-plat2").append("<img src='images/rocketLeagueIcons/rlPlat2.png' width='35'>");
    $(".rocketLeague-plat3").append("<img src='images/rocketLeagueIcons/rlPlat3.png' width='35'>");
    $(".rocketLeague-d1").append("<img src='images/rocketLeagueIcons/rlD1.png' width='35'>");
    $(".rocketLeague-d2").append("<img src='images/rocketLeagueIcons/rlD2.png' width='35'>");
    $(".rocketLeague-d3").append("<img src='images/rocketLeagueIcons/rlD3.png' width='35'>");
    $(".rocketLeague-champ1").append("<img src='images/rocketLeagueIcons/rlChamp1.png' width='35'>");
    $(".rocketLeague-champ2").append("<img src='images/rocketLeagueIcons/rlChamp2.png' width='35'>");
    $(".rocketLeague-champ3").append("<img src='images/rocketLeagueIcons/rlChamp3.png' width='35'>");
    $(".rocketLeague-grand").append("<img src='images/rocketLeagueIcons/rlGrand.png' width='35'>");


    // END of jQuery
})