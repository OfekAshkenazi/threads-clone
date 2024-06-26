import { Avatar, Flex, useColorModeValue, Text, Image, Divider, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from './MessageInput';
import { useEffect, useRef, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import selectedConversationAtom from "../atoms/selectedConversation.atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";
import { useSocket } from './../context/SocketContext';
import conversationsAtom from "../atoms/conversations.atom";
import { IoCloseCircleOutline } from "react-icons/io5";
import messageSound from '../assets/sounds/notification.mp3'


export default function MessageContainer() {
    const [loading, setLoading] = useState(true)
    const showToast = useShowToast()
    const [selectedConversation, setSlectedConversation] = useRecoilState(selectedConversationAtom)
    const [messages, setMessages] = useState([])
    const loggedInUser = useRecoilValue(userAtom)
    const { socket } = useSocket()
    const setConversations = useSetRecoilState(conversationsAtom)
    const lastMessageRef = useRef(null)


    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        const lastMessageIsFromOtherUser = messages.length && messages[messages.length - 1].sender !== loggedInUser._id
        if (lastMessageIsFromOtherUser) {
            socket.emit("markMessagesAsSeen", {
                conversationId: selectedConversation._id,
                userId: selectedConversation.userId
            })
        }
        socket.on("messagesSeen", ({ conversationId }) => {
            if (selectedConversation._id === conversationId) {
                setMessages((prevMessages) => {
                    const updatedMessages = prevMessages.map((m) => {
                        if (!m.seen) {
                            return {
                                ...m,
                                seen: true
                            }
                        }
                        return m
                    })
                    return updatedMessages
                })
            }
        })
        return () => {
            socket.off("messagesSeen")
        }
    }, [loggedInUser?._id, messages])

    useEffect(() => {
        socket?.on("newMessage", (message) => {
            if (selectedConversation._id === message.conversationId) {
                setMessages((prevMessages) => [...prevMessages, message])
            }

            if(!document.hasFocus()) {
                const sound = new Audio(messageSound)
                sound.play()
            }


            setConversations((prevConversations) => {
                const updatedConverSations = prevConversations.map((c) => {
                    if (c._id === message.conversationId) {
                        return {
                            ...c,
                            lastMessage: {
                                text: message.text,
                                sender: message.sender
                            }
                        }
                    }
                    return c
                })

                return updatedConverSations
            })
        })
        return () => {
            socket.off("newMessage")
        }
    }, [socket])

    useEffect(() => {
        getMessages()
    }, [selectedConversation])

    async function getMessages() {
        if (selectedConversation.mock) {
            setMessages([])
            setTimeout(() => {
                setLoading(false)
            }, 1500)
            return
        }

        setMessages([])

        try {
            const res = await fetch(`/api/messages/${selectedConversation.userId}`)
            const data = await res.json()

            if (data.error) {
                showToast("Error", "Cannot get messages", "error")
            }
            setMessages(data)


        } catch (error) {
            showToast("Error", error, "error")
        } finally {

            setLoading(false)
        }
    }


    return (
        <Flex flex={70} bg={useColorModeValue("gary.200", "gray.dark")} borderRadius={"md"} flexDirection={"column"} p={2}>

            <Flex w={"full"} h={12} justifyContent={"space-between"} alignItems={"center"} gap={2} bg={useColorModeValue("gray.300", "gray.dark")} p={2} borderRadius={4}>
                <Flex alignItems={"center"} gap={2}>
                    <Avatar src={selectedConversation.userProfilePic} size={"sm"} />
                    <Text display={"flex"} alignItems={"center"}>{selectedConversation.username} <Image src="/verified.png" h={4} ml={1} /></Text>

                </Flex>

                <IoCloseCircleOutline size={24} cursor={"pointer"} onClick={() => setSlectedConversation({
                    _id: "",
                    userId: "",
                    username: "",
                    userProfilePic: ""
                })} />

            </Flex>

            <Divider />

            <Flex flexDirection={"column"} gap={4} my={4} height={"400px"} overflowY={"scroll"} p={1}>

                {loading && (
                    [0, 1, 2, 3, 4].map((_, idx) => {
                        return (
                            <Flex key={idx * 10} gap={2} alignItems={"center"} p={1} borderRadius={"md"} alignSelf={idx % 2 === 0 ? "flex-start" : "flex-end"}>

                                {idx % 2 === 0 && <SkeletonCircle size={7} />}

                                <Flex flexDirection={"column"} gap={2}>
                                    <Skeleton height={"8px"} width={"250px"} />
                                    <Skeleton height={"8px"} width={"250px"} />
                                    <Skeleton height={"8px"} width={"250px"} />
                                </Flex>

                                {idx % 2 !== 0 && <SkeletonCircle size={7} />}

                            </Flex>
                        )
                    })
                )}

                {!loading && messages && (
                    messages.map((message) => {
                        return (
                            <Flex key={message._id} direction={"column"} ref={messages.length - 1 === messages.indexOf(message) ? lastMessageRef : null}>
                                <Message key={message._id} message={message} ownMessage={loggedInUser._id === message.sender} />

                            </Flex>
                        )
                    })
                )}


            </Flex>

            <MessageInput setMessages={setMessages} />
        </Flex>
    )
}