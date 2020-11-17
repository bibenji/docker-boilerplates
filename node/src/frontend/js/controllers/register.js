module.exports = Ractive.extend({
    template: require('../../../../public/templates/register'),
    components: {
        navigation: require('../../../views/navigation'),
        appfooter: require('../../../views/footer')
    },
    onrender: function() {
        var self = this;
        this.observe('firstName', userModel.setter('value.firstName'));
        this.observe('lastName', userModel.setter('value.lastName'));
        this.observe('email', userModel.setter('value.email'));
        this.observe('password', userModel.setter('value.password'));
        this.on('register', function() {
            userModel.create(function(error, result) {
                if(error) {
                    self.set('error', error.error);
                } else {
                    self.set('error', false);
                    self.set('success', 'Registration successful. Click <a href="/login">here</a> to login.');
                }
            });
        });
    }
});