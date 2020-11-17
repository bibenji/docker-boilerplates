var Ractive = require('ractive');

var fs = require('fs');
var template = fs.readFileSync(__dirname + '/../templates/my-first-page.html').toString('utf8');

var ractive = Ractive({
    // target: '#output',
    template: template,
    data: { greeting: 'Bonjour', name: 'John' }
});

var html = ractive.toHTML();
// console.log(html);

var response = function(html, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(html + '\n');
}

var Router = require('../frontend/js/lib/router')();

Router
    .add(
        // path
        'test',
        // handler appelé quand le path est matché
        function(req, res) {
            response(html, res);
        });

module.exports = function(req, res) {
    Router.check(req.url, [req, res]);
}