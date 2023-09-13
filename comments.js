// Create web server
// Run node comments.js
// Go to browser and type localhost:8000
// Type in the comments box and click submit

// Import modules
var http = require('http');
var fs = require('fs');
var qs = require('querystring');

// Create server
http.createServer(function (req, res) {
    if (req.url === "/") {
        // Display form
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(fs.readFileSync("./comments.html"));
    } else if (req.url === "/comments.json") {
        // Display comments
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(fs.readFileSync("./comments.json"));
    } else if (req.url === "/comment") {
        // Process comment
        var reqBody = '';
        req.on('data', function (data) {
            reqBody += data;
        });
        req.on('end', function () {
            var comment = qs.parse(reqBody);
            console.log(comment);
            // Save comment
            var comments = JSON.parse(fs.readFileSync("./comments.json"));
            comments.push(comment);
            fs.writeFileSync("./comments.json", JSON.stringify(comments));
            // Return to home page
            res.writeHead(302, { "Location": "/" });
            res.end();
        });
    } else {
        // Display 404
        res.writeHead(404);
        res.end("404 Not Found");
    }
}).listen(8000);
