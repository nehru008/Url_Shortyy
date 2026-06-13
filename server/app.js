import express from "express"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json({limit:"16kb"}))
app.use(express.urlencoded({extended: true,limit:"16kb"}))

app.use(cookieParser())

import cors from "cors"

app.use(cors({
    origin:"http://localhost:5173",
    credentails:true 
}))


import UserRouter from "./src/routes/user.routes.js"
import UrlRouter from "./src/routes/url.routes.js"

app.use("/api/v1/users",UserRouter)
app.use("/api/v1/url",UrlRouter)



export default app 
