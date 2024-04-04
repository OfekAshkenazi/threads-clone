import { Link } from 'react-router-dom';
import { Button, Flex, Spinner } from '@chakra-ui/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from './../atoms/user.atom';
import { useEffect, useState } from 'react';
import useShowToast from '../hooks/useShowToast';
import Post from './../components/Post';
import postsAtom from '../atoms/posts.atom';

export default function HomePage() {
    const user = useRecoilValue(userAtom)
    const showToast = useShowToast()
    const [posts, setPosts] = useRecoilState(postsAtom)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        getFeedPosts()
    }, [])

    async function getFeedPosts() {
        try {
            const res = await fetch("/api/posts/feed")
            const data = await res.json()

            if (data.error) {
                showToast("Error", data.error, "error")
            }
            setPosts(data)

        } catch (error) {
            showToast("Error", error.message, "error")
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            {!loading && posts.length === 0 && <h1>Follow some users to see the feed</h1>}

            {loading && (
                <Flex justifyContent={"center"}>
                    <Spinner size={"xl"} />
                </Flex>
            )}

            {posts.map((post,idx) => {
                return (
                    <Post  key={post._id} post={post} postedBy={post.postedBy} />
                )
            })}


        </>
    )
}
