
const express = require("express");
const app = express();
var path = require('path');
app.use(express.static(__dirname + "/public"));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});
app.use(express.static(path.join(__dirname, 'public')));
let server = app.listen(8888, function () {
  console.log("App server is running on port 8888");
});
