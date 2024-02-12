import fastify from "fastify"
import { registerHandler } from "./routes/CreateUser.js"
import { getUserHandler } from "./routes/GetUser.js"
import { getUsersHandler } from "./routes/GetUsers.js"
import { deleteHandler } from "./routes/DeleteUser.js"
import { authUserHandler } from "./routes/userAuth.js"

const app = fastify()
const port = 3000

app.register(registerHandler)
app.register(getUserHandler)
app.register(getUsersHandler)
app.register(deleteHandler)
app.register(authUserHandler)

app.listen({port: port}).then(() => {
    console.log(`Servidor ${port}`)
})