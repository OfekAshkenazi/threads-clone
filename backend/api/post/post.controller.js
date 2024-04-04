import User from "../../models/userModel.js";
import Post from './../../models/postModel.js';
import { v2 as cloudinary } from 'cloudinary';


export async function createPost(req, res) {
    try {
        const { postedBy, text } = req.body
        let { image } = req.body

        if (!postedBy || !text) {
            return res.status(400).json({ error: "Pls fill all the text fields are required" })
        }

        const user = await User.findById(postedBy)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        if (user._id.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to create the post" })
        }

        const maxLength = 500
        if (text.length > maxLength) {
            return res.status(400).json({ error: `text need to be less then ${maxLength}` })
        }

        if (image) {
            const uploadRes = await cloudinary.uploader.upload(image)
            image = uploadRes.secure_url
        }

        const newPost = new Post({ postedBy, text, image })

        await newPost.save()

        res.status(201).json({ message: "Post created successfully", newPost })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in createPost", error.message)
    }
}

export async function getPost(req, res) {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        res.status(200).json(post)

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in getPost", error.message)
    }
}

export async function deletePost(req, res) {
    try {
        const post = await Post.findById(req.params.id)

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }
        if (post.postedBy.toString() !== req.user._id.toString()) {
            return res.status(401).json({ error: "Unauthorized to delete this post" })
        }
        if (post.image) {
            const imgId = post.image.split("/").pop().split(".")[0]
            await cloudinary.uploader.destroy(imgId)
        }

        await Post.findByIdAndDelete(req.params.id)

        res.status(200).json({ message: "Post delete successfully" })

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in deletePost", error.message)
    }
}

export async function likeUnlikePost(req, res) {
    try {
        const { id: postId } = req.params
        const userId = req.user._id

        const post = await Post.findById(postId)
        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        const userLikedPost = post.likes.includes(userId)


        if (userLikedPost) {
            await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
            res.status(200).json({ message: "post unlike successfully" })
        } else {
            post.likes.push(userId)
            await post.save()
            res.status(200).json({ message: "post like successfully" })
        }


    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in linkunlike", error.message)
    }
}

export async function replyToPost(req, res) {
    try {
        const { text } = req.body
        const { id: postId } = req.params
        const userId = req.user._id
        const userProfilePic = req.user.profilePic
        const username = req.user.username

        if (!text) {
            return res.status(400).json({ error: "Text field is required" })
        }

        const post = await Post.findById(postId)

        if (!post) {
            return res.status(404).json({ error: "Post not found" })
        }

        const reply = { userId, text, userProfilePic, username }

        post.replies.push(reply)
        await post.save()

        res.status(200).json(reply)

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in replyToPost", error.message)
    }
}

export async function getFeedPosts(req, res) {
    try {
        const userId = req.user._id
        const user = await User.findById(userId)
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }

        const following = user.following;

        const feedPosts = await Post.find({ postedBy: { $in: following } }).sort({ createdAt: -1 })

        res.status(200).json(feedPosts);
    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in getFeedPosts", error.message)

    }
}

export async function getUserPosts(req, res) {
    const { username } = req.params
    try {
        const user = await User.findOne({ username })
        if (!user) {
            return res.status(404).json({ error: "User not found" })
        }
        const posts = await Post.find({ postedBy: user._id }).sort({ createdAt: -1 })
        res.status(200).json(posts)

    } catch (error) {
        res.status(500).json({ error: error.message })
        console.log("error in getUserPosts", error.message)

    }
}