var express = require('express'),
    app = express(),
    path = require('path'),
    package = require('../package'),
    config = require('../config'),
    journey = require('./journey')('electricity');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/status',function (req, res) {
    res.json({ app: package.name, version: package.version });
});

app.get('/journey/',function (req, res) {
  var stepId = 0;
  var step = { journey: journey, stepId: stepId, step: journey.steps[stepId] };
  res.render('journey', step);
});

app.get('/journey/steps/:step',function (req, res) {
  var stepId = req.params.step;
  if (! stepId) {
     stepId = 0;
	}
  
  var step = { journey: journey, stepId: stepId, step: journey.steps[stepId] };
  console.log(step);
  if (journey.steps[stepId]) {
		res.render('journey', step); 
  } else {
		res.status(404).render('journey', step); 
  }
});

app.get('/',function (req, res) {
  res.render('index', {});
});

app.get('/embed',function (req, res) {
  res.render('embed', {});
});

app.use(express.static(path.join(__dirname, '..', 'public')));
app.use('/bower_components',  express.static(path.join(__dirname, '..', 'bower_components')));

module.exports = app;
