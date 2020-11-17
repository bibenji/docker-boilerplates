var ajax = require('../frontend/js/lib/ajax');
var Base = require('./base');

module.exports = Base.extend({
    data: {
        url: '/api/user'
    },
    login: function(callback) {
        var self = this;
        ajax.request({
            url: this.get('url') + '/login',
            method: 'POST',
            data: {
                email: this.get('email'),
                password: this.get('password')
            },
            json: true
        })
            .done(function (result) {
                callback(null, result);
            })
            .fail(function (xhr) {
                callback(JSON.parse(xhr.responseText));
            });
    },
    logout: function(callback) {
        var self = this;
        ajax.request({
            url: this.get('url') + '/logout',
            json: true
        })
            .done(function(result) {
                callback(null, result);
            })
            .fail(function(xhr) {
                callback(JSON.parse(xhr.responseText));
            })
    },
    isLogged: function() {
        // console.log('user.js => isLogged');
        // console.log(this.get('firstName')); // undefined
        // console.log(this.get('value.firstName'));
        // console.log(this.get('value.lastName'));
        // console.log(this.get('value.firstName') + ' ' + this.get('value.lastName'));
        // console.log('------------------------------------')
        const userFullName = this.get('value.firstName') + ' ' + this.get('value.lastName');

        if (userFullName !== 'undefined undefined') {
            return userFullName;
        } else {
            return false;
        }
    }
});