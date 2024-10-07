# Tournament Management System

## By

- Ariel Pabon
- Jesus Garces
- Juan Pabloo Acevedo

This project is a robust backend application built with NestJS for managing tournaments. It allows for the creation of tournaments, generation of brackets, and user management. The system is developed using TypeScript and utilizes PostgreSQL for data persistence, with the database running in Docker containers.

## Features

- User authentication and authorization with JWT
- Role-based access control
- Tournament creation and management
- Bracket generation
- User registration for tournaments
- Data persistence using PostgreSQL and TypeORM
- Comprehensive test coverage
- Dockerized database environment

## Project Setup

### Prerequisites

- Node.js (v14 or later)
- Yarn package manager
- Docker and Docker Compose

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/tournament-management-system.git
   cd tournament-management-system
   ```

2. Install dependencies:
   ```bash
   yarn install
   ```

3. Create and start the Docker containers:
   ```bash
   docker compose up -d
   ```

4. Set permissions for the pgAdmin data directory:
   ```bash
   chmod -R 770 pgadmin-data
   ```

5. Access the PostgreSQL container:
   ```bash
   docker exec -it postgres_container_name psql -U postgres
   ```

6. Create the database and user:
   ```SQL
   CREATE USER tournament_user WITH SUPERUSER PASSWORD 'your_secure_password';
   CREATE DATABASE tournament_db;
   ```

7. Create a `.env` file in the root directory and add the following variables:
   ```
   DB_HOST='localhost'
   DB_PORT='5432'
   DB_USERNAME='tournament_user'
   DB_PASSWORD='your_secure_password'
   DB_NAME='tournament_db'
   JWT_SECRET="your_jwt_secret_key"
   JWT_EXPIRATION="8h"
   ```

## Running the Application

```bash
# Development mode
yarn run start

# Watch mode
yarn run start:dev

# Production mode
yarn run start:prod
```

## Testing

```bash
# Unit tests
yarn run test

# E2E tests
yarn run test:e2e

# Test coverage
yarn run test:cov
```

## API Documentation

For detailed information about the API endpoints, their parameters, and responses, please refer to the `API_DOCUMENTATION.md` file in the project root.

## Authentication and Authorization

This system implements JWT-based authentication. Users can register, log in, and receive a token for accessing protected routes. The application supports multiple user roles with different permissions.

## Database Seeding

To populate the database with initial data for testing:

```bash
yarn run seed
```

This will create an admin user and some sample tournaments.

## Deployment

The application is configured for cloud deployment with automated testing and deployment pipelines. For more information on the deployment process, see `DEPLOYMENT.md`.

## Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the `LICENSE.md` file for details.

---
