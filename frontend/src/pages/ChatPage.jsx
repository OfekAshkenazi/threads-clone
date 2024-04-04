import { SearchIcon } from "@chakra-ui/icons";
import { Box, Flex, Text, Input, InputRightElement, Button, InputGroup, useColorModeValue, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import Conversation from "../components/Conversation";

export default function ChatPage() {
    return (
        <Box position={"absolute"} left={"50%"} w={{ base: "100%", md: "80%", lg: "750px" }} transform={"translateX(-50%)"} p={4}>
            <Flex gap={4} flexDirection={{ base: "column", md: "row" }} maxW={{ sm: "400px", md: "full" }} mx={"auto"} >
                <Flex flex={30} gap={2} flexDirection={"column"} maxW={{ sm: "250px", md: "full", }} mx={"auto"}>
                    <Text fontWeight={700} color={useColorModeValue("gray.600", "gray.400")}>
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

                    {true && (
                        [0, 1, 2, 3, 4].map((_, idx) => {
                            return (
                                <Flex key={idx} gap={4} alignItems={"center"} p={1} borderRadius={"md"}>

                                    <Box>
                                        <SkeletonCircle size={"10"} />
                                    </Box>

                                    <Flex w={"full"} flexDirection={"column"} gap={3}> 
                                    
                                    <Skeleton h={"10px"} w={"80px"}/>
                                    <Skeleton h={"8px"} w={"90%"}/>
                                    </Flex>


                                </Flex>
                            )
                        })
                    )}

                    <Conversation />

                </Flex>
                <Flex flex={70}>MsgContainer</Flex>
            </Flex>
        </Box>
    )
}