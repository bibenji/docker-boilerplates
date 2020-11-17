var http = require('http');
var url = require('url');
var querystring = require('querystring');

var server = http.createServer(function(req, res) {

    var page = url.parse(req.url).pathname;
    var params = url.parse(req.url).query;

    console.log(page);
    console.log(params);

    params = querystring.parse(url.parse(req.url).query);

    console.log(params);

    res.writeHead(200, {"Content-Type": "text/html"});

    if (page == '/') {

        res.write('<!DOCTYPE html>' +
            '<html>' +
            ' <head>' +
            ' <meta charset="utf-8" />' +
            ' <title>Ma page Node.js !</title>' +
            ' </head>' +
            ' <body>' +
            ' <p>Voici un paragraphe <strong>HTML</strong> !</p>' +
            ' </body>' +
            '</html>');

    }

    else {

        res.write('<p>Wtf?!?</p>');
    }

    res.end();
});

server.listen(8888);