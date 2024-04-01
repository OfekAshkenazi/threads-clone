import express from "express"
import dotenv from "dotenv"
import connectDB from "./db/connectDB.js"
dotenv.config()

connectDB()

const app = express()

const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(500, () => { console.log(`server running on localhost:${PORT}`) })