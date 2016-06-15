var request = require('request');
var querystring = require('querystring');
var uuid = require('uuid');

var deviceId = "0c9bb882-5046-488d-95c1-1147736719f6";
var requestId = "a484dcbc-eb11-429a-8810-431676e6e97d";
var userAgent = "Lozyness: Lozyness@gmail.com: mondo - ynab adapter";
var appVersion = "v1.11383";
var username = "laura.turley89@gmail.com";
var pass = "BlueBellChipmunk";
var hostname = "https://app.youneedabudget.com/api/v1/catalog"
var operation = "loginUser";
var sessionToken = "WzIwMDMxMjIsIjY0MWEyNmZlLTQyNjAtNGZjNC1hOWRmLWE0NTRmNGFjODY5MiIsImZvcmdldCIsIiQyYSQxMCQ5YUxKZVVQT1R4T1Jqejk3aHU0eEtlIl0=--ebac97eea1c5d07d43c267d40a04f52073d9f28e";
var id = uuid.v1();
var headers = {
  "X-YNAB-Device-Id": deviceId,
  "User-Agent": userAgent,
  "X-YNAB-Client-Request-Id": requestId,
  "X-Session-Token": sessionToken,
  "Accept": "application/json"
};
// var requestString = '{"email":"<username>","password":"<password>","remember_me":false}';
// var requestString = '{"user_id":"678d03b1-f2e4-4ed4-99dd-f90f468d09c3","starting_device_knowledge":0,"ending_device_knowledge":0,"device_knowledge_of_server":0,"changed_entities":{}}';
var requestString = '{"budget_version_id":"<budgetId>","starting_device_knowledge":<startingDK>,"ending_device_knowledge":<endingDK>,"device_knowledge_of_server":<DKServer>,"calculated_entities_included":false,"changed_entities":{"be_transaction_groups":[{"id":"<transId>","be_transaction":{"id":"<transId>","is_tombstone":false,"source":null,"entities_account_id":"<accountId>","entities_payee_id":"<payeeId>","entities_subcategory_id":"<subcatId>","entities_scheduled_transaction_id":null,"date":"<date>","date_entered_from_schedule":null,"amount":<amount>,"cash_amount":0,"credit_amount":0,"subcategory_credit_amount_preceding":0,"memo":"","cleared":"Uncleared","accepted":true,"check_number":null,"flag":null,"transfer_account_id":null,"transfer_transaction_id":null,"transfer_subtransaction_id":null,"matched_transaction_id":null,"ynab_id":null,"imported_payee":null,"imported_date":null},"be_subtransactions":null,"be_matched_transaction":null}]}}';
//

var template = '{"budget_version_id":"5ba2ce8e-0392-4d64-bf73-3f1ba338dc06","starting_device_knowledge":34,"ending_device_knowledge":35,"device_knowledge_of_server":381,"calculated_entities_included":false,"changed_entities":{"be_transaction_groups":[{"id":"55b2f669-c05d-415e-a78b-73cdabb95e9c","be_transaction":{"id":"55b2f669-c05d-415e-a78b-73cdabb95e9c","is_tombstone":false,"source":null,"entities_account_id":"cac2049b-e191-492e-b0cf-f3cf8c463e0e","entities_payee_id":"b6c7d257-e13b-4866-92bc-f27e4295cb6b","entities_subcategory_id":"4523fa62-c6ac-4f9e-8113-de956cac7438","entities_scheduled_transaction_id":null,"date":"2016-06-11","date_entered_from_schedule":null,"amount":-12000,"cash_amount":0,"credit_amount":0,"subcategory_credit_amount_preceding":0,"memo":"","cleared":"Uncleared","accepted":true,"check_number":null,"flag":null,"transfer_account_id":null,"transfer_transaction_id":null,"transfer_subtransaction_id":null,"matched_transaction_id":null,"ynab_id":null,"imported_payee":null,"imported_date":null},"be_subtransactions":null,"be_matched_transaction":null}]}}';
var template = JSON.parse(template);

var budgetId = "5ba2ce8e-0392-4d64-bf73-3f1ba338dc06";
var startDK = 13;
var endDK = 14;
var dKServer = 390;
var transId = id;
var accountId = "cac2049b-e191-492e-b0cf-f3cf8c463e0e";
var subCatId = "4523fa62-c6ac-4f9e-8113-de956cac7438";
var payeeId = "b6c7d257-e13b-4866-92bc-f27e4295cb6b";
var date = "2016-06-06";
var amount = "-1000";

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
console.log(template);
console.log(template.changed_entities.be_transaction_groups[0]);
requestString = JSON.stringify(template);


// requestString = requestString.replace("<budgetId>", budgetId);
// requestString = requestString.replace("<startingDK>", startDK);
// requestString = requestString.replace("<endingDK>", endDK);
// requestString = requestString.replace("<DKServer>", dKServer);
// requestString = requestString.replace("<transId>", transId);
// requestString = requestString.replace("<accountId>", accountId);
// requestString = requestString.replace("<subcatId>", subCatId);
// requestString = requestString.replace("<date>", date);
// requestString = requestString.replace("<amount>", amount);
// console.log(requestString);

// debugger;
// // console.log(requestString);
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
      // var bodyContents = JSON.parse(body);
      // sessionToken = bodyContents['session_token'];
      console.log(body);
      debugger;
  }
);
// request({
//   uri: hostname,
//   method: "POST",
//   headers: headers,
//   form: requestData
// }, function (error, response, body) {
//   sessionToken= "1234";
//   debugger;
//   console.log(body);
//   console.log(sessionToken);
// })
// console.log(sessionToken);
