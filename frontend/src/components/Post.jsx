import { Avatar, Flex, Box, Text, Image } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import ActionsButtons from './ActionsButtons';
import { useState, useEffect } from 'react';
import useShowToast from '../hooks/useShowToast';
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons';
import { useRecoilState, useRecoilValue } from 'recoil';
import userAtom from '../atoms/user.atom';
import postsAtom from '../atoms/posts.atom';


export default function Post({ post, postedBy }) {
    const showToast = useShowToast()
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState(null)
    const loggedInUser = useRecoilValue(userAtom)
    const [posts, setPosts] = useRecoilState(postsAtom)
    const navigate = useNavigate()


    useEffect(() => {
        getUser()
    }, [postedBy])

    async function getUser() {
        try {
            const res = await fetch("/api/users/profile/" + postedBy);

            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                return
            }

            setUser(data)

        } catch (error) {
            showToast("Error", error.message, "error")
            setUser(null)

        } finally {
            setLoading(false)
        }
    }

    async function handleDeletePost(e) {
        e.preventDefault()
        if (!window.confirm("Are you sure you want to delete this post?")) return
        try {
            const res = await fetch(`/api/posts/${post._id}`, {
                method: "DELETE"
            })

            const data = res.json()

            if (data.error) {
                showToast("Error", "Cannot delete post", "error")
            }

            showToast("Success", "The post has been removed", "success")
            setPosts(posts.filter((p) => p._id !== post._id))

        } catch (error) {
            showToast("Error", error, "error")

        }
    }

    return (
        <Link to={`/${user?.username}/post/${post._id}`}>

            <Flex gap={3} mb={4} py={5}>

                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size="md" name={user?.name} src={user?.profilePic} onClick={(e) => {
                        e.preventDefault()
                        navigate(`/${user?.username}`)
                    }}
                        title='Go to user profile page'
                    />
                    <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={"relative"} w={"full"} mr={1.5}>

                        {post.replies[0] && (<Avatar
                            size={"xs"}
                            name={post.replies[0].username}
                            src={post.replies[0].userProfilePic}
                            position={"absolute"}
                            top={"0px"}
                            left='15px'
                            padding={"2px"}
                        />)}

                        {post.replies[1] && (
                            <Avatar
                                size={"xs"}
                                name={post.replies[1].username}
                                src={post.replies[1].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                right='-5px'
                                padding={"2px"}
                            />
                        )}
                        {post.replies[2] && (
                            <Avatar
                                size={"xs"}
                                name={post.replies[2].username}
                                src={post.replies[2].userProfilePic}
                                position={"absolute"}
                                bottom={"0px"}
                                left='4px'
                                padding={"2px"}
                            />
                        )}
                    </Box>
                </Flex>

                <Flex flex={1} flexDirection={"column"} gap={2}>

                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"} >


                            <Text fontSize={"sm"} fontWeight={"bold"} onClick={(e) => {
                                e.preventDefault()
                                navigate(`/${user?.username}`)
                            }}
                            >
                                {user?.username}
                            </Text>

                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"} >
                                {formatDistanceToNow(new Date(post.createdAt))} ago
                            </Text>

                            {loggedInUser?._id === user?._id && (
                                <DeleteIcon size={20} onClick={handleDeletePost} title="delete post" />
                            )}


                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>{post.text}</Text>

                    {post.image &&
                        <Box borderRadius={6}
                            overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                            <Image src={post.image} w={"full"} />
                        </Box>
                    }

                    <Flex gap={3} my={1}>
                        <ActionsButtons post={post} />
                    </Flex>

                </Flex>

            </Flex>

        </Link>
    )
}