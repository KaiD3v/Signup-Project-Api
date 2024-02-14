## Introduction
This API serves as a backend system for user management, authentication, post creation, and comment management. It provides endpoints for signing up users, authenticating them, creating posts, and managing comments on posts.

## Endpoints

### 1. User Management
- **POST /register**: Create a new user account.
- **GET /user/:id**: Retrieve a specific user and their posts.
- **GET /users**: Retrieve all users.
- **PUT /user/:id/update**: Update a specific user.
- **DELETE /user/:id/delete**: Delete a specific user.
- **POST /login**: Authenticate a user and generate an access token.

### 2. Post Management
- **POST /user/:userId/post**: Create a new post for a specific user.
- **GET /user/:userId/post/:postId**: Retrieve a specific post for a user.
- **GET /posts**: Retrieve all posts.
- **PUT /user/:userId/post/:postId/update**: Update a specific post for a user.
- **DELETE /user/:userId/post/:postId/delete**: Delete a specific post for a user.

### 3. Comment Management
- **POST /user/:userId/post/:postId/comment**: Create a new comment on a specific post.
- **GET /user/:userId/post/:postId/comment/:commentId**: Retrieve a specific comment on a post.
- **PUT /user/:userId/post/:postId/comment/:commentId/update**: Update a specific comment on a post.
- **DELETE /user/:userId/post/:postId/comment/:commentId/delete**: Delete a specific comment on a post.

## Authentication
- The API uses token-based authentication.
- Upon successful login, the API returns an access token that should be included in the headers of subsequent requests for authentication.

## Dependencies
- Node.js
- Fastify.js
- Prisma ORM
- bcrypt.js (for password hashing)
- JSON Web Token (for authentication)

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
2. Sign up a new user using the `/register` endpoint.
3. Log in to obtain an access token using the `/login` endpoint.
4. Use the access token in the headers of subsequent requests to access protected endpoints.
5. Create, update, retrieve, or delete posts using the appropriate endpoints.
6. Add comments to posts using the comment management endpoints.

## Contributions
Contributions are welcome! If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).