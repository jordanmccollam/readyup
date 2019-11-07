$(document).ready(function () {

    // CLICK EVENTS ***************************************************
    $("#createBtn").on("click", function () {
        event.preventDefault();

        $("#createModal").modal("show");
    });

    $("#loginBtn").on("click", function() {
        event.preventDefault();

        $("#loginModal").modal("show");
    });


    // END of jQuery
})