var WebSocketServer = require('websocket').server;
var http            = require('http');

var server = http.createServer(function(request, response){

});

server.listen(3000, function(){
    console.log('server listen on port 3000')
});

var wsServer = new WebSocketServer({
    httpServer: server
});

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

wsServer.on('request', function(request){
    console.log('- -');

    var connection = request.accept(null, request.origin);

    connection.on('message', function(message){
        console.log((new Date()) + ' Received Message from someone' + message.utf8Data);
        // we want to keep history of all sent messages
        var obj = {
            time: (new Date()).getTime(),
            text: htmlEntities(message.utf8Data),
            author: 'some_one'
        };

        var json = JSON.stringify({ type:'message', data: obj });

        connection.send(json);
        // for (var i=0; i < clients.length; i++) {
        //     clients[i].sendUTF(json);
        // }
    });

    connection.on('close', function(connection){
        console.log('a account lost connect')
    });
});