var http = require('http')
    , url = require('url')
    , fs = require('fs')
    , querystring = require('querystring')
    , mustache = require('mustache')
    , port = process.env.NODE_ENV == 'prod' ? '/tmp/node.socket' : 8124
    , root_path = process.env.TPL_PATH
    , index_template = fs.readFileSync(root_path + '/index.html', 'utf8')
;

var render_home = function(req, res){
    var view = {
        title: "Raspberry PI"
    };
    html = mustache.to_html(index_template, view);
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write(html);
    res.end();
};

var render_files = function(req, res, path){
    fs.readFile(__dirname + path, function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        res.writeHead(200);
        res.end(data);
    });
};

var metric_endpoint = function(req, res){
    req.on('data', function(chunk) {
        console.log(chunk.toString('utf-8'));
    });


    var body = '';
    req.on('data', function (chunk) {
        body += chunk;
        // 1e6 === 1 * Math.pow(10, 6) === 1 * 1000000 ~~~ 1MB
        if (body.length > 1e6) {
            req.connection.destroy(); // TODO: return 413 instead.
        }
    });
    // TODO: Add timeouts
    req.on('end', function () {
        var req_data = querystring.parse(body);
        res.writeHead(200, {'Content-Type':'text/json'});
        data = JSON.stringify(req_data);
        res.write(data);
        res.end();
    });
};

http.createServer(function(req,res) {
    var path = url.parse(req.url).pathname;
    console.log(path);

    switch(path) {
        case '/':
            render_home(req, res);
            break;
        case '/metric/':
            metric_endpoint(req, res);
            break;
        default:
            render_files(req, res, path);
    };
}).listen(port);
