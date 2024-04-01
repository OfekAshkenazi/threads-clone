import express from "express"
import {createPost} from './post.controller.js'


const router = express.Router()

router.post("/create", createPost)




export default router