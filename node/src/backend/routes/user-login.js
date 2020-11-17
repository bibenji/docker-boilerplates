var sha1 = require('sha1');
var helpers = require('../helpers');
var response = helpers.response;
var error = helpers.error;
var getDatabaseConnection = helpers.getDatabaseConnection;
var processPOSTRequest = helpers.processPOSTRequest;
var validEmail = helpers.validEmail;

module.exports = function(req, res) {
    processPOSTRequest(req, function(data) {
        if (typeof data.email === 'undefined' || data.email === '' || (!(validEmail(data.email)))) {
            error('Invalid or missing email.', res);
        } else if (!data.password || data.password === '') {
            error('Please fill your password.', res);
        } else {
            getDatabaseConnection(function(db) {
                var collection = db.collection('users');
                collection.find({
                    email: data.email,
                    password: sha1(data.password)
                }).toArray(function(err, result) {
                    if (result.length === 0) {
                        error('Wrong email or password', res);
                    } else {
                        var user = result[0];
                        delete user.password;
                        delete user._id;
                        req.session.user = user;
                        response({
                            success: 'OK',
                            user: user
                        }, res);
                    }
                });
            });
        }
    });
};