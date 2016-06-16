var request = require('request');

var hostname = "https://app.youneedabudget.com/api/v1/catalog"

function getUser() {
    return {
        'username': "lauraturley.dev@gmail.com",
        'password': "RedRumMonkey"
    }
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

function getRequestString(username, password) {
    var requestString = '{"email":"<username>","password":"<password>","remember_me":false}';
    requestString = requestString.replace("<username>", username);
    requestString = requestString.replace("<password>", password);
    return requestString;
}

function login() {
    var user = getUser();
    var username = user.username;
    var pass = user.password;
    var requestString = getRequestString(username, pass);
    var headers = getBasicHeaders();
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
                // console.log(body);
                var bodyContents = JSON.parse(body);
                var sessionToken = bodyContents['session_token'];
                // console.log(sessionToken);
                fulfill(sessionToken);
            }
        );
    });
}

login()
    .then(function(sessionToken) {
        console.log(sessionToken);
    });

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
