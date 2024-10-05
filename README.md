## Project setup

First, install the dependencies of the project:

```bash
$ yarn install
```

Then, create and initialize the Docker containers:

```bash
$ docker compose up
```

Give permissions to the folder called "pgadmin-data":

```bash
$ chmod -R 660 pgadmin-data
```

Inside the PostgreSQL database container, execute:

```bash
$ psql -U postgres
```

And then create the user and the needed database:

```SQL
CREATE USER place_user_here WITH PASSWORD 'place_password_here';
CREATE DATABASE database_name;
```

Finally, set the following variables in the .env:
```bash
DB_HOST='here_goes_a_variable'
DB_PORT='here_goes_a_variable'
DB_USERNAME='here_goes_a_variable'
DB_PASSWORD='here_goes_a_variable'
DB_NAME='here_goes_a_variable'
```

## Compile and run the project

```bash
# development
$ yarn run start

# watch mode
$ yarn run start:dev

# production mode
$ yarn run start:prod
```

## Run tests

```bash
# unit tests
$ yarn run test

# e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```