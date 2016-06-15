var server = require('./server');
var route = require('./router').route;
var requestHandler = require('./requestHandler');
var handlers = [];
handlers['/'] = requestHandler.registerYnabTransaction;
handlers['/send'] = requestHandler.send;
handlers['/login'] = requestHandler.login;
server.start(route, handlers);
