var http = require('http');
var fs = require('file-system');
// var qs = require('querystring');
var path = require('path');

var files = {};
var port = 8888;
var host = '127.0.0.1';

// manage assets
var assets = function(req, res) {
    console.log("ça marche ou pas ? 2");

    var sendError = function(message, code) {
        if(code === undefined) {
            code = 404;
        }
        res.writeHead(code, {'Content-Type': 'text/html'});
        res.end(message);
    }

    var serve = function(file) {
        var contentType;
        switch(file.ext.toLowerCase()) {
            case "css": contentType = "text/css"; break;
            case "html": contentType = "text/html"; break;
            case "js": contentType = "application/javascript"; break;
            case "ico": contentType = "image/ico"; break;
            case "json": contentType = "application/json"; break;
            case "jpg": contentType = "image/jpeg"; break;
            case "jpeg": contentType = "image/jpeg"; break;
            case "png": contentType = "image/png"; break;
            default: contentType = "text/plain";
        }
        res.writeHead(200, {'Content-Type': contentType});
        res.end(file.content);
    }

    var readFile = function(filePath) {
        if(files[filePath]) {
            console.log("serve : " + files[filePath]);
            serve(files[filePath]);
        } else {
            fs.readFile(filePath, function(err, data) {
                if(err) {
                    sendError('Error reading ' + filePath + '.');
                    return;
                }
                files[filePath] = {
                    ext: filePath.split(".").pop(),
                    content: data
                };
                console.log("serve : " + files[filePath]);
                serve(files[filePath]);
            });
        }
    }

    console.log(path.normalize(__dirname + req.url));
    readFile(path.normalize(__dirname + req.url));
};

// start the server
var app = http.createServer(assets).listen(port, host);
console.log("Listening on " + host + ":" + port);
console.log("ça marche ou pas ? 1");
