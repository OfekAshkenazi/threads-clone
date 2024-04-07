import { Avatar, Flex, Text,Box } from "@chakra-ui/react";
import selectedConversationAtom from './../atoms/selectedConversation.atom';
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";
import { BsCheck2All } from "react-icons/bs";

export default function Message({ ownMessage, message }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const loggedInUser = useRecoilValue(userAtom)
    return (
        <>
            {ownMessage ? (
                <Flex gap={2} alignSelf={"flex-end"}>
                    <Flex bg={"green.800"} maxW={"350px"} p={1} borderRadius={"md"}>
                        <Text color={"white"}>{message.text}</Text>
                        <Box
                            alignSelf={"flex-end"}
                            ml={1}
                            color={message.seen ? "blue.400" : ""}
                            fontWeight={"bold"}
                        >
                            <BsCheck2All size={16} />
                        </Box>
                    </Flex>
                    <Avatar src={loggedInUser.profilePic} w="7" h="7" />
                </Flex>
            ) : (
                <Flex gap={2}>
                    <Avatar src={selectedConversation.userProfilePic} w="7" h="7" />
                    <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
                        {message.text}
                    </Text>
                </Flex>
            )}

        </>
    )
}