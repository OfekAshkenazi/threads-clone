import express from "express"
import { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts } from './post.controller.js'
import { requireAuth } from "../../middleware/requireAuth.middleware.js"


const router = express.Router()

router.get("/feed", requireAuth, getFeedPosts)
router.get("/:id", getPost)
router.post("/create", requireAuth, createPost)
router.delete("/:id", requireAuth, deletePost)
router.post("/like/:id", requireAuth, likeUnlikePost)
router.post("/reply/:id", requireAuth, replyToPost)

export default router