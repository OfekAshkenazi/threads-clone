import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import cookieParser from 'cookie-parser'

import userRoutes from './api/user/user.routes.js'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

// middlewares
app.use(express.json()) // parse objects in body req
app.use(express.urlencoded({ extended: true }))// parse even nested objects in body req
app.use(cookieParser())


//Routes
app.use("/api/users", userRoutes)



app.listen(PORT, () => { console.log(`server running on localhost:${PORT}`) })