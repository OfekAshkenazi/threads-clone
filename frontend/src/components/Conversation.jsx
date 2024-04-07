import { Avatar, AvatarBadge, Flex, Image, Stack, Text, WrapItem,useColorModeValue } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from './../atoms/user.atom';
import { BsCheck2All } from 'react-icons/bs'
import selectedConversationAtom from './../atoms/selectedConversation.atom';

export default function Conversation({ conversation }) {
    const loggedInUser = useRecoilValue(userAtom)
    const user = conversation.participants[0]._id === loggedInUser._id ? conversation.participants[1] : conversation.participants[0]
    const lastMessage = conversation.lastMessage
    const [selectedConversation, setSelectedConversation] = useRecoilState(selectedConversationAtom)

    return (
        <Flex
            gap={4}
            alignItems={"center"}
            p={1}
            paddingTop={2}
            paddingBottom={2}
            _hover={{ cursor: "pointer", bg: useColorModeValue("gray.400", "gray.800") }}
            color={"white"}
            borderRadius={"md"}
            onClick={() => setSelectedConversation({
                _id: conversation._id,
                userId: user._id,
                username: user.username,
                userProfilePic: user.profilePic,
                mock: conversation.mock
            })}
            bg={selectedConversation?._id === conversation._id && "gray.600"}
        >

            <WrapItem>
                <Avatar size={{ base: "xs", sm: "sm", md: "md" }} src={user.profilePic}>
                    <AvatarBadge boxSize={"1em"} bg={"green.500"} />
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>

                <Text fontWeight="700" display={"flex"} alignItems={"center"} color={useColorModeValue("gray.dark", "white")} >
                    {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                <Text fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1} color={useColorModeValue("gray.dark", "white")}>
                    {loggedInUser._id === lastMessage.sender ? <BsCheck2All size={13} /> : ""}
                    {lastMessage.text.length > 18 ? lastMessage.text.substring(0, 18) + "..." : lastMessage.text}
                </Text>

            </Stack>

        </Flex>
    )
}