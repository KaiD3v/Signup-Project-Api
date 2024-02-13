import fastify from "fastify";
import { registerHandler } from "./routes/users/CreateUser.js";
import { getUserHandler } from "./routes/users/GetUser.js";
import { getUsersHandler } from "./routes/users/GetUsers.js";
import { deleteHandler } from "./routes/users/DeleteUser.js";
import { authUserHandler } from "./routes/users/userAuth.js";
import { updateHandler } from "./routes/users/UpdateUser.js";
import { CreatePostHandler } from "./routes/posts/CreatePost.js";
import { getPostHandler } from "./routes/posts/GetPost.js";
import { getPostsHandler } from "./routes/posts/GetPosts.js";
import { updatePostHandler } from "./routes/posts/UpdatePost.js";

const app = fastify();
const port = 3000;

// users routes
app.register(registerHandler);
app.register(getUserHandler);
app.register(getUsersHandler);
app.register(deleteHandler);
app.register(authUserHandler);
app.register(updateHandler);

//posts routes
app.register(CreatePostHandler);
app.register(getPostHandler);
app.register(getPostsHandler);
app.register(updatePostHandler);

app.listen({ port: port }).then(() => {
  console.log(`Servidor ${port}`);
});
