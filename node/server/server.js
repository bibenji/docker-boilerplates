var http = require('http');
var session = require('cookie-session');
// var qs = require('querystring'); // ???

var port = 8888;
var host = '127.0.0.1';

var Assets = require('../src/backend/assets');

var API = require('../src/backend/API');
var Default = require('../src/backend/default');
var MyFirstPage = require('../src/backend/myFirstPage');
var Chat = require('../src/backend/chat');

var Router = require('../src/frontend/js/lib/router')();

Router
    .add('static', Assets)
    .add('api', API)
    .add('test', MyFirstPage)
    .add(Default)
;

var checkSession = function(req, res) {
    // console.log('checkSession');
    session({
        keys: ['nwd']
    }) (req, res, function() {
        // console.log('process in checkSession');
        process(req, res);
    });
};

var process = function(req, res) {
    // console.log('process');
    Router.check(req.url, [req, res]);
};

// var app = http.createServer(process);
var app = http.createServer(checkSession);

// app.listen(port, host);
app.listen(port);

// start the server
// var app = http.createServer(assets).listen(port, host);
console.log("Listening on " + host + ":" + port);

// var UserModel = require('../src/models/user');
// console.log(UserModel().isLogged());

Chat(app);