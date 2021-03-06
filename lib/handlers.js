const fs = require('fs');
const App = require('./app');
const CONTENT_TYPES = require('./mimeTypes');
const {loadTemplate} = require('./viewTemplate');
const {COMMENTS_PATH} = require('../config');
const STATIC_FOLDER = `${__dirname}/../public`;

const getUrl = function(url) {
  return url === '/' ? '/home.html' : url;
};

const areStatsNotOk = function(stat) {
  return !stat || !stat.isFile();
};

const serveStaticFile = function(req, res, next) {
  const reqUrl = getUrl(req.url);
  const path = `${STATIC_FOLDER}${reqUrl}`;
  const stat = fs.existsSync(path) && fs.statSync(path);
  if (areStatsNotOk(stat)) {
    return next();
  }
  const [, extension] = path.match(/.*\.(.*)$/) || [];
  const contentType = CONTENT_TYPES[extension];
  const content = fs.readFileSync(path);
  res.setHeader('Content-Type', contentType);
  res.end(content);
};

const loadComments = function() {
  if (fs.existsSync(COMMENTS_PATH)) {
    return JSON.parse(fs.readFileSync(COMMENTS_PATH) || '[]');
  }
  return [];
};

const replaceUnknownChars = function(text) {
  return decodeURIComponent(text).replace(/\+/g, ' ');
};

const redirectTo = function(res, url) {
  res.setHeader('Location', url);
  res.statusCode = 301;
  res.end();
};

const saveCommentAndRedirect = function(req, res) {
  const comments = loadComments();
  const date = new Date();
  const {name, comment} = req.body;
  const [nameText, commentText] = [name, comment].map(replaceUnknownChars);
  comments.push({date, name: nameText, comment: commentText});
  fs.writeFileSync(COMMENTS_PATH, JSON.stringify(comments), 'utf8');
  return redirectTo(res, '/guestBook.html');
};

const pickupParams = (query, keyValue) => {
  const [key, value] = keyValue.split('=');
  query[key] = value;
  return query;
};

const readBody = function(req, res, next) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    req.body = data.split('&').reduce(pickupParams, {});
    next();
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
  return comments.reduce(generateComment, '');
};

const serveGuestBookPage = function(req, res) {
  const commentsHtml = generateComments();
  const html = loadTemplate('guestBook.html', {COMMENTS: commentsHtml});
  res.setHeader('Content-Type', CONTENT_TYPES.html);
  res.end(html);
};

const serveNotFound = function(req, res) {
  res.statusCode = 404;
  res.end('Not Found');
};

const serveBadRequest = function(req, res) {
  res.statusCode = 405;
  res.end('Method Not Allowed');
};

const app = new App();

app.get('/guestBook.html', serveGuestBookPage);
app.get('', serveStaticFile);
app.get('', serveNotFound);

app.use(readBody);

app.post('/saveComment', saveCommentAndRedirect);
app.post('', serveNotFound);

app.use(serveBadRequest);

module.exports = {app};
