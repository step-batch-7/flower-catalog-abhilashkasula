const { Server } = require('http');
const App = require('./app');
const handlers = require('./handlers');

const app = new App();

app.get('/guestBook.html', handlers.serveGuestBookPage);
app.get('', handlers.serveStaticFile);
app.get('', handlers.serveNotFound);
app.use(handlers.readBody);
app.post('/saveComment', handlers.saveCommentAndRedirect);
app.post('', handlers.serveNotFound);
app.use(handlers.serveBadRequest);

const main = (port=4000) => {
  const server = new Server(app.connectionListener.bind(app));
  server.listen(port, () => console.log('server is listening at ', server.address()));
}
main(process.argv[2]);
