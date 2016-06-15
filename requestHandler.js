var ynabService = require('./ynabService');
var mondoService = require('./mondoService');

function send(response, request) {
  var requestBody;
  request.on('data', function(dataChunk) {
    requestBody = dataChunk;
  });
  request.on('end', function() {
    response.writeHead(200, {'Content-Type':'application/json'});
    response.write(requestBody);
    response.end();
  });
}

function login(response, request) {
  var requestBody;
  request.on('data', function(dataChunk) {
    requestBody = dataChunk;
  });
  request.on('end', function() {
    response.setHeader("X-Session-Token","12345");
    response.writeHead(200, {'Content-Type':'application/json'});
    response.write(requestBody);
    response.end();
  });
}


function registerYnabTransaction(response, request) {
  if (request.method == 'POST') {
    var jsonString = '';

    request.on('data', function (data) {
        jsonString += data;
    });

    request.on('end', function () {
      var requestData = JSON.parse(jsonString);
      if(requestData.type && requestData.type === "transaction.created") {
        var transaction = mondoService.convertMondoTransaction(requestData.data);
        ynabService.registerTransaction(transaction);
      }
    });
  } else {
    var transaction = mondoService.convertMondoTransaction();
    ynabService.registerTransaction(transaction, response);
  }
}

exports.send=send;
exports.registerYnabTransaction = registerYnabTransaction;
exports.login = login;
