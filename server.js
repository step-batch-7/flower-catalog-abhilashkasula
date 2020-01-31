const {Server} = require('http');
const {app} = require('./handlers');
const defaultPort = 4000;

const main = (port = defaultPort) => {
  const server = new Server(app.handleRequest.bind(app));
  server.listen(port, () => process.stdout.write('server is listening.'));
};

const [, , port] = process.argv;

main(port);
