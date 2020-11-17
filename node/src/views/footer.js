var FooterModel = require('../models/version');

module.exports = Ractive.extend({
    template: require('../../public/templates/footer'),
    onrender: function() {
        var model = new FooterModel();
        model.bindComponent(this).fetch();
    }
});