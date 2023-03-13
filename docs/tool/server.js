
// q
var xhr = new XMLHttpRequest();

xhr.open("POST", "http://127.0.0.1:8080/;ogin", true);

xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
xhr.setRequestHeader("token", "123");
xhr.send("user-admin");

xhr.onreadystatechange = function () {
  if (xhr.readyState == 4 && xhr.status === 200) {
    console.log(xhr.responseText);
  }
};

// h

let qs = require("querystring");

var http = require("http");

var server = http.createServer();

server.on("request", function (req, res) {
  // 参数
  var postData = "";
  req.addListener("data", function (chunk) {
    postData += chunk;
  });

  req.addListener("end", function () {
    postData = qs.parse(postData);
    res.writeHead(200, { 
        // "Content-Type": "text/javascript",
        'Access-Control-Allow-Origin': '*', // CORS
        'Access-Control-Allow-Methods': 'PUT,GET,POST,DELETE,OPTIONS', // CORS
     });
     res.write(postData)
    // res.write(fn + "(" + JSON.stringify(params) + ")");
    res.end();
  });
  //   var params = querystring.parse(req.url.split("?")[1]);
  //   var fn = params.callback;
  //   res.writeHead(200, { "Content-Type": "text/javascript" });
  //   res.write(fn + "(" + JSON.stringify(params) + ")");
  //   res.end()
});

server.listen("8080");
console.log("监听8080成功");
