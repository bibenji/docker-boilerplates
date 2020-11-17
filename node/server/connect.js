var connect = require('connect');
var http = require('http');

// var app = connect();
var express = require('express');
var app = express();

// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());

// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
    keys: ['secret1', 'secret2']
}));

var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    cookie: {}
}));

// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(function(req, res, next) {
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});

app.get('/webso', function(req, res) {
   res.render('webso.ejs');
});

app.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
});

app.get('/todo/supprimer/:id', function(req, res) {
    if (req.params.id != '') {
        req.session.todolist.splice(req.params.id, 1);
    }
    res.redirect('/todo');
});

app.post('/todo/ajouter/', function(req, res) {
    if (req.body.newtodo != '') {
        req.session.todolist.push(req.body.newtodo);
    }
    res.redirect('/todo');
});



// respond to all requests
app.use(function(req, res){
    res.end('Hello from Connect!\n');
});

//create node.js http server and listen on port
var server = http.createServer(app);

var io = require('socket.io').listen(server);

io.sockets.on('connection', function(socket) {
   console.log('Un client est connecté !');
   socket.emit('message', 'Vous êtes bien connecté !');

   socket.on('petit_nouveau', function(pseudo) {
      // socket.set('pseudo', pseudo);
       socket.pseudo = pseudo;
      console.log('stock : ' + pseudo);
   });

   socket.on('message', function (message) {
       console.log('Un client me parle ! Il me dit : ' + message);
       socket.emit('message', socket.pseudo+' : '+message);
       socket.broadcast.emit('message', socket.pseudo+' : '+message);
   });
});

server.listen(8888);