$(document).ready(function () {

    $(function () {
        var socket = io();
        $('#messageForm').submit(function(e){
          e.preventDefault(); // prevents page reloading
          socket.emit('chat message', $('#m').val());
          $('#m').val('');
          return false;
        });
        socket.on("chat message", function(msg) {
            $("#messages").append($("<li>").text(msg));
        });
      });

// END of jQuery
});