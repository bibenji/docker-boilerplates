var ajax = require('../frontend/js/lib/ajax');
var Ractive = require('ractive');

module.exports = Ractive.extend({
    data: {
        value: null,
        url: ''
    },

    fetch: function(callback) {
        var self = this;
        ajax.request({
            url: self.get('url'),
            json: true
        })
            .done(function(result) {
                self.set('value', result);
                if(callback) {
                    callback(null, result);
                }
            })
            .fail(function(xhr) {
                // self.fire('Error fetching ' + self.get('url'))
                self.set('value', null);
                if(callback) {
                    callback({error: 'Error loading ' + self.get('url')});
                }
            });
        return this;
    },

    bindComponent: function(component) {
        if(component) {
            this.observe('value', function(v) {
                for(var key in v) {
                    component.set(key, v[key]);
                }
            }, { init: false });
        }
        return this;
    },

    create: function(callback) {
        var self = this;
        ajax.request({
            url: self.get('url'),
            method: 'POST',
            data: this.get('value'),
            json: true
        })
            .done(function(result) {
                if(callback) {
                    callback(null, result);
                }
            })
            .fail(function(xhr) {
                if(callback) {
                    callback(JSON.parse(xhr.responseText));
                }
            });
        return this;
    },

    save: function(callback) {
        var self = this;
        ajax.request({
            url: self.get('url'),
            method: 'PUT',
            data: this.get('value'),
            json: true
        })
            .done(function(result){
                if (callback) {
                    callback(null, result);
                }
            })
            .fail(function(xhr) {
                if (callback) {
                    callback(JSON.parse(xhr.responseText));
                }
            });
        return this;
    },

    del: function(callback) {
        var self = this;
        ajax.request({
            url: self.get('url'),
            method: 'DELETE',
            json: true
        })
            .done(function(result) {
                if(callback) {
                    callback(null, result);
                }
            })
            .fail(function(xhr) {
                if(callback) {
                    callback(JSON.parse(xhr.responseText));
                }
            });
        return this;
    },

    setter: function(key) {
        var self = this;
        return function(v) {
            self.set(key, v);
        }
    }

    // setter: function(key, v) {
    //     var self = this;
    //     // self.data[key] = v;
    //     // self.set(key, v); // c'est pas mieux ça tout simplement?
    //     return function(key, v) {
    //         self.set(key, v);
    //     }
    // }

    // added by me
    // getter: function(key) {
    //     var self = this;
    //     return self.data[key];
    // }
});