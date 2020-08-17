FORMAT: 1A

# Sasquatch Sightings

Sasquatch sightings is a REST API for recorded sasquatch sightings.

# Group Sightings

Resources related to sightings in the API.

## Sightings [/sightings]

### Create New Sighting [POST]

Allows you to add a new sighting to the database.

+ Parameters
    + description (string) - Description of the sighting
    + date (string) - ISO 8601 formatted date of when the sighting occured
    + latitude (number) - Latitude of the sighting in decimal degree format
    + longitude (number) - Longitude of the sighting in decimal degree format
    + tags (string) - Comma deliminated list of one word (hyphenated words are
    ok) attributes of the sighting

+ Request (form-data)
description:This is what happened.
date:2020-08-16T12:41:00
latitude:40.402026
longitude:-111.879444
tags:woods, scary, noise

+ Response 201 (application/json)
{
    "id": "b7e6112b-90c2-4487-943f-2e428cfaf50d",
    "dateSighted": "2020-08-16T12:41:00.000Z",
    "description": "This is what happened.",
    "latitude": "40.402026000",
    "longitude": "-111.879444000",
    "tags": [
        "woods",
        "scary",
        "noise"
    ]
}

### List All Sightings [GET]

This end-point allows you to query for sightings. All sightings can be queried,
or the results can be reduced using the availible parameters.

+ Parameters
    + tags:[all, n] (string) - A comma deliminated list of one word tags to search
for sightings with. The word `tags` followed emediatly by a semi-colon and
either `all` or a posative integer (represented by `n` here), allows you to
specify how many tags are required to match in order for a sighting to qualify.
    + created:[lt, lte, gt, gte] (string) - An ISO 8601 formatted string
used to compare the created date on the sighting record, allowing for
pagination. The semicolon, followed by `lt` (less than),
`lte` (less than or equal to), `gt` (greater than),
`gte` (greater than or less than), specify how to make the comparison for the
dates.
    + limit (number) - Specifies the number of records to return.

+ Request ()

+ Response 200 (application/json)

## Sightings [/sightings/{sighting_id}]

### List a Sighting [GET]

This allows you to retrieve a sighting.

+ Parameters
    + sighting_id (string) - GUID of the sighting requested

+ Request ()

+ Response 200 (application/json)

### Update a Sighting [PATCH]

Allows for updating the details of a sighting. Any parameters that are given
will entirely replace the original one, any that are missing will be left alone.

+ Parameters
    + sighting_id (string) - GUID of the sighting requested
    + description (string) - Description of the sighting
    + date (string) - ISO 8601 formatted date of when the sighting occured
    + latitude (number) - Latitude of the sighting in decimal degree format
    + longitude (number) - Longitude of the sighting in decimal degree format
    + tags (string) - Comma deliminated list of one word (hyphenated words are
    ok) attributes of the sighting

+ Request ()

+ Response 200 (application/json)

### Remove a Sighting [DELETE]

Removes a sighting from the database of sightings.

+ Parameters
    + sighting_id (string) - GUID of the sighting requested

+ Request ()

+ Response 204

## Sighting Tags [/sightings/{sighting_id}/tags]

### Add New Tags [POST]

Adds new tags to an existing sighting. The original tags are uneffected.

+ Parameters
    + sighting_id (string) - GUID of the sighting requested
    + tags (string) - Comma deliminated list of one word (hyphenated words are
    ok) attributes of the sighting

+ Request ()

+ Response 201 (application/json)

## Sighting Tag [/sightings/{sighting_id}/tags/{tag}]

### Remove a Tag [DELETE]

Removes an existing tag from a sighting. If the tag doesn't exist, the response
still succeeds.

+ Parameters
    + sighting_id (string) - GUID of the sighting requested
    + tag (string) - One word (hyphenated words are ok) tag to remove

+ Request ()

+ Response 204

## Sigthing Neighbors [/sightings/{sighting_id}/neighbors]

### List of Neighboring Sightings [GET]

Retrieves a list of neighboring sightings. Details about how far away they are
from the selected sighting, and the difference in occurance date are also given.

+ Parameters
    + sighting_id (string) - GUID of the selected sighting
    + radius (number) - The measure of the search radius in meters to restrict
    the search to
    + limit (number) - Specifies the number of records to return.
    + tags:[all, n] (string) - A comma deliminated list of one word tags to search
    for sightings with. The word `tags` followed emediatly by a semi-colon and
    either `all` or a posative integer (represented by `n` here), allows you to
    specify how many tags are required to match in order for a sighting to qualify.
    + date_range (number) - An integer representing the number of seconds before
    or after the selected sighting's occurance to restrict the neighboring
    sighting's occurance to

+ Request ()

+ Response 200

## Sighting Neighbors [/sightings/{sighting_id}/neighbors/{neighbor_id}]

### Neighboring Sighting [GET]

Retrieves a neighboring sighing of the selected sighting. Details such as the
distance between the two, and the difference in occurance dates are given as
well.

+ Parameters
    + sighting_id (string) - GUID of the selected sighting
    + neighboring_id (string) - GUID of the neighboring sighting

+ Request ()

+ Response 200
