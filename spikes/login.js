var request = require('request');
var querystring = require('querystring');

var deviceId = "0c9bb882-5046-488d-95c1-1147736719f6";
var requestId = "a484dcbc-eb11-429a-8810-431676e6e97d";
var userAgent = "Lozyness: Lozyness@gmail.com: mondo - ynab adapter";
var appVersion = "v1.11404"; // don't need anymore
var username = "laura.turley89@gmail.com";
var pass = "BlueBellChipmunk";
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
debugger;
// console.log(requestString);
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
      console.log(body);
      var bodyContents = JSON.parse(body);
      sessionToken = bodyContents['session_token'];
      console.log(sessionToken);
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
