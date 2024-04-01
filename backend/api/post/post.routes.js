import express from "express"
import { createPost, getPost, deletePost, linkUnlinkPost, replyToPost, getFeedPosts } from './post.controller.js'
import { requireAuth } from "../../middleware/requireAuth.middleware.js"


const router = express.Router()

router.get("/:id", getPost)
router.get("/:feed", requireAuth, getFeedPosts)
router.post("/create", requireAuth, createPost)
router.post("/like/:id", requireAuth, linkUnlinkPost)
router.post("/reply/:id", requireAuth, replyToPost)
router.delete("/:id", requireAuth, deletePost)




export default router