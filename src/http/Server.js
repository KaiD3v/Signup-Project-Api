import fastify from "fastify"
import { registerHandler } from "./routes/users/CreateUser.js"
import { getUserHandler } from "./routes/users/GetUser.js"
import { getUsersHandler } from "./routes/users/GetUsers.js"
import { deleteHandler } from "./routes/users/DeleteUser.js"
import { authUserHandler } from "./routes/users/userAuth.js"
import { updateHandler } from "./routes/users/UpdateUser.js"

const app = fastify()
const port = 3000


app.register(registerHandler)
app.register(getUserHandler)
app.register(getUsersHandler)
app.register(deleteHandler)
app.register(authUserHandler)
app.register(updateHandler)

app.listen({port: port}).then(() => {
    console.log(`Servidor ${port}`)
})