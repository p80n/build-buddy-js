const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();
const fs = require('fs');

// const assert = require('assert');
// describe('Array', function () {
//   describe('#indexOf()', function () {
//     it('should return -1 when the value is not present', function () {
//       assert.equal([1, 2, 3].indexOf(4), -1);
//     });
//   });
// });

const jsonPayload = fs.readFileSync('test/data/github_webhook_payload.json', 'utf8');



chai.use(chaiHttp);

describe('/build', () => {

  describe('GET not implemented', () => {
    it('should 404', (done) => {
      chai.request(server)
        .get('/build')
        .end((err, res) => {
          res.should.have.status(404);
          done();
      });
    });
  });

  describe('POST from GitHub', function() {
    this.timeout(60000);

    it('triggers an image build', (done) => {
      chai.request(server)
        .post('/build')
        .send(JSON.parse(jsonPayload))
        .end((err, res) => {
          res.should.have.status(200);

          // payload = JSON.parse(jsonPayload);
          // payload.repository.clone_url.should.equal("https://github.com/Codertocat/Hello-World.git");

          done();
        });
    });
  });
});
