var ContentModel = require('../../../models/content');
// var userModel = require('../../../models/user');
var Friends = require('../../../models/friends');

module.exports = Ractive.extend({
    template: require('../../../../public/templates/home'),
    components: {
        navigation: require('../../../views/navigation'),
        appfooter: require('../../../views/footer')
    },
    data: {
        posting: true,
        isLogged: function() {
            // console.log('userModel.isLogged() in home.js (data) => ' + userModel.isLogged());
            return userModel.isLogged();
        }
    },
    onrender: function() {
        // console.log('Home page rendered');
        // console.log(userModel);
        // console.log('userModel.isLogged() in home.js => ' + userModel.isLogged());

        if(userModel.isLogged()) {
            var model = new ContentModel();
            var self = this;

            this.on('post', function() {
                var files = this.find('input[type="file"]').files;
                var formData = new FormData();
                if (files.length > 0) {
                    var file = files[0];
                    if (file.type.match('image.*')) {
                        formData.append('files', file, file.name);
                    }
                }
                formData.append('text', this.get('text'));
                formData.append('taggedFriends', JSON.stringify(this.get('taggedFriends')));

                // console.log(formData.get('text'));
                // console.log(this.get('text'));

                model.create(formData, function(error, result) {

                    if (error) {
                        self.set('error', error.error);
                    } else {
                        self.set('text', '');
                        self.set('taggedFriends', []),
                        self.set('error', false);
                        self.set('success', 'The post is saved successfully.<br />What about adding another one?');
                        getPosts();
                    }
                });

            });

            this.on('share', function(e) {
                const id = e.node.getAttribute('data-index');
                var formData = new FormData();
                formData.append('postId', id);
                model.usePost('share', formData, getPosts);
            });

            this.on('like', function(e) {
                const id = e.node.getAttribute('data-index');
                var formData = new FormData();
                formData.append('postId', id);
                model.usePost('like', formData, getPosts);
            });

            var getPosts = function() {
                model.fetch(function(err, result) {
                    if (!err) {
                        // console.log('les posts :');
                        // console.log(result.posts);
                        self.set('posts', result.posts);
                    }
                });
            };

            getPosts();

            var friends = new Friends();
            friends.fetch(function(err, result) {
                if(err) { throw err;}
                self.set('friends', result.friends);
            });

        } else {
            this.set('posting', false);
        }
    }
});