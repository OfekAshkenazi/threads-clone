import { Avatar, Flex, useColorModeValue, Text, Image, Divider, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from './MessageInput';
import { useEffect, useState } from "react";
import useShowToast from "../hooks/useShowToast";
import selectedConversationAtom from "../atoms/selectedConversation.atom";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";

export default function MessageContainer() {
    const [loading, setLoading] = useState(true)
    const showToast = useShowToast()
    const [selectedConversation, setSlectedConversation] = useRecoilState(selectedConversationAtom)
    const [messages, setMessages] = useState([])
    const loggedInUser = useRecoilValue(userAtom)



    useEffect(() => {
        getMessages()
    }, [selectedConversation])

    async function getMessages() {
        try {
            const res = await fetch(`/api/messages/${selectedConversation.userId}`)
            const data = await res.json()

            if (data.error) {
                showToast("Error", "Cannot get messages", "error")
            }
            setMessages(data)


        } catch (error) {
            console.log(error)
        } finally {

            setLoading(false)
        }
    }


    return (
        <Flex flex={70} bg={useColorModeValue("gary.100", "gray.dark")} borderRadius={"md"} flexDirection={"column"} p={2}>


            msgheader

            <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
                <Avatar src="hhtps://bit.ly/broken-link" size={"sm"} />
                <Text display={"flex"} alignItems={"center"}>username <Image src="/verified.png" h={4} ml={1} /></Text>

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

                {!loading && (
                    messages.map((message) => {
                        return (
                            <Message key={message._id} message={message} ownMessage={loggedInUser._id === message.sender} />
                        )
                    })
                )}


            </Flex>

            <MessageInput />
        </Flex>
    )
}