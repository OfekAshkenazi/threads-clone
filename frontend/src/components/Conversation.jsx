import { Avatar, AvatarBadge, Flex, Image, Stack, Text, WrapItem, useColorModeValue, Box } from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from './../atoms/user.atom';
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs'
import selectedConversationAtom from './../atoms/selectedConversation.atom';

export default function Conversation({ conversation, isOnline }) {
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
                    {isOnline ? <AvatarBadge boxSize={"1em"} bg={"green.500"} /> : <AvatarBadge boxSize={"1em"} bg={"red.500"} />}
                </Avatar>
            </WrapItem>

            <Stack direction={"column"} fontSize={"sm"}>

                <Text fontWeight="700" display={"flex"} alignItems={"center"} color={useColorModeValue("gray.dark", "white")} >
                    {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
                </Text>
                <Box fontSize={"xs"} display={"flex"} alignItems={"center"} gap={1} color={useColorModeValue("gray.dark", "white")}>
                    {loggedInUser._id === lastMessage.sender ? (
                        <Box color={lastMessage.seen ? "blue.400": ""}>
                            <BsCheck2All size={13} />

                        </Box>
                    ) : ""}
                    {lastMessage.text.length > 18 ? lastMessage.text.substring(0, 18) + "..." : lastMessage.text || <BsFillImageFill size={16}/>}
                </Box>

            </Stack>

        </Flex>
    )
}