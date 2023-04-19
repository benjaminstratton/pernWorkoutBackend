# Push-It App (Server)

Welcome to the home of [Push-It]()'s Server! This backend server consists of a Node.js framework known as [Express.js](https://expressjs.com/) that incorporates a [Postgresql](https://www.postgresql.org/) database.

## Installation & Launch

To clone or fork the project from github, follow [these](https://docs.github.com/en/desktop/contributing-and-collaborating-using-github-desktop/adding-and-cloning-repositories/cloning-and-forking-repositories-from-github-desktop) instructions.

Afterward, use the package manager [npm](https://www.npmjs.com/) to install the dependencies.

```bash
npm install
```

Then, you will need to create a [dotenv](https://www.npmjs.com/package/dotenv) file (.env) within the root folder of the cloned/forked project with the key/value pairs listed below:

```javascript
JWTSECRET = auniquestringwithnumbers123thatshardtoguess
PG_USER = <POSTGRES_USERNAME>
PG_PASSWORD = <POSTGRES_PASSWORD>
PG_HOST = localhost
PG_PORT = 5432
PG_DATABASE = workout_api
NODE_ENV=development
```

Afterward, create the database in psql by running the command below in psql shell:

```sql
\i '<ABSOLUTE_PATH>/pernWorkoutBackend/src/models/database.sql'
```

Finally, launch the project!

```bash
node index.js
# Or
nodemon
```

## Usage

While the server is running, download and use [Postman](https://www.postman.com/) to test the routes found in /src/routes. To access the dash.js routes, you will first need to acquire a token from either the login or signup route, then apply the key/value pair to the "Headers" tab.
