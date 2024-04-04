import express from "express"
import { requireAuth } from "../../middleware/requireAuth.middleware.js"
import {sendMessage,getMessages,getConversations} from "./message.controller.js"
const router = express.Router()

router.get("/conversations",requireAuth, getConversations)
router.get("/:otherUserId",requireAuth, getMessages)
router.post("/",requireAuth, sendMessage)

export default router