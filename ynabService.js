var request = require('request');
var querystring = require("querystring");
var config = require("./config");
var uuid = require("uuid");

var hostname = "https://app.youneedabudget.com/api/v1/catalog"

function registerTransaction(transaction, response) {

  login()
      .then(function (sessionToken) {
        return addTransaction(sessionToken, transaction);
      })
      .then(function() {
        response.writeHead(200, {"Content-Type": "text/plain"});
        response.write("Complete");
        response.end();
      })
      .catch(function (code, message) {
        response.writeHead(code, {"Content-Type": "text/plain"});
        response.write(message);
        response.end();
      })
}

function getBasicHeaders() {
  var deviceId = "0c9bb882-5046-488d-95c1-1147736719f6";
  var requestId = "a484dcbc-eb11-429a-8810-431676e6e97d";
  var userAgent = "Lozyness: Lozyness@gmail.com: mondo - ynab adapter";
  var headers = {
    "X-YNAB-Device-Id": deviceId,
    "User-Agent": userAgent,
    "X-YNAB-Client-Request-Id": requestId,
    "Accept": "application/json"
  };
  return headers;
}

function login() {

  function getUser() {
    var username = config.ynab.email;
    var pass = config.ynab.password;
    return {
      'username': username,
      'password': pass
    }
  }

  function getHeaders() {
    return getBasicHeaders();
  }

  function getRequestString(username, password) {
    var requestString = '{"email":"<username>","password":"<password>","remember_me":false}';
    requestString = requestString.replace("<username>", username);
    requestString = requestString.replace("<password>", password);
    return requestString;
  }

  var user = getUser();
  var username = user.username;
  var pass = user.password;
  var requestString = getRequestString(username, pass);
  var headers = getHeaders();
  return new Promise(function (fulfill, reject) {
    request({
          uri: hostname,
          method: "POST",
          headers: headers,
          form: {
            request_data: requestString,
            operation_name: 'loginUser'
          }
        },
        function (error, response, body) {
          if(!error && response.statusCode == 200) {
            var bodyContents = JSON.parse(body);
            var sessionToken = bodyContents['session_token'];
            fulfill(sessionToken);
          } else {
            reject(response.statusCode, response.statusMessage);
          }
        }
    );
  });
}

function addTransaction(sessionToken, transaction) {

  function getHeaders() {
    var headers = getBasicHeaders();
    headers["X-Session-Token"] = sessionToken;
    return headers;
  }

  function getRequestString(){
    var template = '{"budget_version_id":"5ba2ce8e-0392-4d64-bf73-3f1ba338dc06","starting_device_knowledge":34,"ending_device_knowledge":35,"device_knowledge_of_server":381,"calculated_entities_included":false,"changed_entities":{"be_transaction_groups":[{"id":"55b2f669-c05d-415e-a78b-73cdabb95e9c","be_transaction":{"id":"55b2f669-c05d-415e-a78b-73cdabb95e9c","is_tombstone":false,"source":null,"entities_account_id":"cac2049b-e191-492e-b0cf-f3cf8c463e0e","entities_payee_id":"b6c7d257-e13b-4866-92bc-f27e4295cb6b","entities_subcategory_id":"4523fa62-c6ac-4f9e-8113-de956cac7438","entities_scheduled_transaction_id":null,"date":"2016-06-11","date_entered_from_schedule":null,"amount":-12000,"cash_amount":0,"credit_amount":0,"subcategory_credit_amount_preceding":0,"memo":"","cleared":"Uncleared","accepted":true,"check_number":null,"flag":null,"transfer_account_id":null,"transfer_transaction_id":null,"transfer_subtransaction_id":null,"matched_transaction_id":null,"ynab_id":null,"imported_payee":null,"imported_date":null},"be_subtransactions":null,"be_matched_transaction":null}]}}';
    var template = JSON.parse(template);

    var id = uuid.v1();

    var budgetId = "bec9a840-0f92-45c8-91e7-05ee72087c49";
    var startDK = 13;
    var endDK = 14;
    var dKServer = 390;
    var transId = id;
    var accountId = "2f12da18-d48e-4b8c-959d-f9b86efe1fdb";
    var subCatId = "07b1ab53-87bb-4c7e-a0d3-4b5d80db4b8c";
    var payeeId = "944fad96-145d-4ed6-91a6-e8157802b511";
    var date = transaction.date || "2016-06-06";
    var amount = transaction.amount;
    var memo = transaction.memo || "Automatically entered through mondo integration";

    template.budget_version_id = budgetId;
    template.starting_device_knowledge = startDK;
    template.ending_device_knowledge = endDK;
    template.device_knowledge_of_server = dKServer;
    template.changed_entities.be_transaction_groups[0].id = transId;
    template.changed_entities.be_transaction_groups[0].be_transaction.id = transId;
    template.changed_entities.be_transaction_groups[0].be_transaction.entities_account_id= accountId;
    template.changed_entities.be_transaction_groups[0].be_transaction.entities_payee_id= payeeId;
    template.changed_entities.be_transaction_groups[0].be_transaction.entities_subcategory_id= subCatId;
    template.changed_entities.be_transaction_groups[0].be_transaction.date= date;
    template.changed_entities.be_transaction_groups[0].be_transaction.amount= amount;
    template.changed_entities.be_transaction_groups[0].be_transaction.memo= memo;
    return JSON.stringify(template);
  }

  var headers = getHeaders();
  var requestString = getRequestString(transaction);
  return new Promise( function (fulfill, reject) {
    request({
          uri: hostname,
          method: "POST",
          headers: headers,
          form: {
            request_data: requestString,
            operation_name: 'syncBudgetData'
          }
        },
        function (error, response, body) {
          if(!error && response.statusCode == 200) {
            fulfill();
          } else {
            reject(response.statusCode, response.statusMessage);
          }
        }
    );
  });
}

exports.registerTransaction = registerTransaction;
