import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Input, InputRightElement, Button, InputGroup, useColorModeValue, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import Conversation from "../components/Conversation";
import MessageContainer from "../components/MessageContainer";
import { useEffect, useState } from 'react';
import useShowToast from './../hooks/useShowToast';
import { useRecoilState, useRecoilValue } from 'recoil';
import conversationsAtom from './../atoms/conversations.atom';
import selectedConversationAtom from './../atoms/selectedConversation.atom';
import { GiConversation } from "react-icons/gi";
import userAtom from "../atoms/user.atom";
import { useSocket } from "../context/SocketContext";

export default function ChatPage() {
    const [conversations, setConversations] = useRecoilState(conversationsAtom)
    const [selectedConversation, setSlectedConversation] = useRecoilState(selectedConversationAtom)
    const loggedInUser = useRecoilValue(userAtom)

    const [loading, setLoading] = useState(true)
    const [searchText, setSearchText] = useState("")
    const [searchLoading, setSearchLoading] = useState(false)
    const showToast = useShowToast()
    const { socket, onlineUsers } = useSocket()

    useEffect(() => {
        getConversations()
    }, [setConversations])

    async function getConversations() {
        setSlectedConversation({
            _id: "",
            userId: "",
            username: "",
            userProfilePic: ""
        })
        try {
            const res = await fetch("/api/messages/conversations")
            const data = await res.json()
            if (data.error) {
                showToast("Error", "Cannot find conversations", "error")
                return
            }
            setConversations(data)

        } catch (error) {
            showToast("Error", "Cannot find conversations", "error")
        } finally {
            setLoading(false)
        }
    }

    async function handleConversationsSearch(e) {
        e.preventDefault()
        setSearchLoading(true)

        try {
            const res = await fetch(`/api/users/profile/${searchText}`)

            const searchedUser = await res.json()

            if (searchedUser.error) {
                showToast("Error", searchedUser.error, "error")
                return
            }


            if (searchedUser._id === loggedInUser._id) {
                showToast("Error", "you cant yet sending messages to yourself")
                return
            }

            const conversationExists = conversations.find(conversation => conversation.participants[0]._id === searchedUser._id)
            // when you allready have conversation with that user
            if (conversationExists) {
                setSlectedConversation({
                    _id: conversationExists._id,
                    userId: searchedUser._id,
                    username: searchedUser.username,
                    userProfilePic: searchedUser.profilePic
                })
                return
            }

            // console.log(searchedUser)

            const mockConversation = {
                _id: Date.now(),
                mock: true,
                lastMessage: {
                    text: "",
                    sender: ""
                },
                participants: [{
                    _id: searchedUser._id,
                    username: searchedUser.username,
                    profilePic: searchedUser.profilePic
                }]
            }

            setConversations((prevConversations) => [mockConversation, ...prevConversations])




        } catch (error) {
            console.log(error)
        } finally {
            setSearchLoading(false)
            setSearchText("")
        }

    }


    return (
        <Box position={"absolute"} left={"50%"} w={{ base: "100%", md: "80%", lg: "750px" }} transform={"translateX(-50%)"} p={4}>
            <Flex gap={4} flexDirection={{ base: "column", md: "row" }} maxW={{ sm: "400px", md: "full" }} mx={"auto"} >
                <Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full", }} mx={"auto"}>

                    <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
                        Conversations
                    </Text>

                    <form onSubmit={handleConversationsSearch}>
                        <Flex alignItems={"center"}>
                            <InputGroup>
                                <Input placeholder="Search for a user" onChange={(e) => setSearchText(e.target.value)} value={searchText} />
                                <InputRightElement h={'full'}>
                                    <Button variant={'ghost'} onClick={handleConversationsSearch} isLoading={searchLoading}>
                                        <SearchIcon />

                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </form>

                    {loading && (
                        [0, 1, 2, 3, 4].map((_, idx) => {
                            return (
                                <Flex key={idx} gap={4} alignItems={"center"} p={1} borderRadius={"md"}>

                                    <Box>
                                        <SkeletonCircle size={"10"} />
                                    </Box>

                                    <Flex w={"full"} flexDirection={"column"} gap={3}>

                                        <Skeleton h={"10px"} w={"80px"} />
                                        <Skeleton h={"8px"} w={"90%"} />
                                    </Flex>


                                </Flex>
                            )
                        })
                    )}

                    {!loading && conversations.map((c) => {
                        return (
                            <Conversation key={c._id} conversation={c} isOnline={c.participants[0]._id === loggedInUser?._id ?  onlineUsers.includes(c.participants[1]._id) : onlineUsers.includes(c.participants[0]._id)} />
                        )
                    })}


                </Flex>

                {!selectedConversation._id && (

                    <Flex flex={70} borderRadius={"md"} p={2} flexDirection={"column"} alignItems={"center"} justifyContent={"center"} h={"400px"}>
                        <GiConversation size={95} />
                        <Text fontSize={20}>Select a conversation</Text>
                    </Flex>

                )}


                {selectedConversation._id && <MessageContainer />}


            </Flex>
        </Box>
    )
}