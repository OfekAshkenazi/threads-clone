import express from "express"
import { createPost, getPost,deletePost } from './post.controller.js'
import { requireAuth } from "../../middleware/requireAuth.middleware.js"


const router = express.Router()

router.get("/:id", getPost)
router.post("/create", requireAuth, createPost)
router.delete("/:id",requireAuth, deletePost)




export default router