import generateTokenAndSetCookie from '../../services/createAndHandleToken.service.js';
import User from './../../models/userModel.js';
import bcrypt from "bcryptjs";

export async function signup(req, res) {
    try {
        const { name, email, username, password } = req.body
        const user = await User.findOne({ $or: [{ email }, { username }] })

        if (user) {
            return res.status(400).json({ error: "Username and email is allready exists" })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name, email, username, password: hashedPassword
        })
        await newUser.save()

        if (newUser) {

            generateTokenAndSetCookie(newUser._id, res)

            res.status(201).json({
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                username: newUser.username
            })
        } else {
            res.status(400).json({ message: 'Invaild user data' })
        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in signup", error.message)
    }
}

export async function login(req, res) {
    try {

    } catch (error) {

    }
}