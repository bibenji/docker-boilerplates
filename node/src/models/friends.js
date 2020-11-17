var ajax = require('../frontend/js/lib/ajax');
var Base = require('./base');

module.exports = Base.extend({
    data: {
        url: '/api/friends'
    },
    find: function(searchFor, callback) {
        ajax.request({
            url: this.get('url') + '/find',
            method: 'POST',
            data: {
                searchFor: searchFor
            },
            json: true
        })
            .done(function(result) {
                callback(null, result);
            })
            .fail(function(xhr) {
                callback(JSON.parse(xhr.responseText), null);
            });
    },
    add: function(id, callback) {
        ajax.request({
            url: this.get('url') + '/add',
            method: 'POST',
            data: {
                id: id
            },
            json: true
        })
            .done(function(result) {
                callback(null, result);
            })
            .fail(function(xhr) {
                callback(JSON.parse(xhr.responseText));
            });
    }
});