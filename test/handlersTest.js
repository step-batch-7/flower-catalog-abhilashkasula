const request = require('supertest');
const {app} = require('../lib/handlers');

const statusCodes = {
  'OK': 200
};

describe('GET homepage', () => {
  it('should get home.html / path', (done) => {
    request(app.handleRequest.bind(app))
      .get('/')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'text/html')
      .expect('Content-length', '815')
      .expect(/abeliophyllum.html/)
      .expect(/ageratum.html/)
      .expect(/guestBook.html/, done);
  });
  
  it('should get index.css for /css/index.css path', (done) => {
    request(app.handleRequest.bind(app))
      .get('/css/index.css')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'text/css')
      .expect('Content-length', '787')
      .expect(/.header {/, done);
  });

  it('should get hideWaterJug.js for /js/hideWaterJug.js path', (done) => {
    request(app.handleRequest.bind(app))
      .get('/js/hideWaterJug.js')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'application/javascript')
      .expect('Content-length', '269')
      .expect(/hide /, done);
  });

  it('should get freshorigins image for /images/freshorigins.jpg', (done) => {
    request(app.handleRequest.bind(app))
      .get('/images/freshorigins.jpg')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'image/jpg')
      .expect('Content-length', '381314', done);
  });

  it('should get water-can gif for /images/watering-can.gif', (done) => {
    request(app.handleRequest.bind(app))
      .get('/images/watering-can.gif')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'image/gif')
      .expect('Content-length', '65088', done);
  });
});
