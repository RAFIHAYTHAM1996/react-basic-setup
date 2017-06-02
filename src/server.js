// require('babel-register')({
//     presets: ['react', 'es2015']
// });
//
// var express = require('express');
// var app = express();
//
// app.use(express.static('public'));
// app.use(require('./routes/index.jsx'));
//
// var PORT = 3000;
// app.listen(PORT, function() {
//     console.log('http://localhost:' + PORT);
// });
var request = require('request');

var express = require('express')
var cors = require('cors')
var app = express()

const url = "https://api.instagram.com/v1/users/201262345/?access_token=201262345.3af8d79.74976cd65f5749128754a9208c3c7d97";

app.get('/instagramProfile', cors(), function (req, res, next) {
  request(url, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      res.json(body);
    }
  })
})

var port = 1337;
app.listen(port, function () {
  console.log('CORS-enabled web server listening on port ' + port)
})
