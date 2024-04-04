import { Avatar, Divider, Flex, Text, useColorModeValue } from "@chakra-ui/react"

export default function Comment({ reply, lastReply }) {
    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"} alignItems={"center"}>
                <Avatar src={reply.userProfilePic} size={"sm"} />
                <Flex gap={1} w={"full"} flexDirection={"column"}>
                    <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                        <Text fontSize='sm' fontWeight='bold' textDecoration={"underline"}>
                            {reply.username}
                        </Text>
                    </Flex>
                    <Text>{reply.text}</Text>
                </Flex>
            </Flex>

            {!lastReply ? <Divider borderColor={useColorModeValue('gray.light', 'gray.dark')} /> : null}
        </>

    )
}