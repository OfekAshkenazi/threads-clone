import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import { useParams } from "react-router-dom";
import useShowToast from './../hooks/useShowToast';
import { Flex, Spinner } from "@chakra-ui/react";
import Post from './../components/Post';
import useGetUserProfile from "../hooks/useGetUserProfile";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/posts.atom";

export default function UserPage() {
    const [fetchingPosts, setFetchingPosts] = useState(true);
    const [posts, setPosts] = useRecoilState(postsAtom);

    const { username } = useParams()
    const showToast = useShowToast()
    const { user, loading } = useGetUserProfile()

    useEffect(() => {
        getPosts()
    }, [username, showToast, setPosts, user])

    async function getPosts() {
        if (!user) return
        setPosts([])
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