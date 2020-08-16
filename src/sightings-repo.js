const mysql = require('mysql2');
const logger = require('pino')();

function initializeConnection() {
    return new Promise((resolve, reject) => {
        let connection = mysql.createConnection({
            host: 'mysqldb',
            user: 'test',
            password: 'test',
            database: 'test',
        });

        connection.connect((err) => {
            if(err) {
                logger.error('unable to open database connection');
                reject(err);
            }

            logger.info('created database connection');
            resolve(connection);
        });
    });
}

module.exports.insertSighting = function insertSighting(id, dateSighted, description, latitude, longitude, tags) {
    return new Promise((resolve, reject) => {
        initializeConnection()
            .then((connection) => {
                const query = `INSERT INTO \`sighting\`
                (\`id\`, \`dateSighted\`, \`description\`, \`latitude\`,
                \`longitude\`, \`tags\`, \`location\`)
                VALUES ('${id}', '${dateSighted}', '${description}',
                '${latitude}', '${longitude}', '${tags}',
                ST_GeomFromText('POINT(${longitude} ${latitude})', 4326))`;

                connection.query(query, (err, results, fields) => {
                    connection.end((end_err) => {
                        if(end_err) {
                            logger.error('unable to end database connection');
                        }
                    });

                    if(err) {
                        logger.error(err)
                        reject('unable to insert sighting');
                    } else {
                        resolve();
                    }
                });
            })
            .catch((err) => {
                logger.error(err)
                reject('unable to establish database connection');
            });
    });
}

module.exports.selectSighting = function selectSighting(id) {
    return new Promise((resolve, reject) => {
        initializeConnection()
            .then((connection) => {
                const query = `SELECT * FROM \`sighting\`
                WHERE \`id\` = '${id}'`;

                connection.query(query, (err, results, fields) => {
                    connection.end((end_err) => {
                        if(end_err) {
                            logger.error('unable to end database connection');
                        }
                    });

                    if(err) {
                        logger.error(err)
                        reject('unable to select sighting');
                    } else {
                        resolve(buildSighting(results[0]));
                    }
                });
            })
            .catch((err) => {
                logger.error(err)
                reject('unable to establish database connection');
            });
    });
}

function buildSighting(data) {
    return {
        id: data.id,
        dateSighted: data.dateSighted,
        description: data.description,
        latitude: data.latitude,
        longitude: data.longitude,
        tags: data.tags.split(',')
    }
}
