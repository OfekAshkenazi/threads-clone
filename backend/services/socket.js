import { Server } from 'socket.io'
import http from 'http'
import express from 'express'
const app = express()
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})


const useScoketMap = {}

io.on("connection", (socket) => {
    console.log("user connected")

    const userId = socket.handshake.query.userId
    if (userId != "undefined") {
        useScoketMap[userId] = socket.id
    }
    // convert the objectMap to an array and puts the keys in the array.
    io.emit("getOnlineUsers", Object.keys(useScoketMap))


    socket.on("disconnect", () => {
        console.log("user disconnect")
    })
})

export { io, server, app }