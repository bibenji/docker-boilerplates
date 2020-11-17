// var UserModel = require('../models/user');

module.exports = Ractive.extend({
    template: require('../../public/templates/navigation'),
    data: {
        isLogged: function() {
            // console.log('userModel.isLogged() in navigation.js => ' + userModel.isLogged());
            return userModel.isLogged();
        }
    },
    onconstruct: function() {

        // console.log(userModel.isLogged());
        // n'a pas l'air de fonctionner...
        this.data.isLogged = userModel.isLogged();
    },
    onrender: function() {
        var self = this;

        this.on('goto', function(event) {
            var target = event.node.getAttribute('data-target');
            if(target) {
                window.location.href = target;
            }
        });
    }
});

