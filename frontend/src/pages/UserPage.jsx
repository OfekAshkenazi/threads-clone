import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from './../hooks/useShowToast';
import { Flex, Spinner } from "@chakra-ui/react";
import Post from './../components/Post';

export default function UserPage() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const [posts, setPosts] = useState([]);

    const { username } = useParams()
    const showToast = useShowToast()

    useEffect(() => {
        getUser()
        getPosts()
    }, [username, showToast, setPosts])

    async function getUser() {
        try {
            const res = await fetch(`/api/users/profile/${username}`)
            const data = await res.json()

            if (data.error) {
                showToast("Error", "Cannot find any user like that", "error")
                return
            }
            setUser(data)

        } catch (error) {
            showToast("Error", "there was an error while finding this user", "error")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    async function getPosts() {
        try {
            const res = await fetch(`/api/posts/user/${username}`)
            const data = await res.json()

            if (data.error) {
                showToast("Error", "Cannot find any user like that", "error")
                return
            }
            setPosts(data)

        } catch (error) {
            showToast("Error", "there was an error while finding this user", "error")
            setPosts([])

        } finally {
            setFetchingPosts(false)
        }
    }

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />

            </Flex>
        )
    }

    if (!user && !loading) return <h1>User not found</h1>
    return (
        <>
            <UserHeader user={user} />
            {!fetchingPosts && posts.length === 0 && <h1>User have no posts</h1>}
            {fetchingPosts && (
                <Flex justifyContent={"center"} my={12}>
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {posts.map((post) => {
                return <Post key={post._id} post={post} postedBy={post.postedBy} />
            })}
        </>

    )
}