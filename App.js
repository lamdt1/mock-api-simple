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
var upload = multer({ storage: storage }).single('file');

app.get('/', function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post('/api/upload', function (req, res) {
  console.log('Request upload ======', req)
  upload(req, res, function (err) {
    if (err) {
      return res.end({"code": "SYSTEM_ERROR"});
    }
    res.send({"code": "SUCCESS"});
  });
});

app.post('/api/register', function (req, res) {
  console.log('Request register ======', req)
  setTimeout(() => {
    return res.send({ "message": { "shared_token": "ZsPitF57" } })
  }, Math.floor( ( Math.random() * 2000 ) + 100 ))
});

app.post('/api/verify', function (req, res) {
  console.log('Request verify ======', req)
  setTimeout(() => {
    return res.send({"code": "SUCCESS"})
  }, Math.floor( ( Math.random() * 2000 ) + 100 ))
});

app.listen(3000, function () {
  console.log("Working on port 3000");
});
