import { getRecipientSocketId, io } from '../../services/socket.js';
import Conversation from './../../models/conversationModel.js';
import Message from './../../models/messageModel.js';
import { v2 as cloudinary } from 'cloudinary';

export async function sendMessage(req, res) {
    try {
        const { recipientId, message } = req.body
        const senderId = req.user._id
        let { image } = req.body

        let conversation = await Conversation.findOne({ participants: { $all: [senderId, recipientId] } })
        if (!conversation) {
            conversation = new Conversation({
                participants: [senderId, recipientId],
                lastMessage: {
                    text: message,
                    sender: senderId
                }
            })
            await conversation.save()
        }

        if(image){
            const resUrl = await cloudinary.uploader.upload(image)
            image = resUrl.secure_url
        }

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message,
            image: image || ""
        })

        await Promise.all([newMessage.save(), conversation.updateOne({ lastMessage: { text: message, sender: senderId } })])

        const recipientSocketId = getRecipientSocketId(recipientId)
        if (recipientSocketId) {
            io.to(recipientSocketId).emit("newMessage", newMessage)
        }

        res.status(201).json(newMessage)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

export async function getMessages(req, res) {
    const { otherUserId } = req.params
    const userId = req.user._id
    try {

        const conversation = await Conversation.findOne({
            participants: { $all: [userId, otherUserId] }
        })

        if (!conversation) return res.status(404).json({ error: "Conversation not found" })

        const messages = await Message.find({ conversationId: conversation._id }).sort({ createdAt: 1 })

        res.status(200).json(messages)


    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}

export async function getConversations(req, res) {
    const userId = req.user._id
    try {
        const conversations = await Conversation.find({ participants: userId }).populate({
            path: "participants",
            select: "username profilePic",
        })

        if (!conversations) return res.status(404).json({ error: "Conversations not found" })

        conversations.forEach(c => {
            c.participants.filter(p => p._id.toString() !== userId.toString())
        })


        res.status(200).json(conversations)
    } catch (error) {
        res.status(500).json({ error: error.message })

    }
}
