var ajax = require('../frontend/js/lib/ajax');
var Base = require('./base');

module.exports = Base.extend({
    data: {
        url: '/api/content'
    },
    create: function(formData, callback) {
        var self = this;
        // console.log('ICI POUR LE formData.text : ' + formData.text);
        ajax.request({
            url: this.get('url'),
            method: 'POST',
            formData: formData,
            // data: {
            //     text: content.text
            // },
            json: true
        })
            .done(function(result) {
                callback(null, result);
            })
            .fail(function(xhr) {
                callback(JSON.parse(xhr.responseText));
            });
    },
    usePost: function(url, formData, callback) {
        var self = this;
        ajax.request({
            url: this.get('url') + '/' + url,
            method: 'POST',
            formData: formData,
            json: true
        })
            .done(function (result) {
                callback(null, result);
            })
            .fail(function (xhr) {
                callback(JSON.parse(xhr.responseText));
            });
    },
    sharePost: function(formData, callback) {
        var self = this;
        ajax.request({
            url: this.get('url') + '/share',
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
    }
});