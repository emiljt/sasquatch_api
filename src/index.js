const restify = require('restify');
const pino = require('restify-pino-logger')();

const sightings_app = require('./sightings_application.js');

const server = restify.createServer({
  name: 'sasquatch_api',
  version: '0.1.0'
});

server.use(restify.plugins.acceptParser(server.acceptable));
server.use(restify.plugins.queryParser());
server.use(restify.plugins.bodyParser());
server.use(pino);

// Sightings end-point
server.post('/sightings', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.get('/sightings', function (req, res, next) {
  res.send(req.params);
  return next();
});

// Sighting end-point
server.get('/sightings/:sighting_id', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.patch('/sightings/:sighting_id', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.del('/sightings/:sighting_id', function (req, res, next) {
  res.send(req.params);
  return next();
});

// Sighting tags end-point
server.post('/sightings/:sighting_id/tags', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.del('/sightings/:sighting_id/tags/:tag', function (req, res, next) {
  res.send(req.params);
  return next();
});

// Sighting neighbors end-point
server.get('/sightings/:sighting_id/neighbors', function (req, res, next) {
  res.send(req.params);
  return next();
});

// Sighting neighbor end-point
server.get('/sightings/:sighting_id/neighbors/:neighbor_id', function (req, res, next) {
  res.send(req.params);
  return next();
});

server.listen(8080, function () {
  console.log('%s listening at %s', server.name, server.url);
});
