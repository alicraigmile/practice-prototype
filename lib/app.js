var express = require('express'),
    app = express(),
    path = require('path'),
    package = require('../package'),
    config = require('../config');
		

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/status',function (req, res) {
    res.json({ app: package.name, version: package.version });
});

app.get('/',function (req, res) {
  res.render('embed', {gid: 'gy8b9zzxll'});
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '..', 'bower_components')));

module.exports = app;
