var request = require('http');

describe('async', function () {
    it('Server should respond to /', function (){
        request.get('http://127.0.0.1:8124', function(response){
            expect(response.statusCode).toBe(200);
        });
    });
});
