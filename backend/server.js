import express from "express"

const app = express()

const PORT = process.env.PORT || 5000

app.listen(500,() => {
    console.log(`server running on localhost:${PORT}`)})