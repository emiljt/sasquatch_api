const logger = require('pino')();
const uuid = require('uuid');

const sightingRepo = require('./sightings-repo.js');

module.exports.createSighting = function createSighting(date, description, latitude, longitude, tags) {
    return new Promise((resolve, reject) => {
        let id = uuid.v4();

        sightingRepo.insertSighting(id, date, description, latitude, longitude, tags)
            .then(resolve(sightingRepo.selectSighting(id)))
            .catch((err) => {
                reject(err);
            });
    });
}