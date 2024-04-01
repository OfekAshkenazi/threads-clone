import express from "express"
import { signup, login, logout, followUnFollowUser,updateUser } from "./user.controller.js"
import { requireAuth } from "../../middleware/requireAuth.middleware.js"

const router = express.Router()

router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/follow/:id", requireAuth, followUnFollowUser)
router.post("/update/:id", requireAuth, updateUser)


export default router