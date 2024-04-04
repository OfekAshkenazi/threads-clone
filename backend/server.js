import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
import cookieParser from 'cookie-parser'

import userRoutes from './api/user/user.routes.js'
import postRoutes from './api/post/post.routes.js'
import messageRoutes from './api/message/message.routes.js'

import { v2 as cloudinary } from 'cloudinary'

dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// middlewares
app.use(express.json({ limit: "50mb" })) // parse objects in body req
app.use(express.urlencoded({ extended: true }))// parse even nested objects in body req
app.use(cookieParser())


//Routes
app.use("/api/users", userRoutes)
app.use("/api/posts", postRoutes)
app.use("/api/messages", messageRoutes)



app.listen(PORT, () => { console.log(`server running on localhost:${PORT}`) })