
var chai = require('chai');
var async = require('async');
var chaiHttp = require('chai-http');
var expect = require('chai').expect;

var app = require('./app');


chai.use(chaiHttp);


describe('Streaming service tests', () => {

    before((done) => {

        async.series([

            (next) => {
                chai.request(app)
                    .put('/users/1/streams')
                    .send({ count: 3 })
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body.count).to.equal(3);
                        next();
                    });
            },

            (next) => {
                chai.request(app)
                    .put('/users/2/streams')
                    .send({ count: 4 })
                    .end((err, res) => {
                        expect(res.status).to.equal(200);
                        expect(res.body.count).to.equal(4);
                        next();
                    });
            }
        ], done);
    });

    it('Should return user streams count and status OK', (done) => {
        chai.request(app)
            .get('/users/1/streams')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.count).to.equal(3);
                expect(res.body.status).to.equal('OK');
                done();
            });
    });

    it('Should return user streams count and status NOT_ALLOWED', (done) => {
        chai.request(app)
            .get('/users/2/streams')
            .end((err, res) => {
                expect(res.status).to.equal(200);
                expect(res.body.count).to.equal(4);
                expect(res.body.status).to.equal('NOT_ALLOWED');
                done();
            });
    });

});



