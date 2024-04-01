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

        res.status(201).json({ message: "Post created successfully", newPost })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in createPost", error.message)
    }
}

export async function getPost(req, res) {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        res.status(200).json({ post })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in getPost", error.message)
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Unauthorized to delete this post" })
        }

        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Post delete successfully" })

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in deletePost", error.message)
    }
}

export async function linkUnlinkPost(req, res) {
    try {
        const { id: postId } = req.params
        const userId = req.user._id

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ message: "Post not found" })
        }

        const userLikedPost = post.likes.includes(userId)


        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
            res.status(200).json({message: "post unlike successfully"})
        } else {
            post.likes.push(userId)
            await post.save()
            res.status(200).json({message: "post like successfully"})
        }


    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in linkunlike", error.message)
    }
}