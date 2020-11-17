var Router = require('./lib/router')();
var Home = require('./controllers/home');
var Register = require('./controllers/register');
var Login = require('./controllers/login');
var Profile = require('./controllers/profile');
var FindFriends = require('./controllers/findFriends');
var Pages = require('./controllers/pages');
var UserModel = require('../../models/user');
var Chat = require('./controllers/chat');

var currentPage;
var body;

var showPage = function(newPage) {
    if(currentPage) { currentPage.teardown(); }
    currentPage = newPage;
    body.innerHTML = '';
    currentPage.render(body);
    currentPage.on('navigation.goto', function(e, route) {
        Router.navigate(route);
    });
}

window.onload = function() {

    body = document.querySelector('body .container');

    userModel = new UserModel();
    userModel.fetch(function(error, result) {

        Router
            .add('home', function() {
                var p = new Home();
                showPage(p);
            })
            .add('register', function() {
                var p = new Register();
                showPage(p);
            })
            .add('login', function() {
                var p = new Login();
                showPage(p);
            })
            .add('logout', function() {
                userModel.logout(function(error, result) {
                    window.location.href = '/';
                });
            })
            .add('profile', function() {
                if(userModel.isLogged()) {
                    var p = new Profile();
                    showPage(p);
                } else {
                    Router.navigate('login');
                }
            })
            .add('find-friends', function() {
                if (userModel.isLogged()) {
                    var p = new FindFriends();
                    showPage(p);
                } else {
                    Router.navigate('login');
                }
            })
            .add('pages/:id/:events', function(params) {
                // console.log('dans app.js la route pour les events');
                if(userModel.isLogged()) {
                    var p = new Pages({
                        data: {
                            pageId: params.id,
                            showEvents: true
                        }
                    });
                    showPage(p);
                } else {
                    Router.navigate('login');
                }
            })
            .add('pages/:id', function(params) {
                // console.log('COUCOU 1');
                if(userModel.isLogged()) {
                    var p = new Pages({
                        data: {
                            pageId: params.id
                        }
                    });
                    showPage(p);
                } else {
                    Router.navigate('login');
                }
            })
            .add('pages', function() {
                // console.log('COUCOU 2');
                if(userModel.isLogged()) {
                    var p = new Pages();
                    showPage(p);
                } else {
                    Router.navigate('login');
                }
            })
            .add('chat', function() {
                if(userModel.isLogged()) {
                    var p = new Chat();
                    showPage(p);
                } else {
                    Router.navigate('login');
                }
            })
            .add(function() {
                Router.navigate('home');
            })
            .listen()
            .check();

    });
}