var express = require('express');

var app = express();

/*
app.use(express.cookieParser())
    .use(express.session({secret: 'todotopsecret'}))
    .use(express.bodyParser());

app.use(function(req, res, next){
    if (typeof(req.session.todolist) == 'undefined') {
        req.session.todolist = [];
    }
    next();
});
*/

app.get('/', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à l\'accueil, que puis-je pour vous ?');
});

app.get('/sous-sol', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes dans la cave à vins, ces bouteilles sont à moi !');
});

app.get('/etage/1/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hé ho, c\'est privé ici !');
});

app.get('/etage/:etagenum/chambre', function(req, res) {
    res.setHeader('Content-Type', 'text/plain');
    res.end('Vous êtes à la chambre de l\'étage n°' +
        req.params.etagenum);
});

app.get('/floor/:floornum/room', function(req, res) {
    res.render('room.ejs', {etage: req.params.floornum});
});

app.get('/compter/:nombre', function(req, res) {
    var noms = ['Robert', 'Jacques', 'David'];
    res.render('page.ejs', {compteur: req.params.nombre, noms:
    noms});
});

/*
app.get('/todo', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
});

app.post('/todo/ajouter/', function(req, res) {
    res.render('todo.ejs', {todolist: req.session.todolist});
})
*/

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    res.send(404, 'Page introuvable !');
});

app.listen(8888);