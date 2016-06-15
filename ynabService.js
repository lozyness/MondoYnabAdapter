var request = require('request');
var querystring = require("querystring");
var config = require("./config");
var uuid = require("uuid");

function registerTransaction(response, content, code) {
  console.log(response);
  console.log(content);
  console.log(code);
  // var username = config.ynab.email;
  // var pass = config.ynab.password;
  // var requestString = '{"email":"<username>","password":"<password>","remember_me":false}';
  // requestString = requestString.replace("<username>", username);
  // requestString = requestString.replace("<password>", pass);
  //
  // // var requestString = '{ "email": '+config.ynab.email+', "password": '+config.ynab.email+', "remember_me": false, "device_info": { "id": "ebe5e002-c705-45be-826b-8c87afc7ba0c" } }';
  // var hostname = "http://app.youneedabudget.com/api/v1";
  // var loginUrl = hostname+"/catalog";
  // var sendUrl = hostname+"/catalog";
  //
  // var deviceId = "0c9bb882-5046-488d-95c1-1147736719f6";
  // var requestId = "a484dcbc-eb11-429a-8810-431676e6e97d";
  // var userAgent = "Lozyness: Lozyness@gmail.com: mondo - ynab adapter";
  //
  // var headers = {
  //   "X-YNAB-Device-Id": deviceId,
  //   "User-Agent": userAgent,
  //   "X-YNAB-Client-Request-Id": requestId,
  //   "Accept": "application/json"
  // };
  // debugger;
  // request({
  //     uri: "http://app.youneedabudget.com/api/v1/catalog",
  //     method: "POST",
  //     headers: headers,
  //     form: {
  //       request_data: requestString,
  //       operation_name: 'loginUser'
  //     }
  //   },
  //   function (error, response, body) {
  //     debugger;
  //     if(!error && response.statusCode == "200") {
  //       debugger;
  //       response.write("Successful");
  //       var bodyContents = JSON.parse(body);
  //       sessionToken = bodyContents['session_token'];
  //       addTransaction(sessionToken);
  //     } else {
  //       debugger;
  //       response.write("Unsuccessful: ");
  //       response.write("Code: "+response.statusCode);
  //       response.write("Error: "+error);
  //     }
  //     response.end();
  //   }
  // );
  //

  var login = function (originalResponse) {

    var deviceId = "0c9bb882-5046-488d-95c1-1147736719f6";
    var requestId = "a484dcbc-eb11-429a-8810-431676e6e97d";
    var userAgent = "Lozyness: Lozyness@gmail.com: mondo - ynab adapter";
    var appVersion = "v1.11404"; // don't need anymore
    // var username = "laura.turley89@gmail.com";
    // var pass = "BlueBellChipmunk";

    var username = config.ynab.email;
    var pass = config.ynab.password;
    var hostname = "https://app.youneedabudget.com/api/v1/catalog"
    var operation = "loginUser";
    var sessionToken = "Not Set";
    var headers = {
      "X-YNAB-Device-Id": deviceId,
      "User-Agent": userAgent,
      "X-YNAB-Client-Request-Id": requestId,
      "Accept": "application/json"
    };
    var requestString = '{"email":"<username>","password":"<password>","remember_me":false}';
    requestString = requestString.replace("<username>", username);
    requestString = requestString.replace("<password>", pass);
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
        debugger;
        if(!error && response.statusCode == "200") {
          debugger;
          // originalResponse.write("Successful");
          var bodyContents = JSON.parse(body);
          sessionToken = bodyContents['session_token'];
          addTransaction(sessionToken);
          // originalResponse.write(sessionToken);
        } else {
          debugger;
          // originalResponse.write("Unsuccessful: ");
          // originalResponse.write("Code: "+response.statusCode);
          // originalResponse.write("Error: "+error);
        }
        // originalResponse.end();
      }
    );
  }
  login(response);


  var addTransaction = function(sessionToken, transaction) {

    var deviceId = "0c9bb882-5046-488d-95c1-1147736719f6";
    var requestId = "a484dcbc-eb11-429a-8810-431676e6e97d";
    var userAgent = "Lozyness: Lozyness@gmail.com: mondo - ynab adapter";

    var hostname = "https://app.youneedabudget.com/api/v1/catalog";

    var headers = {
      "X-YNAB-Device-Id": deviceId,
      "User-Agent": userAgent,
      "X-YNAB-Client-Request-Id": requestId,
      "Accept": "application/json"
    };
    headers['X-Session-Token'] = sessionToken;

    var template = '{"budget_version_id":"5ba2ce8e-0392-4d64-bf73-3f1ba338dc06","starting_device_knowledge":34,"ending_device_knowledge":35,"device_knowledge_of_server":381,"calculated_entities_included":false,"changed_entities":{"be_transaction_groups":[{"id":"55b2f669-c05d-415e-a78b-73cdabb95e9c","be_transaction":{"id":"55b2f669-c05d-415e-a78b-73cdabb95e9c","is_tombstone":false,"source":null,"entities_account_id":"cac2049b-e191-492e-b0cf-f3cf8c463e0e","entities_payee_id":"b6c7d257-e13b-4866-92bc-f27e4295cb6b","entities_subcategory_id":"4523fa62-c6ac-4f9e-8113-de956cac7438","entities_scheduled_transaction_id":null,"date":"2016-06-11","date_entered_from_schedule":null,"amount":-12000,"cash_amount":0,"credit_amount":0,"subcategory_credit_amount_preceding":0,"memo":"","cleared":"Uncleared","accepted":true,"check_number":null,"flag":null,"transfer_account_id":null,"transfer_transaction_id":null,"transfer_subtransaction_id":null,"matched_transaction_id":null,"ynab_id":null,"imported_payee":null,"imported_date":null},"be_subtransactions":null,"be_matched_transaction":null}]}}';
    var template = JSON.parse(template);

    var id = uuid.v1();

    template.budget_version_id = "5ba2ce8e-0392-4d64-bf73-3f1ba338dc06";
    template.starting_device_knowledge = 13;
    template.ending_device_knowledge = 14;
    template.device_knowledge_of_server = 390;
    template.changed_entities.be_transaction_groups[0].id = id;
    template.changed_entities.be_transaction_groups[0].be_transaction.id = id;
    template.changed_entities.be_transaction_groups[0].be_transaction.entities_account_id= "cac2049b-e191-492e-b0cf-f3cf8c463e0e";
    template.changed_entities.be_transaction_groups[0].be_transaction.entities_payee_id= "b6c7d257-e13b-4866-92bc-f27e4295cb6b";
    template.changed_entities.be_transaction_groups[0].be_transaction.entities_subcategory_id= "4523fa62-c6ac-4f9e-8113-de956cac7438";
    template.changed_entities.be_transaction_groups[0].be_transaction.date= "2016-06-06";
    template.changed_entities.be_transaction_groups[0].be_transaction.amount= "-104000";

    requestString = JSON.stringify(template);
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
        debugger;

        if(!error && response.statusCode !== "200") {
          debugger;
          console.log("Successful");
        } else {
          console.log("Unsuccessful");
          debugger;
          // response.write("Unsuccessful: ");
          // response.write("Code: "+response.statusCode);
          // response.write("Error: "+error);
        }
        // response.end();
      }
    );
  }
}

// var loginOptions = {
//   uri: sendUrl,
//   method: "POST",
//   headers: {
//     "X-YNAB-Device-Id": "ebe5e002-c705-45be-826b-8c87afc7ba0c",
//     "User-Agent": "nodejs nYNAB API bot - lozyness lozyness@gmail.com",
//     "X-YNAB-Client-App-Version": "build/staging/v0.6.10784",
//     "X-YNAB-Client-Request-Id": "a484dcbc-eb11-429a-8810-431676e6e97d"
//   },
//   form: {
//     operation_name: "loginUser",
//     request_data: requestData
//   }
// };
//
// function registerTransaction(transaction, response) {
//   login(transaction, response, function());
// }
//
// function login(postLoginStep) {
//     request(loginOptions, onLogin);
// }
//
// function onLogin(error, response, body) {
//   if(!error && response.statusCode == 200) {
//     var sessionToken = response.headers['x-session-token'];
//     var pushTransactionRequestOptions = {
//       uri: "http://localhost:8888/send",
//       method: "POST",
//       headers: {
//         "X-YNAB-Device-Id": "ebe5e002-c705-45be-826b-8c87afc7ba0c",
//         "User-Agent": "nodejs nYNAB API bot - lozyness lozyness@gmail.com",
//         "X-YNAB-Client-App-Version": "build/staging/v0.6.10784",
//         "X-YNAB-Client-Request-Id": "a484dcbc-eb11-429a-8810-431676e6e97d",
//         "X-Session-Token": sessionToken
//       },
//       form: {
//         operation_name: "syncBudgetData",
//         request_data: requestData
//       }
//     };
//     request(pushTransactionRequestOptions, onPush);
//   }
// }
//
//
//
// function onPush(error, response, body) {
//   console.log("Here");
//   debugger;
//   if(!error && response.statusCode !== "200") {
//     response.write("Successful");
//   } else {
//     response.write("Unsuccessful: ");
//     response.write("Code: "+response.statusCode);
//     response.write("Error: "+error);
//   }
//   response.end();
// }
//
exports.registerTransaction = registerTransaction;
