var request = require('http');

describe('async', function () {
    it('Server should respond to /', function (){
        request.get('http://127.0.0.1:8124', function(response){
            expect(response.statusCode).toBe(200);
        });
    });

    it('Can render home', function (){
        request.get('http://127.0.0.1:8124', function(response){
            expect(response.data).toMatch(/Raspberry/);
        });
    });

    it('Can serve static content', function(){
        request.get('http://127.0.0.1:8124/static/js/bootstrap.min.js', function(response){
            expect(response.statusCode).toBe(200);
            expect(response.data).toMatch(/Bootstrap/);
        });
    });
});
