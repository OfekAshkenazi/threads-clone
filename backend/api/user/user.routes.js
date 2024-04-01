import express from "express"
import { signup, login } from "./user.controller.js"

const router = express.Router()

router.post("/signup", signup)


export default router