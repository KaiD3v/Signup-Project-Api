import fastify from "fastify"
import { registerHandler } from "./routes/CreateUser.js"
import { getUserHandler } from "./routes/GetUser.js"
import { getUsersHandler } from "./routes/GetUsers.js"

const app = fastify()
const port = 3000

app.register(registerHandler)
app.register(getUserHandler)
app.register(getUsersHandler)

app.listen({port: port}).then(() => {
    console.log(`Servidor ${port}`)
})