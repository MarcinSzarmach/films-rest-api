# Films REST API

To run app You need MongoDB and Node.js.

To run localy you nedd to add file .env (in root project) with:

```
DATABASE_URL=mongodb://localhost/films
PORT=8000
OMDBAPI_URL=http://www.omdbapi.com/
OMDBAPI_APIKEY=YOUR_API_KEY
```

In YOUR_API_KEY you should provide API Key from http://www.omdbapi.com/.

Running:

```bash
$ npm install
$ npm start
```

## ENDPOINTS MOVIES

### GET /movies
Returns collections of all avaliable films in database.

### GET /movies/:id
Return film by id.

### POST /movies/:id
Add films to database. ID must be a valid IMDb ID (e.g. tt1285016), otherwise returns error.


## ENDPOINTS COMMENTS

### GET /comments
Returns collections of all avaliable comments in database.

### POST /comments/:id"
Add comment to database. ID must be a valid IMDb ID (e.g. tt1285016), otherwise returns error.


## HEROKU

To run app on heroku you need set global variables (https://devcenter.heroku.com/articles/config-vars) the same as in .env file with:
NODE_ENV=production

To run this on heroku you need a MongoDB.

## Docker

To run app on heroku you need set global variables (https://devcenter.heroku.com/articles/config-vars) the same as in .env file with:
NODE_ENV=production
To run this on Docker you need a MongoDB.
