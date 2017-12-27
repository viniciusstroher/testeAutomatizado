"use strict";
//rodars o local server antes de rodar o mocha ou o grunt

var express = require('express'),
    app = express(),
    path = require('path');

app.use(express.static(__dirname + '/static'));

app.get('/index.html', function (req, res) {
  res.sendFile(path.resolve(__dirname, '../assets/index.html'));
});

app.get('/BringUp-debug.apk', function (req, res) {
  res.sendFile(path.resolve(__dirname, 'bin/BringUp-debug.apk'));
});


// app.get('/WebViewApp7.1.app.zip', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../dotnet/AppiumDotNetSample/Resources/WebViewApp7.1.app.zip'));
// });

// app.get('/ApiDemos-debug.apk', function (req, res) {
//   res.sendFile(path.resolve(__dirname, '../../../apps/ApiDemos/bin/ApiDemos-debug.apk'));
// });

var server;

exports.start = function () {
    server = app.listen(3000);
};

exports.stop = function () {
    server.close();
};

exports.start();