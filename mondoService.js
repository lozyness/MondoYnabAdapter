function convertMondoTransaction(transactionData) {
  var transaction = [];
  transaction['account'] = "Current";
  transaction['id'] = "abc";
  transaction['accountid'] = "abc";
  transaction['payeeid'] = "abc";
  transaction['subcatid'] = "abc";
  if(!transactionData) {
    transaction['date'] = "10/04/2014";
    transaction['payee'] = "HelloFresh";
    transaction['memo'] = "Food - W3" + ': ' + "Third Week Food Shopping";
    transaction['amount'] = 1999;
  } else {
    transaction['date'] = transactionData.created;
    transaction['payee'] = transactionData.merchant.name;
    transaction['memo'] = transactionData.category + ': ' + transactionData.description;
    transaction['amount'] = transactionData.amount;
  }
  return transaction;
}
exports.convertMondoTransaction = convertMondoTransaction;
