
function renderContent(response, content, code) {
  if(!code) {
    code = 200;
  }
  var content ="<html>"+
  "<head>"+
  "<title>Welcome</title>"+
  "</head>"+
  "<body>"+content+
  "</body>"+
  "</html>";
  response.writeHead(code, {"Content-Type": "text/html"});
  response.write(content);
  response.end();
}

exports.renderContent = renderContent;
