module.exports = Ractive.extend({
    template: require('../../../../public/templates/login'),
    components: {
        navigation: require('../../../views/navigation'),
        appfooter: require('../../../views/footer')
    },
    onrender: function() {
        var self = this;
        this.observe('email', userModel.setter('email'));
        this.observe('password', userModel.setter('password'));
        this.on('login', function() {
            userModel.login(function(error, result) {
                if(error) {
                    self.set('error', error.error);
                } else {
                    // console.log('login.js => result');
                    // console.log(result);
                    self.set('error', false);

                    // tests by me
                    userModel.setter('firstName', result.firstName);
                    userModel.setter('lastName', result.lastName);

                    // console.log('TEST TEST TEST');
                    // console.log(userModel.get('firstName')); // = undefined
                    // console.log(userModel.get('value.firstName')); // = Bob

                    // redirecting the user to the home page
                    window.location.href = '/';
                }
            });
        });
    }
});