import { Avatar, Flex, Text, Box, Image, Skeleton } from "@chakra-ui/react";
import selectedConversationAtom from './../atoms/selectedConversation.atom';
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";
import { BsCheck2All } from "react-icons/bs";
import { useState } from "react";

export default function Message({ ownMessage, message }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const loggedInUser = useRecoilValue(userAtom)
    const [imageLoaded, setImageLoaded] = useState(false)

    return (
        <>
            {ownMessage ? (
                <Flex gap={2} alignSelf={"flex-end"}>

                    {message.text && (
                        <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"} >
                            <Text color={"white"}>{message.text} </Text>
                            <Box
                                alignSelf={"flex-end"}
                                ml={1}
                                color={message.seen ? "blue.400" : ""}
                                fontWeight={"bold"}
                            >
                                <BsCheck2All size={16} />
                            </Box>
                        </Flex>
                    )}

                    {message.image && !imageLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image alt="Message image" hidden onLoad={() => setImageLoaded(true)} borderRadius={4} src={message.image} />
                            <Skeleton w={"200px"} h={"200px"} />
                        </Flex>
                    )}

                    {message.image && imageLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image alt="Message image" borderRadius={4} src={message.image} />
                        </Flex>

                    )}


                    <Avatar src={loggedInUser.profilePic} w="7" h="7" />
                </Flex>
            ) : (
                <Flex gap={2}>
                    <Avatar src={selectedConversation.userProfilePic} w="7" h="7" />

                    {message.text && (
                        <Text maxW={"350px"} bg={"gray.400"} p={1} borderRadius={"md"} color={"gray.dark"}>
                            {message.text}
                        </Text>

                    )}


                    {message.image && !imageLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image alt="Message image" hidden onLoad={() => setImageLoaded(true)} borderRadius={4} src={message.image} />
                            <Skeleton w={"200px"} h={"200px"} />
                        </Flex>
                    )}

                    {message.image && imageLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Image alt="Message image" borderRadius={4} src={message.image} />
                        </Flex>

                    )}
                </Flex>
            )}

        </>
    )
}