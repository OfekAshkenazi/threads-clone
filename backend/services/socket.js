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

export const getRecipientSocketId = (recipientId) => {
    return userScoketMap[recipientId]
}

const userScoketMap = {}

io.on("connection", (socket) => {
    console.log("user connected")
    const userId = socket.handshake.query.userId

    if (userId != "undefined") {
        userScoketMap[userId] = socket.id
    }
    // convert the objectMap to an array and puts the keys in the array.
    io.emit("getOnlineUsers", Object.keys(userScoketMap))


    socket.on("disconnect", () => {
        console.log("user disconnect")
        delete userScoketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userScoketMap))
    })
})

export { io, server, app }