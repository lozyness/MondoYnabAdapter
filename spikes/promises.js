/**
 * Created by laura on 16/06/2016.
 */

var transaction = {
    amount: 10,
    vendor: "helloFresh"
};

login()
    .then(function (sessionToken) {
        console.log("Returned session token: " + sessionToken);
        return addTransaction(sessionToken, transaction);
    }, function (err) {
        console.log("failed");
    })
    .then( function () {
        console.log("done");
    });

function login() {
    return new Promise( function (fulfill, reject) {
        fulfill("1234");
    })
}

function addTransaction(sessionToken, transaction) {
    return new Promise( function (fulfull, reject) {
        console.log("Using ST: "+sessionToken);
        console.log("Adding transaction: "+transaction);
        fulfull();
    })
}