## Introduction
This API serves as a backend system for user management, authentication, and post creation. It provides endpoints for signing up users, authenticating them, and creating posts.

## Endpoints

### 1. User Management
- **POST /signup**: Create a new user account.
- **POST /login**: Authenticate a user and generate an access token.

### 2. Post Management
- **POST /user/:userId/post**: Create a new post for a specific user.
- **GET /user/:userId/post/:postId**: Retrieve a specific post for a user.
- **PUT /user/:userId/post/:postId**: Update a specific post for a user.
- **DELETE /user/:userId/post/:postId**: Delete a specific post for a user.

## Authentication
- The API uses token-based authentication.
- Upon successful login, the API returns an access token that should be included in the headers of subsequent requests for authentication.

## Dependencies
- Node.js
- Express.js
- Prisma ORM
- bcrypt.js (for password hashing)

## Installation
1. Clone the repository.
2. Install dependencies using `npm install`.
3. Set up your environment variables.
4. Start the server using `npm start`.

## Environment Variables
Ensure the following environment variables are set:

- `DATABASE_URL`: URL of the database.
- `JWT_SECRET`: Secret key for JWT token generation.

## Usage
1. Use the provided endpoints to interact with the API.
2. Sign up a new user using the `/signup` endpoint.
3. Log in to obtain an access token using the `/login` endpoint.
4. Use the access token in the headers of subsequent requests to access protected endpoints.
5. Create, update, retrieve, or delete posts using the appropriate endpoints.

## Contributions
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).