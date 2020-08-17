# Readme

## Database Schema
Due to the time limit, I didn't end up changing the database schema since it
worked for the API design I came up with. There are a few thing I would have
changed though if given the time:
- I might have added in a normal auto-incrementing database Id. This isn't as
big of a deal to me as making sure that the "outside facing Id" be a uuid
though.
- Add an index to the location field for faster searches for the distance
related calls. MySQL 5.7 appears to have a bug that causes the database to
ignore any indexes specified when calculation things like ST_Distance_Sphere.
- I would have created a separate table for tags. Allow the API behaves just
fine storing them in a field on the sightings table, having a tags table and
a foreign keys table for the many to many relationship between sightings and
tags would greatly speed up queries by tag and allow you to avoid storing
duplicate data.

## Technology Choices
Environment: Docker
Language: Javascript
Runtime: Node.js
Framework: Restify
Database Interphase: mysql2
Logging: Pino
Tests: Tape, Supertest
Documentation: API Blueprint
### Environment
I've spent a decent amount of time doing dev opts in other jobs, as well as
with my own servers. I'm a big fan of tools like terraform, containers, vagrant,
etc. They can make development so much smoother, and help new employees get up
and running very quickly. In the production environment, containers are bring a
lot to the table, and I like to have my dev environment match prod as much as
possible, so using containers would have been my first choice regardless of
whether it was required or not (though, as a full-time RHEL/Fedora user, I would
have used buildah and podman).
### Language & Runtime
My job for the last three years has been in Ruby, and for the past year I've
been doing all my personal projects in Rust, so my server-side JS felt awkward.
In my phone interview they said I could use any language, but the instructions
in the readme said to pick between JS, PHP, and Java, so I decided to play it
safe and do the exam in Node. I feel like I could have moved a lot faster in
Rust simply because it's more fresh on my mind.
### Framework
I had heard of Restify before but hadn't used it. It's similar enough to
Express-like frameworks that I didn't have any issues using it. I've worked in
Express and Hapi before as well. I went with Restify because it's strictly
geared towards APIs, so I figured that might help keep things simple, especially
on a time budget.
### Mysql2
They claim to be API compatible with the more popular mysql package, but also
faster and promise wrapped. I didn't want to use an ORM since they tend to be
slower in my opinion, more complicated, and don't give you anything if you're
trying to organize things in a more Domain Driven Design like fashion, which I
prefer.
### Logging
Pino is simple, fast, and has the needed methods for a proper logger (at least
for this project).
### Tests
I used to use tape with my nodejs projects because it was lightweight and output
in a standardized format (TAP). Tape is very easy to use and doesn't
over complicate things. I like to write some tests before the actual code, but I
figured that wouldn't work with the given time frame.
### Documentation
The first thing I did when starting this was to design and document the API,
which took a good amount of my time. I think this is the most important step of
any project though, especially for something as important as an API. Designing
before you code is important in any project, but with an API it also allows you
to start development on the server and client side sanctimoniously. This
encourages a good separation between them, speeds up development, and enforces
the contract in a very real way.
I've used swagger before, and would have been fine using it now, but I decided
API Blueprint would be a little faster to get up and running with and nicer to
view regardless of where I stopped.

## Challenges
- Like a mentioned earlier, I've worked plenty in JS, but not using it full-time
for a while made my a lot more sluggish to get going. I had to spend some extra
getting back up to speed and in the end, I know my code could use some cleanup
and modernizing with things like async/await. I didn't want to get to hipster on
it though since I was on a time limit.
- The challenge wasn't too complicated to be honest, and with a little more time
I definitely would have it completed it, but there were two things that required
a lot more thought than the rest. One was designing the API to be as RESTful as
possible. I try really hard to follow best practices, so I didn't want to add
"actions" to the end-points, even though a requirement was getting things like
distance between sightings, etc. This tripped me up a bit during design, but in
the end, I felt happy with the solution I came up with. I feel it still follows
best practice of keeping end-points as nouns, but still making it obvious
where you might find the information needed for the "actions" required.
- The other challenge (mentioned above) was the location data. I found
algorithms that allow you to get the distance between two points using latitude
and longitude, but the application wouldn't scale very well if there wasn't some
way to narrow results down when searching for points near by each other. I had a
few ideas for this such as narrowing the results when selecting from the DB by
the lat/long most significant digit, but in the end discovered that MySQL has
some built in constructs for this. I hadn't used these before, so I had to spend
some precious time familiarizing myself, but in the end I wrote a query that
would allow me to get the top X points, the distance between points, etc.

Distance between two sightings (using example coordinates which would be replaced by
the selected sighting and an example Id of the other sighting):
```
SELECT ST_Distance_Sphere(`position`, ST_GeomFromText('POINT(-111.38027685 40.67262028)', 4326))
AS `distance`
FROM `locations_earth`
WHERE `id` = 1234;
```

Sightings within range (using example coordinates which would be replaced by
the selected sighting and an example radius of 100m):
```
SELECT ST_Distance_Sphere(`position`, ST_GeomFromText('POINT(-111.38027685 40.67262028)', 4326))
AS `distance`
FROM `locations_earth`
WHERE ST_Distance_Sphere(`position`, ST_GeomFromText('POINT(-111.38027685 40.67262028)', 4326)) <= 100;
```

Top X closest points (using example coordinates which would be replaced by
the selected sighting):
```
SELECT ST_Distance_Sphere(`position`, ST_GeomFromText('POINT(-111.38027685 40.67262028)', 4326))
AS `distance`
FROM `locations_earth`
LIMIT 10
ORDER BY `distance`;
```

## What Would I change
- I take security pretty seriously, so parameter sanitizing, SQL injection
prevention need to be done, as well as authentication (if needed)
- Rate limiting
- I would prefer to make this more DDD, which I didn't have time for
- Add some indexing for the DB to make sure queries are faster, especially with
the location based stuff
- Need to add better documentation on possible errors status codes and make sure
those are being used properly
- Use HTTP conditional requests for caching
- Immutable database using the `version` field
- Version API
- Make tags a separate table with a many to many relationship

## API URLs
The host URL is either [::]:8080 or localhost:8080
The end-points are also documented in `documentation.md`.

POST /sightings
GET /sightings
GET /sightings/:sighting_id
PATCH /sightings/:sighting_id
DELETE /sightings/:sighting_id
GET /sightings/:sighting_id/neighbors
GET /sightings/:sighting_id/neighbors/:neighbor_id
POST /sightings/:sighting_id/tags
DELETE /sightings/:sighting_id/tags/:tag
