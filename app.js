const didMatch = function(route, req) {
  if(route.method)
    return route.method == req.method && req.url.match(route.location);
  return true;
};

class App {
  constructor() {
    this.routes = [];
  }

  get(location, handler) {
    this.routes.push({ location, handler, method: 'GET' });
  }

  use(handler) {
    this.routes.push({ handler });
  }

  post(location, handler) {
    this.routes.push({ location, handler, method:'POST' });
  }

  connectionListener(req, res) {
    const matchedRoutes = this.routes.filter(route => didMatch(route, req));
      const next = function() {
      const route = matchedRoutes.shift();
      route.handler(req, res, next);
    }
    next();
  }
}

module.exports = App;