var http = require('http');

describe('async', function () {
    it('Server should respond to /', function (done){
        http.get('http://127.0.0.1:8124', function(response){
            expect(response.statusCode).toBe(200);
            done();
        });
    });

    it('Can render home', function (done){
        var body = '';
        http.get('http://127.0.0.1:8124', function(response){
            response.on('data', function (chunk) {
                body += chunk;
                expect(body).toMatch(/Raspberry/);
                done();
            });
        });
    });

    it('Can serve static content', function(done){
        var body = '';
        http.get('http://127.0.0.1:8124/static/js/bootstrap.min.js', function(response){
            response.on('data', function (chunk) {
                body += chunk;
                expect(body).toMatch(/Bootstrap/);
                done();
            });
        });
    });

    it('metrics endpoint responds to post', function (done){
        var options = {
          hostname: '127.0.0.1',
          port: 8124,
          path: '/metric/',
          method: 'POST'
        };
        var req = http.request(options, function(response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
              expect(response.statusCode).toBe(200);
              done();
          });
        });
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
        req.write('wahoo\n');
        req.end();
    });

    it('post to metrics returns a json object', function (done){
        var options = {
          hostname: '127.0.0.1',
          port: 8124,
          path: '/metric/',
          method: 'POST'
        };
        var req = http.request(options, function(response) {
          response.setEncoding('utf8');
          response.on('data', function (chunk) {
              parsed_data = JSON.parse(chunk);
              expect(parsed_data).toEqual({ a:1, b:2, c:3 });
              done();
          });
        });
        req.on('error', function(e) {
          console.log('problem with request: ' + e.message);
        });
        req.write('wahoo\n');
        req.end();
    });
});
