import { Avatar, Flex, Text } from "@chakra-ui/react";

export default function Message({ ownMessage }) {
    return (
        <>
            {ownMessage ? (
                <Flex gap={2} alignSelf={"flex-end"}>
                    <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
                        loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren
                    </Text>
                    <Avatar src="" w="7" h="7" />
                </Flex>
            ) : (
                <Flex gap={2}>
                    <Avatar src="" w="7" h="7" />
                    <Text maxW={"350px"} bg={"blue.400"} p={1} borderRadius={"md"}>
                        loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren loren
                    </Text>
                </Flex>
            )}

        </>
    )
}