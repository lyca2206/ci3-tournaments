# 🏆 Tournament Management System

## By

- Ariel Pabón (Floof).
- Jesús Garcés.
- Juan Pablo Acevedo.

Welcome to our awesome Tournament Management System! 🎉 This robust backend application is built with NestJS for managing epic tournaments. Create tournaments, generate brackets, and manage users with ease! 💪

## ✨ Features

- 🔐 User authentication and authorization with JWT
- 👥 Role-based access control
- 🏟️ Tournament creation and management
- 🌳 Bracket generation
- 📝 User registration for tournaments
- 💾 Data persistence using PostgreSQL and TypeORM
- 🧪 Comprehensive test coverage
- 🐳 Dockerized database environment

## 🚀 Project Setup

### Prerequisites

- NestJS (v16 or later) 📦
- Yarn package manager 🧶
- Docker 🐳 and Docker Compose 🐙

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

## 🏃‍♂️ Running the Application

```bash
# 🌱 Development mode
yarn run start

# 👀 Watch mode
yarn run start:dev

# 🚀 Production mode
yarn run start:prod
```

📋 Testing in Our Project
Testing is crucial for ensuring the quality and reliability of our code. In this project, we focus on unit tests and integration tests to validate the functionality of our modules. Below, you'll find details about the tests we've implemented.

Sure! Here’s a README section specifically tailored to include the details of the unit and integration tests we developed for your project, along with explanations and some engaging emojis.

* * *

📋 Testing in Our Project
=========================

Testing is crucial for ensuring the quality and reliability of our code. In this project, we focus on **unit tests** and **integration tests** to validate the functionality of our modules. Below, you'll find details about the tests we've implemented.

🧪 Unit Tests
-------------

Unit tests are designed to validate individual components of our application in isolation. Each test case targets a specific function or method, ensuring it behaves as expected.

### Unit Tests Overview 🔍

For each module, we’ve created tests covering the following functionalities:

*   **User Module**:
    
    *   **UserService**:
        *   `createUser`: Tests the user creation process, ensuring it handles valid and invalid input.
        *   `getUserById`: Validates retrieval of user details by ID.
        *   `updateUser`: Tests the update functionality, ensuring changes are correctly applied.
*   **Tournament Module**:
    
    *   **TournamentService**:
        *   `createTournament`: Tests the creation of tournaments, including edge cases.
        *   `getAllTournaments`: Ensures all tournaments are retrieved successfully.
        *   `deleteTournament`: Validates proper deletion of a tournament.
*   **Group Module**:
    
    *   **GroupService**:
        *   `createGroup`: Tests the group creation functionality.
        *   `getGroupById`: Validates retrieval of a group by ID.
        *   `deleteGroup`: Tests deletion to ensure the group is removed.

### Running Unit Tests 🛠️

To execute the unit tests, run the following command in your terminal:

```bash
npm run test:unit
```

Ensure that all tests pass successfully before committing any changes!

* * *

⚙️ Integration Tests
--------------------

Integration tests validate the interactions between different modules and components, ensuring they work together as expected. These tests simulate real-world scenarios to confirm that our application behaves correctly when all pieces are integrated.

### Integration Tests Overview 🌐

Integration tests were developed for the following functionalities:

*   **User Module**:
    
    *   Tests for user registration and login, ensuring that the entire authentication flow works seamlessly.
*   **Tournament Module**:
    
    *   Tests for creating and retrieving tournaments, checking that the associated groups and matches are managed correctly.
*   **Group Module**:
    
    *   Tests for creating, updating, and deleting groups, ensuring that changes propagate correctly through the system.

### Running Integration Tests 🔄

To execute the integration tests, use the following command:

```bash
npm run test:integration
```

This will run all the integration tests, ensuring that all components interact correctly.

* * *

📈 Coverage Goals
-----------------

We aim for a minimum of **80% code coverage** for both unit and integration tests. This helps us maintain high-quality code and catch potential issues early in the development process.

# 🔬 Unit tests
```bash
yarn run test
```

# 🌐 E2E tests
```bash
yarn run test:e2e
```

# 📊 Test coverage
```bash
yarn run test:cov
```

## 📚 API Documentation

For detailed information about the API endpoints, their parameters, and responses, please refer to the `API_DOCUMENTATION.md` file in the project root. 📖

## 🔐 Authentication and Authorization

This system implements JWT-based authentication. Users can register, log in, and receive a token for accessing protected routes. The application supports multiple user roles with different permissions. 🛡️

## 🌱 Database Seeding

To populate the database with initial data for testing:

```bash
yarn run seed
```

This will create an admin user and some sample tournaments. 🎲

## 🚢 Deployment

The application is configured for cloud deployment with automated testing and deployment pipelines. For more information on the deployment process, see `DEPLOYMENT.md`. ☁️

## 🤝 Contributing

Please read `CONTRIBUTING.md` for details on our code of conduct and the process for submitting pull requests. We welcome your contributions! 🙌

## 📄 License

This project is licensed under the MIT License - see the `LICENSE.md` file for details. ⚖️

---

## 🎮 Quick Start Guide

1. 📥 Clone the repo
2. 🔧 Install dependencies
3. 🐳 Start Docker containers
4. 🗄️ Set up the database
5. ⚙️ Configure environment variables
6. 🚀 Run the application
7. 🏆 Start managing tournaments!

---

Happy tournament managing! 🎉🏆🎊
