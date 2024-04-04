import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Input, InputRightElement, Button, InputGroup, useColorModeValue } from "@chakra-ui/react";

export default function ChatPage() {
    return (
        <Box position={"absolute"} left={"50%"} w={{ base: "100%", md: "80%", lg: "750px" }} transform={"translateX(-50%)"} p={4}>
            <Flex gap={4} flexDirection={{ base: "column", md: "row" }} maxW={{ sm: "400px", md: "full" }} mx={"auto"} >
                <Flex flex={30} gap={2} flexDirection={"column"} maxW={{sm:"250px",md:"full",}} mx={"auto"}>
                    <Text fontWeight={700} color={useColorModeValue("gray.600","gray.400")}>
                        Conversations
                    </Text>
                    <form>
                        <Flex alignItems={"center"}>
                            <InputGroup>
                                <Input placeholder="Search for a user" />
                                <InputRightElement h={'full'}>
                                    <Button variant={'ghost'}>
                                        <SearchIcon />

                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </Flex>
                    </form>
                </Flex>
                <Flex flex={70}>MsgContainer</Flex>
            </Flex>
        </Box>
    )
}