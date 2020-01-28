const fs = require('fs');
const CONTENT_TYPES = require('./lib/mimeTypes');
const {loadTemplate} = require('./lib/viewTemplate');
const STATIC_FOLDER = `${__dirname}/public`;
const SYMBOLS = require('./lib/symbols');

const serveStaticFile = (req, res, optionalUrl) => {
  const path = `${STATIC_FOLDER}${optionalUrl || req.url}`;
  const stat = fs.existsSync(path) && fs.statSync(path);
  if (!stat || !stat.isFile()) return serveNotFoundPage(req, res);
  const [, extension] = path.match(/.*\.(.*)$/) || [];
  const contentType = CONTENT_TYPES[extension];
  const content = fs.readFileSync(path);
  res.setHeader('Content-Type', contentType);
  res.end(content);
}

const loadComments = function() {
  const COMMENTS_PATH = './data/comments.json';
  if(fs.existsSync(COMMENTS_PATH)) {
    return JSON.parse(fs.readFileSync(COMMENTS_PATH));
  }
  return [];
};

const redirectTo = function(res, url) {
  res.setHeader('Location', url);
  res.statusCode = 301;
  res.end();
}

const replaceUnknownChars = function(text, character) {
  const regEx = new RegExp(`${character}`, 'g');
  return text.replace(regEx, SYMBOLS[character]);
};

const pickupParams = (query,keyValue)=>{
  const [key,value] = keyValue.split('=');
  query[key] = value;
  return query;
};

const readParams = keyValueTextPairs => keyValueTextPairs.split('&').reduce(pickupParams,{});

const saveCommentAndRedirect = function(req, res) {
  const comments = loadComments();
  const date = new Date();
  let data = '';
  req.on('data', text => data += text);
  req.on('end', () => {
    const {name, comment} = readParams(data);
    const keys = Object.keys(SYMBOLS);
    const [nameText, commentText] = [name, comment].map(text => keys.reduce(replaceUnknownChars, text));
    comments.push({date, name: nameText, comment: commentText});
    fs.writeFileSync('./data/comments.json',JSON.stringify(comments), 'utf8');
    return redirectTo(res, '/guestBook.html');
  });
};

const generateComment = function(commentsHtml, commentDetail) {
  const {date, comment, name} = commentDetail;
  const originalComment = comment.replace(/\n/g, '</br>');
  const html = `<tbody><td>${new Date(date).toGMTString()}</td>
    <td>${name}</td>
    <td class="comment">${originalComment}</td></tbody>`;
  return html + commentsHtml;
};

const generateComments = () => {
  const comments = loadComments();
  return comments.reduce(generateComment,'');
};

const serveHomePage = function(req, res) {
  return serveStaticFile(req, res, '/home.html');
};

const serveGuestBookPage = function(req, res) {
  const commentsHtml = generateComments();
  const html = loadTemplate('guestBook.html', {COMMENTS: commentsHtml});
  res.setHeader('Content-Type', CONTENT_TYPES.html);
  res.end(html);
}

const serveNotFoundPage = function(req, res) {
  res.statusCode = 404;
  res.end('Not Found');
}

const findHandler = (req) => {
  if(req.method === 'GET' && req.url === '/') return serveHomePage;
  if(req.method === 'POST' && req.url === '/saveComment') return saveCommentAndRedirect;
  if(req.method === 'GET' && req.url === '/guestBook.html') return serveGuestBookPage;
  if(req.method === 'GET') return serveStaticFile;
  return serveNotFoundPage;
}
const processRequest = (req, res) => {
  const handler = findHandler(req);
  return handler(req, res);
}

module.exports = {processRequest};