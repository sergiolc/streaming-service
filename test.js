
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect  = require('chai').expect;

var app = require('./app');


chai.use(chaiHttp);


describe('Streaming service tests', () => {

    it('Should return user streams count', (done) => {
        chai.request(app)
            .get('/users/1/streams')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.count).to.equal(0);
                done();
            });
    });

});



