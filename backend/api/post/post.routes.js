import express from "express"
import { createPost, getPost, deletePost, likeUnlikePost, replyToPost, getFeedPosts, getUserPosts } from './post.controller.js'
import { requireAuth } from "../../middleware/requireAuth.middleware.js"


const router = express.Router()

router.get("/feed", requireAuth, getFeedPosts)
router.get("/:id", getPost)
router.get("/user/:username", getUserPosts)
router.post("/create", requireAuth, createPost)
router.delete("/:id", requireAuth, deletePost)
router.put("/like/:id", requireAuth, likeUnlikePost)
router.put("/reply/:id", requireAuth, replyToPost)

export default router