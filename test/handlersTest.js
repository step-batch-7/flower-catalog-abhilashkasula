const request = require('supertest');
const {app} = require('../lib/handlers');

const statusCodes = {
  'OK': 200
};

describe('GET homepage', function() {
  it('should should get the homepage / path', function(done) {
    request(app.handleRequest.bind(app))
      .get('/')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'text/html')
      .expect('Content-length', '815', done)
      .expect(/abeliophyllum.html/)
      .expect(/ageratum.html/)
      .expect(/guestBook.html/);
  });
});
