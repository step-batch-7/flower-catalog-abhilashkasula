const { Server } = require('http');
const {processRequest} = require('./app');

const main = (port=4000) => {
  const server = new Server(processRequest);
  server.listen(port, () => console.log('server is listening at ', server.address()));
}
main(process.argv[2]);