import express from "express"
import { createPost } from './post.controller.js'
import { requireAuth } from "../../middleware/requireAuth.middleware.js"


const router = express.Router()

router.post("/create", requireAuth, createPost)




export default router