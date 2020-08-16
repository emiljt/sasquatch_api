Start time: 12:44
End time: 5:44

- Create large test dataset
- Create test script
- Define architecture first
- Prepare docker image
- START WITH FRESH FILES before starting!!!
- Create GitHub repo
- Try to be test driven
- Try to document code as you go
- Add a stubbed authentication method

Language: Javascript
Runtime: Node.js
Framework: Restify
Database Interphase: mysql2
Logging: Pino
Tests: Tape, Supertest
Documentation: API Blueprint

Notes:
- Use HTTP methods
- Use HTTP status codes
- Use HTTP headers for metadata
- Use JWT authentication
- Use HTTP conditional requests
- Use HTTP headers for rate limiting
- Try adding hypermedia links to responses
- Use API versioning
- Set content types on responses
- Use the `version` field on Sighting to create an immutable DB
- Make tags a different resouce

Start:
- Start repo in GitHub
- Clone repo
- Download files from email
- Unzip files into project folder
- Make initial commit
- Create api blueprint docs
- Create Dockerfile
- Edit docker-compose file
- Start nodejs project
- Create tests folder
- Add tape to project
- Add supertest to project
- Add mysql2 to project
- Add restify to project
- Test docker setup
- Test that server is working


Distance formula:
SELECT ST_Distance_Sphere(`position`, ST_GeomFromText('POINT(-111.38027685 40.67262028)', 4326))
AS `distance`
FROM `locations_earth`
WHERE ST_Distance_Sphere(`position`, ST_GeomFromText('POINT(-111.38027685 40.67262028)', 4326)) <= 1;


