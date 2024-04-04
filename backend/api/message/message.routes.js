import express from "express"
import { requireAuth } from "../../middleware/requireAuth.middleware.js"
import sendMessage from "./message.controller.js"
const router = express.Router()

router.post("/",requireAuth, sendMessage)

export default router