import Conversation from './../../models/conversationModel.js';
import Message from './../../models/messageModel.js';


export default async function sendMessage() {
    try {
        const { recipientId, message } = req.body
        const senderId = req.user._id

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

        const newMessage = new Message({
            conversationId: conversation._id,
            sender: senderId,
            text: message
        })

        await Promise.all([newMessage.save(), conversation.updateOne({ lastMessage: { text: message, sender: senderId } })])

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
} 