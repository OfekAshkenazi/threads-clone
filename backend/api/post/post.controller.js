import User from "../../models/userModel.js"
import Post from './../../models/postModel.js';

export async function createPost(req, res) {
    try {
        const { postedBy, text, image } = req.body
        
        if (!postedBy || !text) {
            return res.status(400).json({ message: "Pls fill all the text fields are required" })
        }

        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(404).json({ message: "User not found" })
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to create the post" })
        }

        const maxLength = 500
        if (text.length > maxLength) {
            return res.status(400).json({ message: `text need to be less then ${maxLength}` })
        }

        const newPost = new Post({ postedBy, text, image })

        await newPost.save()

        res.status(201).json({message: "Post created successfully", newPost})

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in createPost", error.message)
    }
}