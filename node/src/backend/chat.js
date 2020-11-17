var helpers = require('./helpers');
var getCurrentUserBySessionObj = helpers.getCurrentUserBySessionObj;
var getRandomColor = helpers.getRandomColor;
var cookie = require('cookie');

var decode = function(string) {
    var body = new Buffer(string, 'base64').toString('utf8');
    return JSON.parse(body);
};

var users = {};
var broadcastMessage = function(userProfile, message) {
    console.log(users);

    var user = users[userProfile._id.toString()];
    var userName = userProfile.firstName + ' ' + userProfile.lastName;

    console.log(users);
    console.log(userProfile);
    console.log(userProfile._id.toString());
    // console.log(user.friends);
    // console.log(user.friends.length);

    if(user && user.friends && user.friends.length > 0) {
        console.log('PREMIER IIIIIIIIIIIIIIIIIF');

        user.socket.emit('server-talking', {
            text: message,
            user: userName,
            color: user.color
        });

        for(var i=0; i<user.friends.length; i++) {
            var friend = users[user.friends[i]];
            if(friend && friend.socket) {
                console.log('FRIEENNNNNNNNNND SOCKET EMIT');
                friend.socket.emit('server-talking', {
                    text: message,
                    user: userName,
                    color: user.color
                });
            }
        }
    }
};

module.exports = function(app) {
    var io = require('socket.io')(app);
    io.on('connection', function(socket) {
        var sessionData = cookie.parse(socket.request.headers.cookie);
        // retourn qqc comme ça :
        // {
        //     session: 'eyJ1c2VyIjp7ImZpcnN0TmFtZSI6IkJvYiIsImxhc3ROYW1lIjoiTGVwb25nZSIsImVtYWlsIjoiYm9iQGxlcG9uZ2UuZnIifX0=',
        //     'session.sig': 'l8q-4_sdnmo0oHc7PU49z7B-SuI',
        //     io: 'B-83C6XyXtKh9W87AAAA'
        // }

        // sessionData = decode(sessionData['express:sess']); // ne marche pas/plus
        sessionData = decode(sessionData.session);

        if(sessionData && sessionData.user) {
            getCurrentUserBySessionObj(function(err, user) {
                var userId = user._id.toString();

                users[userId] = {
                    socket: socket,
                    friends: user.friends,
                    color: getRandomColor()
                };

                socket.on('client-talking', function(data) {
                    console.log('CLIENT TAAAAAAAAAAAAAALKING');
                    broadcastMessage(user, data.text);
                });

                socket.on('disconnect', function() {
                    users[userId] = null;
                });

            }, sessionData);
        }
    });
}
