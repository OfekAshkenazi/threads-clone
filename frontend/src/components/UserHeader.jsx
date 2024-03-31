import { VStack, Box, Flex, Avatar, Text } from "@chakra-ui/react";

export default function UserHeader() {
    return (
        <VStack gap={4} alignContent={"start"}>

            <Flex justifyContent={"space-between"} w={"full"}>

                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        ofek ashkenazi
                    </Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"}>10,000 followers</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="ofek ashkenazi" src="/post4.jpg" size={"xl"} />
                </Box>


            </Flex>

            
        </VStack>
    )
}