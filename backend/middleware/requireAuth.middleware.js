import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'

export async function requireAuth(req, res, next) {
    try {
        const token = req.cookies.jwt

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - no token provided" })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECERT)

        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized - invalid token" })
        }

        /// select will delete the password  when return it
        const user = await User.findById(decoded.userId).select("-password")

        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        req.user = user

        next()

    } catch (error) {
        res.status(500).json({ error: "Internal server error" })
    }
}