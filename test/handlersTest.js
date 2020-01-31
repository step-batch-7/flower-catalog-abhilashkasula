const request = require('supertest');
const {app} = require('../lib/handlers');

const statusCodes = {
  'OK': 200
};

describe('GET Home page', () => {
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

describe('GET Abeliophyllum page', () => {
  it('should get abeliophyllum.html for /abeliophyllum.html', (done) => {
    request(app.handleRequest.bind(app))
      .get('/abeliophyllum.html')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'text/html')
      .expect('Content-length', '1666')
      .expect(/<title>Abeliophyllum<\/title>/, done);
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

  it('should get abeliophyllum for /images/abeliophyllum.jpg path', (done) => {
    request(app.handleRequest.bind(app))
      .get('/images/abeliophyllum.jpg')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'image/jpg')
      .expect('Content-length', '87413', done);
  });

  it('should get Abeliophyllum pdf for /assets/abeliophyllum.pdf', (done) => {
    request(app.handleRequest.bind(app))
      .get('/assets/abeliophyllum.pdf')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'application/pdf')
      .expect('Content-length', '35864', done);
  });
});

describe('GET Ageratum page', () => {
  it('should get ageratum.html for /ageratum.html', (done) => {
    request(app.handleRequest.bind(app))
      .get('/ageratum.html')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'text/html')
      .expect('Content-length', '1415')
      .expect(/<title>Ageratum<\/title>/, done);
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

  it('should get ageratum for /images/ageratum.jpg path', (done) => {
    request(app.handleRequest.bind(app))
      .get('/images/ageratum.jpg')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'image/jpg')
      .expect('Content-length', '55554', done);
  });

  it('should get Ageratum pdf for /assets/ageratum.pdf', (done) => {
    request(app.handleRequest.bind(app))
      .get('/assets/ageratum.pdf')
      .set('Accept', '*/*')
      .expect(statusCodes.OK)
      .expect('Content-Type', 'application/pdf')
      .expect('Content-length', '140228', done);
  });
});
