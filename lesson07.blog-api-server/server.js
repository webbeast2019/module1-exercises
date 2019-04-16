const http = require('http');
const fs = require('fs');
const url = require('url');
const _ = require('./lodash.min');
const api = require('./api.js');

const port = 8080;
const rawData={
    posts : false,
    comments : false
};

fs.readFile("./data/post.json", function (err, data) {
    rawData.posts = data;
});
fs.readFile("./data/comment.json", function (err, data) {
    rawData.comments = data;
});

http.createServer(function (req, res) {
    const q = url.parse(req.url, true);

    // load index.html
    if (q.pathname === "/") {
        fs.readFile("public/index.html", function (err, data) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.write(data);
            res.end();
        });

        //load files
    } else if (q.pathname.substr(0, 5).toLowerCase() != "/api/") {
        const fileName = q.pathname.substr(1);
        const fileTypes = {
            'html': 'text/html',
            'htm': 'text/html',
            'css': 'text/css',
            'js': 'text/javascript',
            'json': 'application/json'
        };
        const fileExt = fileName.split('.').pop();
        const contentType = fileTypes[fileExt];
        if (contentType) {
            fs.readFile("public/" + fileName, function (err, data) {
                if (err) {
                    res.writeHead(404, {'Content-Type': contentType});
                    res.end();
                } else {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    res.end();
                }
            });
        } else {
            res.writeHead(404, {'Content-Type': 'text/html'});
            res.end();
        }

        // Load API
    } else {
        const path = q.pathname.split('/');
        let data = '';
        if (req.method ==='GET'){
            switch (path.length) {
                case 3:
                    if ( q.query['sortBy']){
                        data = api.getData(_.sortBy(rawData[path[2]],q.query['sortBy']), q.query);
                    }else {
                        data = api.getData(rawData[path[2]], q.query);
                    }
                    break;
                case 4:
                    data = api.getData(rawData[path[2]],{'id':path[3]});
                    break;
                case 5:
                    data = api.getData(rawData[path[4]],{'postId':path[3]});
                    break;
            }
        }else if (req.method==='POST'){

        }
        res.writeHead(200, {'Content-Type': 'application/json'});
        res.write(JSON.stringify(data));
        res.end();
    }
}).listen(port, function () {
    console.log('Client is available at http://localhost:' + port);
});