var ajax = require('../frontend/js/lib/ajax');
var Base = require('./base');

module.exports = Base.extend({
    data: {
        url: '/api/pages'
    },
    create: function(formData, callback) {
        var self = this;
        ajax.request({
            url: this.get('url'),
            method: 'POST',
            formData: formData,
            json: true
        })
            .done(function(result) {
                callback(null, result);
            })
            .fail(function(xhr) {
                callback(JSON.parse(xhr.responseText));
            });
    },
    getPage: function(pageId, callback) {
        var self = this;
        ajax.request({
            url: this.get('url') + '/' + pageId,
            method: 'GET',
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