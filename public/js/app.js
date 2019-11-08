$(document).ready(function () {

    // DRAG AND DROP **************************************************
    const player = document.querySelector(".player");
    const lanes = document.querySelectorAll(".lane");

    // fill listeners
    player.addEventListener("dragstart", dragStart);
    player.addEventListener("dragend", dragEnd);


    // Loop through empties and call events
    for (const lane of lanes) {
        lane.addEventListener("dragover", dragOver);
        lane.addEventListener("dragenter", dragEnter);
        lane.addEventListener("dragleave", dragLeave);
        lane.addEventListener("drop", drop);
    }

    // drag functions
    function dragOver() {
        event.preventDefault();
        $(this).addClass("hover");
    }

    function dragEnter() {
        event.preventDefault();
    }

    function dragLeave() {
        $(this).removeClass("hover");
    }

    function drop() {
        $(this).removeClass("hover");
        var newRoom;
        if ($(this).hasClass("rocketLeague")) {
            newRoom = {
                room: "rocketLeague"
            }
        } else if ($(this).hasClass("cod")) {
            newRoom = {
                room: "cod"
            }
        } else if ($(this).hasClass("fortnite")) {
            newRoom = {
                room: "fortnite"
            }
        }

        this.append(player);
        $.post("/updateRoom", newRoom);
        setTimeout(function() {
            window.location.reload();
        }, 500);
    }


    function dragStart() {

    }

    function dragEnd() {

    }

    // Change Sections **********************************************************
    changeSection();
    function changeSection() {
        if ($(".player").hasClass("rocketLeague")) {
            $("#rlSection").append($(".player"));
        } else if ($(".player").hasClass("cod")) {
            $("#codSection").append($(".player"));
        } else if ($(".player").hasClass("fortnite")) {
            $("#fortniteSection").append($(".player"));
        }
    }
});