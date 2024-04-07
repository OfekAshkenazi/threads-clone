import generateTokenAndSetCookie from '../../services/createAndHandleToken.service.js';
import User from './../../models/userModel.js';
import Post from './../../models/postModel.js';
import bcrypt from "bcryptjs";
import { v2 as cloudinary } from 'cloudinary'
import mongoose from "mongoose";


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
                username: newUser.username,
                bio: newUser.bio,
                profilePic: newUser.profilePic
            })
        } else {
            res.status(400).json({ error: 'Invaild user data' })
        }

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in signup", error.message)
    }
}

export async function login(req, res) {
    try {
        const { username, password } = req.body

        const user = await User.findOne({ username })

        const isPasswordTheSame = await bcrypt.compare(password, user?.password || "")

        if (!user || !isPasswordTheSame) return res.status(400).json({ error: "Invalid username or password" })

        generateTokenAndSetCookie(user._id, res)

        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            username: user.username,
            bio: user.bio,
            profilePic: user.profilePic
        })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in login", error.message)
    }
}

export async function logout(req, res) {
    try {
        res.cookie("jwt", "", { maxAge: 1 })
        res.status(200).json({ message: "User logged out" })
    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in logout", error.message)
    }
}

export async function followUnFollowUser(req, res) {
    try {
        const { id } = req.params;
        const userToUpdate = await User.findById(id)
        const currentUser = await User.findById(req.user._id)

        if (id === req.user._id.toString()) return res.status(400).json({ message: "You cannot follow yourself men" })

        if (!userToUpdate || !currentUser) return res.status(400).json({ message: "User Not Found" })

        const isFollowing = currentUser.following.includes(id)

        if (isFollowing) {

            await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
            res.status(200).json({ message: "User unfollowed" })

        } else {

            await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
            await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
            res.status(200).json({ message: "User followed" })

        }

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in logout", error.message)
    }
}

export async function updateUser(req, res) {
    const { name, email, username, password, bio } = req.body
    let { profilePic } = req.body

    const userId = req.user._id

    try {
        let user = await User.findById(userId)
        if (!user) return res.status(400).json({ error: "User not found" })

        if (req.params.id !== userId.toString()) return res.status(400).json({ error: "you cannot update other users profile" })

        if (password) {
            const salt = await bcrypt.genSalt(10)
            const hashedPassword = bcrypt.hash(password, salt)
            user.password = hashedPassword
        }

        if (profilePic) {
            if (user.profilePic) {
                await cloudinary.uploader.destroy(user.profilePic.split("/").pop().split(".")[0])
            }
            const uploadRes = await cloudinary.uploader.upload(profilePic)
            profilePic = uploadRes.secure_url
        }

        user.name = name || user.name
        user.email = email || user.email
        user.username = username || user.username
        user.bio = bio || user.bio
        user.profilePic = profilePic || user.profilePic

        user = await user.save()

        await Post.updateMany(
            { "replies.userId": userId },
            {
                $set: {
                    "replies.$[reply].username": user.username,
                    "replies.$[reply].userProfilePic": user.profilePic,
                }
            },
            { arrayFilters: [{ "reply.userId": userId }] }
        )


        user.password = null
        res.status(200).json({ message: "Profile updated successfully", user })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in updateuser", error.message)
    }
}

export async function getUserProfile(req, res) {
    const { query } = req.params

    try {
        let user
        if (mongoose.Types.ObjectId.isValid(query)) {
            user = await User.findOne({ _id: query }).select("-password").select("-updatedAt")

        } else {
            user = await User.findOne({ username: query }).select("-password").select("-updatedAt")

        }

        if (!user) return res.status(400).json({ error: "user not found" })
        res.status(200).json(user)

    } catch (error) {
        res.status(500).json(error)
        console.log("error in userProfilePage", error.message)
    }
}

export async function getSuggestedUsers(req, res) {
    try {
        const userId = req.user._id
        const usersFollowedByMe = await User.findById(userId).select("following")
        const users = await User.aggregate([
            {
                $match: {
                    _id: { $ne: userId }
                }
            },
            {
                $sample: { size: 10 }
            }
        ])

        const filteredUsers = users.filter(user => !usersFollowedByMe.following.includes(user._id))

        const suggestedUsers = filteredUsers.slice(0, 4)

        suggestedUsers.forEach(user => user.password = null)

        res.status(200).json(suggestedUsers)

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}