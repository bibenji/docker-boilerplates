var path = require('path');
var fs = require('file-system');

var files = {};

module.exports = function(req, res) {

    // console.log("ça marche ou pas ? 2");

    var sendError = function(message, code) {
        // console.log("sendError");
        if(code === undefined) {
            code = 404;
        }
        res.writeHead(code, {'Content-Type': 'text/html'});
        res.end(message);
    }

    var serve = function(file) {
        // console.log("serve");
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
        // console.log("readFile");
        // console.log(filePath);

        fs.exists(filePath, function(exists) {
            if(exists && files[filePath] && false) {
                serve(files[filePath]);
            } else if(exists) {
                fs.readFile(filePath, function(err, data) {
                    if(err) {
                        sendError('Error reading ' + filePath + '.');
                        return;
                    }
                    files[filePath] = {
                        ext: filePath.split(".").pop().toLowerCase(),
                        content: data
                    };
                    serve(files[filePath]);
                });
            } else {
                sendError('File ' + req.url + ' does not exist.')
            }
        });
    }

    // console.log(path.normalize(__dirname + '/../../public/' + req.url));
    readFile(path.normalize(__dirname + '/../../public/' + req.url));
}