import { VStack, Box, Flex, Avatar, Text, Link, Menu, MenuButton, Portal, MenuList, MenuItem, useToast } from "@chakra-ui/react";
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';

export default function UserHeader() {
    const toast = useToast()

    function copyUrl() {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl).then(() => {
            toast({
                title: "Success.",
                status: "success",
                description: "Profile link copied.",
                duration: 1000,
                isClosable: true,
            })
        })
    }

    return (
        <VStack gap={4} alignItems={"start"}>

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
                    <Avatar name="ofek ashkenazi" src="/post4.jpg" size={{ base: "md", md: "xl" }} />
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


                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>

                </Flex>

            </Flex>


            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>

        </VStack>
    )
}