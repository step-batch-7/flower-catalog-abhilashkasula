const fs = require('fs');
const Response = require('./lib/response');
const CONTENT_TYPES = require('./lib/mimeTypes');
const {loadTemplate} = require('./lib/viewTemplate');
const STATIC_FOLDER = `${__dirname}/public`;

const serveStaticFile = (req, optionalUrl) => {
  const path = `${STATIC_FOLDER}${optionalUrl || req.url}`;
  const stat = fs.existsSync(path) && fs.statSync(path);
  if (!stat || !stat.isFile()) return new Response();
  const [, extension] = path.match(/.*\.(.*)$/) || [];
  const contentType = CONTENT_TYPES[extension];
  const content = fs.readFileSync(path);
  const res = new Response();
  res.setHeader('Content-Type', contentType);
  res.setHeader('Content-Length', content.length);
  res.statusCode = 200;
  res.body = content;
  return res;
}

const saveCommentAndRedirect = function(req) {
  const comments = JSON.parse(fs.readFileSync('./data/comments.json'));
  const date = new Date().toGMTString();
  const {name, comment} = req.body;
  comments.push({date, name, comment});
  fs.writeFileSync('./data/comments.json',JSON.stringify(comments), 'utf8');
  return serveGuestBookPage(req);
};

const generateComments = () => {
  const comments = JSON.parse(fs.readFileSync('./data/comments.json'));
  const generateComment = function(commentsHtml, comment) {
    const html = `<tbody><td>${comment.date}</td>
      <td>${comment.name}</td>
      <td>${comment.comment}</td></tbody>`;
    return html + commentsHtml;
  };
  const html = comments.reduce(generateComment,'');
  console.log(html);
  return html;
};

const serveHomePage = function(req) {
  return serveStaticFile(req, '/home.html');
};

const serveGuestBookPage = function(req) {
  const commentsHtml = generateComments();
  const html = loadTemplate('guestBook.html', {COMMENTS: commentsHtml});
  const res = new Response();
  res.setHeader('Content-Type', CONTENT_TYPES.html);
  res.setHeader('Content-Length', html.length);
  res.statusCode = 200;
  res.body = html;
  return res;
}

const findHandler = (req) => {
  if(req.method === 'GET' && req.url === '/') return serveHomePage;
  if(req.method === 'POST' && req.url === '/saveComment') return saveCommentAndRedirect;
  if(req.method === 'GET' && req.url === '/guestBook.html') return serveGuestBookPage;
  if(req.method === 'GET') return serveStaticFile;
  return () => new Response();
}
const processRequest = (req) => {
  const handler = findHandler(req);
  return handler(req);
}

module.exports = {processRequest};