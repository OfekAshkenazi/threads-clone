export async function createPost(req, res) {
    try {
        

    } catch (error) {
        res.status(500).json({ message: error.message })
        console.log("error in createPost", error.message)
    }
}