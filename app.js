require("dotenv").config()
const Express = require("express")
const app = Express()
const dbConnection = require("./db")
const controllers = require("./controllers")
const middleware = require("./middleware")


app.use(middleware.CORS)
app.use(Express.json())

app.use("/user", controllers.userController)
app.use(middleware.validateSession)
app.use("/list", middleware.validateSession, controllers.listController)
app.use("/userComment", middleware.validateSession, controllers.commentController)

dbConnection.authenticate()
.then(() => dbConnection.sync())
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`[server] listening on port ${process.env.PORT}`)
    })
})
.catch((err) => {
    console.log(`[server] crashed`)
    console.log(err)
})
