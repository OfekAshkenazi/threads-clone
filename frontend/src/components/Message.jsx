import { Avatar, Flex, Text } from "@chakra-ui/react";
import selectedConversationAtom from './../atoms/selectedConversation.atom';
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";

export default function Message({ ownMessage, message }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const loggedInUser = useRecoilValue(userAtom)
    return (
        <>
            {ownMessage ? (
                <Flex gap={2} alignSelf={"flex-end"}>
                    <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
                        {message.text}
                    </Text>
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