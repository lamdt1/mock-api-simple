var express = require("express");
var multer = require('multer');
var app = express();
var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './uploads');
  },
  filename: function (req, file, callback) {
    callback(null, file.fieldname + '-' + Date.now());
  }
});
var upload = multer({ storage: storage }).single('userFile');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/upload', function (req, res) {
  console.log('Request ======', req)
  // upload(req, res, function (err) {
  //   if (err) {
  //     return res.end({"code": "SYSTEM_ERROR"});
  //   }
    res.end({"code": "SUCCESS"});
  // });
});

app.post('/api/register', function (req, res) {
  setTimeout(() => {
    return res.end({ "message": { "shared_token": "ZsPitF57" } })
  }, 1000)
});

app.post('/api/verify', function (req, res) {
  setTimeout(() => {
    return res.end({"code": "SUCCESS"})
  }, 1000)
});

app.listen(3000, function () {
  console.log("Working on port 3000");
});
