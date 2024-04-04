import { Avatar, Flex, Text, Image, Box, Divider, Button, Spinner } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import ActionsButtons from "../components/ActionsButtons";
import { useEffect, useState } from "react";
import Comment from "../components/Comment";
import useGetUserProfile from "../hooks/useGetUserProfile";
import useShowToast from './../hooks/useShowToast';
import { useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow } from 'date-fns'
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";
import { DeleteIcon } from '@chakra-ui/icons';



export default function PostPage() {
    const { user, loading } = useGetUserProfile()
    const [post, setPost] = useState(null)
    const showToast = useShowToast()
    const { pid } = useParams()
    const loggedInUser = useRecoilValue(userAtom)
    const navigate = useNavigate()


    useEffect(() => {
        getPost()
    }, [showToast, pid])

    async function getPost() {
        try {
            const res = await fetch(`/api/posts/${pid}`)
            const data = await res.json()
            if (data.error) {
                showToast("Error", "Cannot find post", "error")
            }
            setPost(data)

        } catch (error) {
            showToast("Error", "Cannot find post", "error")

        }
    }

    const handleDeletePost = async () => {
        try {
            if (!window.confirm("Are you sure you want to delete this post?")) return;

            const res = await fetch(`/api/posts/${post._id}`, {
                method: "DELETE",
            });
            const data = await res.json();
            if (data.error) {
                showToast("Error", data.error, "error");
                return;
            }
            showToast("Success", "Post deleted", "success");
            navigate(`/${user.username}`);
        } catch (error) {
            showToast("Error", error.message, "error");
        }
    };


    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />
            </Flex>
        )
    }

    if (!post) return null

    return (
        <>
            <Flex>

                <Flex w={"full"} alignItems={"center"} gap={2}>
                    <Avatar src={user?.profilePic} size={"md"} name="ofek ashkenazi" />

                    <Flex alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>{user?.name}</Text>
                        <Image src="/verified.png" w={4} h={4} ml={2} />
                    </Flex>

                </Flex>

                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"xs"} width={36} textAlign={"right"} color={"gray.light"} >
                        {formatDistanceToNow(new Date(post.createdAt))} ago
                    </Text>

                    {loggedInUser?._id === user?._id && (
                        <DeleteIcon size={20} onClick={handleDeletePost} cursor={"pointer"} />
                    )}


                </Flex>

            </Flex>

            <Text my={3}>{post.text}</Text>

            {post.image && (
                <Box borderRadius={6}
                    overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                    <Image src={post.image} w={"full"} />
                </Box>
            )}

            <Flex gap={3} my={3}>
                <ActionsButtons post={post} />
            </Flex>

            <Divider my={4} />

            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>🤝</Text>
                    <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider my={4} />

            {post.replies.map((reply) => {
                return <Comment reply={reply} key={reply._id} lastReply={reply._id === post.replies[post.replies.length -1]._id}/>
            })}


        </>
    )
}