var PagesModel = require('../../../models/pages');
var ContentModel = require('../../../models/content');

module.exports = Ractive.extend({
    template: require('../../../../public/templates/pages'),
    components: {
        navigation: require('../../../views/navigation'),
        appfooter: require('../../../views/footer')
    },
    data: {},
    onrender: function() {
        var model = new PagesModel();
        var self = this;

        var pageId = this.get('pageId');
        var showEvents = this.get('showEvents');

        // console.log('showEvents dans le controller :');
        // console.log(showEvents);

        if(pageId) {
            var showPage = function() {
                model.getPage(pageId, function(err, result) {
                    if(!err && result.pages.length > 0) {
                        var page = result.pages[0];
                        self.set('pageTitle', page.title);
                        self.set('pageDescription', page.description);
                        self.set('pageId', pageId);
                        self.set('showEvents', showEvents);

                        if(showEvents) {
                            // console.log('set les events dans pages controllers');
                            // console.log(page.events.length);
                            // console.log(page.events[0]);
                            self.set('events', page.events);
                            // self.set('events', ['grosse banane']);
                        } else {
                            self.set('comments', page.comments);
                        }

                    } else {
                        self.set('pageTitle', 'Missing page.');
                    }
                });
            }

            showPage();

            this.on('add-comment', function() {
                var contentModel = new ContentModel();
                var formData = new FormData();
                formData.append('text', this.get('text'));
                formData.append('pageId', pageId);
                contentModel.create(formData, function(error, result) {
                    if(error) {
                        self.set('error', error.error);
                    } else {
                        self.set('error', false);
                        self.set('success', 'The post is saved successfuly.');
                        self.set('text', '');
                        showPage();
                    }
                });
            });

            this.on('add-event', function() {
                var contentModel = new ContentModel();
                var formData = new FormData();
                formData.append('text', this.get('text'));
                formData.append('eventDate', this.get('date'));
                formData.append('pageId', pageId);
                contentModel.create(formData, function(error, result) {
                    if(error) {
                        self.set('error', error.error);
                    } else {
                        self.set('text', '');
                        self.set('error', false);
                        self.set('success', 'The post is saved successfully.');
                        showPage();
                    }
                });
            });

            return;
        }

        this.on('create', function() {
            var formData = new FormData();
            formData.append('title', this.get('title'));
            formData.append('description', this.get('description'));
            model.create(formData, function(error, result) {
                if(error) {
                    self.set('error', error.error);
                } else {
                    self.set('title', '');
                    self.set('description', '');
                    self.set('error', false);
                    self.set('success', 'The page was created successfully. Go <a href="">there</a> and add a comment.');
                    getPages();
                }
            });
        });

        var getPages = function() {
            model.fetch(function(err, result) {
                if(!err) {
                    self.set('pages', result.pages);
                } else {
                    self.set('error', err.error);
                }
            });
        };

        getPages();
    }
});