import express from "express"
import { signup, login, logout, followUnFollowUser, updateUser, getUserProfile, getSuggestedUsers,freezeAccount } from "./user.controller.js"
import { requireAuth } from "../../middleware/requireAuth.middleware.js"

const router = express.Router()

router.get("/profile/:query", getUserProfile)
router.get("/suggested", requireAuth, getSuggestedUsers)
router.post("/signup", signup)
router.post("/login", login)
router.post("/logout", logout)
router.post("/follow/:id", requireAuth, followUnFollowUser)
router.put("/update/:id", requireAuth, updateUser)
router.put("/freeze", requireAuth, freezeAccount);



export default router