var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackMiddleware = require('webpack-dev-middleware');
var config = require('../webpack.config.js');
var mid = require('./middleware.js');

var app = express();
var compiler = webpack(config);
var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../client/'));

// ~~~~~~

var parseRouter = express.Router();

parseRouter.post('/:dataType', mid.evalForAllInputSizes, function(req, res) {
  res.send(res.coords);
})

app.use('/parse', parseRouter);

// ~~~~~

app.use(webpackMiddleware(compiler));

app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../client/index.html'));
});

app.listen(port);
