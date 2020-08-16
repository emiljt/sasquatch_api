const restify = require('restify');
const pino = require('restify-pino-logger')();

const sightingsApp = require('./sightings-application.js');

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
    sightingsApp.createSighting(req.params.date, req.params.description,
        req.params.latitude, req.params.longitude,
        req.params.tags.replace(/\s+/g, ''))
    .then((data) => {
        res.send(201, data)
    })
    .catch((err) => {
        return next(500);
    });
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
