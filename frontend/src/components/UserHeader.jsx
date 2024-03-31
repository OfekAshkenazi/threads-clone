import { VStack, Box, Flex, Avatar, Text, Link } from "@chakra-ui/react";
import { BsInstagram } from 'react-icons/bs';

export default function UserHeader() {
    return (
        <VStack gap={4} alignContent={"start"}>

            <Flex justifyContent={"space-between"} w={"full"}>

                <Box>
                    <Text fontSize={"2xl"} fontWeight={"bold"}>
                        ofek ashkenazi
                    </Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={"sm"}>ofekashkenazi.com</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads.net</Text>
                    </Flex>
                </Box>
                <Box>
                    <Avatar name="ofek ashkenazi" src="/post4.jpg" size={"xl"} />
                </Box>


            </Flex>

            <Text>
                FullStack, frontend developer and a great person
            </Text>

            <Flex w={"full"} justifyContent={"space-between"}>

                <Flex gap={2} alignItems={"center"}>

                    <Text color={"gray.light"}>10k followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>

                </Flex>

                <Flex>
                    
                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>

                </Flex>

            </Flex>

        </VStack>
    )
}