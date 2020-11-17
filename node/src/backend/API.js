// var sha1 = require('sha1');

// var ObjectId = require('mongodb').ObjectID;
// var helpers = require('./helpers');
// var response = helpers.response;
// var error = helpers.error;
// var getDatabaseConnection = helpers.getDatabaseConnection;
// var getCurrentUser = helpers.getCurrentUser;

// var fs = require('fs');

var Router = require('../frontend/js/lib/router')();

Router
    .add('api/version', require('./routes/version'))
    .add('api/user/login', require('./routes/user-login'))
    .add('api/user/logout', require('./routes/user-logout'))
    .add('api/user', require('./routes/user'))
    .add('api/friends/find', require('./routes/friends-find'))
    .add('api/friends/add', require('./routes/friends-add'))
    .add('api/friends', require('./routes/friends'))
    .add('api/content/share', require('./routes/content-share'))
    .add('api/content/like', require('./routes/content-like'))
    .add('api/content', require('./routes/content'))
    .add('api/pages/:id', require('./routes/pages'))
    .add('api/pages', require('./routes/pages'))
    .add(require('./routes/default'));

module.exports = function(req, res) {
    Router.check(req.url, [req, res]);
}