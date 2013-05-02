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
});
