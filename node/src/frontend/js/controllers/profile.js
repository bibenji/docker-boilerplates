var Friends = require('../../../models/friends');

module.exports = Ractive.extend({
    template: require('../../../../public/templates/profile'),
    components: {
        navigation: require('../../../views/navigation'),
        appfooter: require('../../../views/footer')
    },
    data: {
        friends: []
    },
    onrender: function() {
        var self = this;
        this.set(userModel.get('value'));

        this.on('updateProfile', function() {
            userModel.set('value.firstName', this.get('firstName'));
            userModel.set('value.lastName', this.get('lastName'));
            if(this.get('password') != '') {
                userModel.set('value.password', this.get('password'));
            }
            userModel.save(function(error, result) {
                if(error) {
                    self.set('error', error.error);
                } else {
                    self.set('error', false);
                    self.set('success', 'Profile updated successfully.');
                }
            });
        });

        this.on('deleteProfile', function() {
            if(confirm('Are you sure! Your account will be deleted permanently.')) {
                userModel.del(function() {
                    window.location.href = '/';
                });
            }
        });

        var friends = new Friends();
        friends.fetch(function(err, res) {
            if(typeof res !== 'undefined' && typeof res.friends !== 'undefined' && res.friends.length > 0) {
                self.set('friends', res.friends);
            }
        })
    }
});