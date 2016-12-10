var express = require('express'),
    app = express(),
    path = require('path'),
    package = require('../package'),
    config = require('../config'),
		journeyDB = require('./journey');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, '..', 'views'));

app.get('/status',function (req, res) {
    res.json({ app: package.name, version: package.version });
});

app.get('/journeys/:journey/',function (req, res) {
  var journeyId = req.params.journey,
      journey = journeyDB(journeyId),
      stepId = 0,
      journeyNotFound = ! journey;

	if (journeyNotFound) {
    res.status(404).render('missingjourney');
		return;
  }

  var step = { journey: journey, journeyId: journeyId, stepId: stepId, step: journey.steps[stepId] };
  res.render('journey', step);
});

app.get('/journeys/:journey/steps/:step',function (req, res) {
  var stepId = parseInt(req.params.step) || 0,
      journeyId = req.params.journey,
      journey = journeyDB(journeyId),
      journeyNotFound = ! journey;

	if (journeyNotFound) {
    res.status(404).render('missingjourney');
		return;
  }

  var stepNotFound = ! journey.steps[stepId];
  
  if (stepNotFound) {
		res.status(404).render('journey', step); 
  }

	var step = { journey: journey, journeyId: journeyId, stepId: stepId, step: journey.steps[stepId] };
  res.render('journey', step); 
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
