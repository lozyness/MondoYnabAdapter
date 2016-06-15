var http = require('http');

function start(route, handlers) {
  function onRequest(request, response) {
    route(request, response, handlers);
  }
  http.createServer(onRequest).listen(8888);
  console.log("Server started, listening on port 8888");
}

exports.start = start;
