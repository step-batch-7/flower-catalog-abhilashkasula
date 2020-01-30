const {Server} = require('http');
const App = require('./app');
const handlers = require('./handlers');
const defaultPort = 4000;

const app = new App();

app.get('/guestBook.html', handlers.serveGuestBookPage);
app.get('', handlers.serveStaticFile);
app.get('', handlers.serveNotFound);

app.use(handlers.readBody);

app.post('/saveComment', handlers.saveCommentAndRedirect);
app.post('', handlers.serveNotFound);

app.use(handlers.serveBadRequest);

const main = (port = defaultPort) => {
  const server = new Server(app.handleRequest.bind(app));
  server.listen(port, () => process.stdout.write('server is listening.'));
};

const [,, port] = process.argv;

main(port);
