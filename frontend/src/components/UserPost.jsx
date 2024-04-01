import { Avatar, Flex, Box, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { BsThreeDots } from 'react-icons/bs';
import ActionsButtons from './ActionsButtons';
import { useState } from 'react';


export default function UserPost() {
    const [liked, setLiked] = useState(false)


    return (
        <Link to={`/ofektheking/post/1`}>

            <Flex gap={3} mb={4} py={5} >

                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size="md" name='ofek ashkenazi' src='/post4.jpg' />
                    <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={"relative"} w={"full"} mr={1.5}>
                        <Avatar
                            size={"xs"}
                            name="ofek ashkenazi"
                            src='https://bit.ly/dan-abramov'
                            position={"absolute"}
                            top={"0px"}
                            left='15px'
                            padding={"2px"}
                        />
                        <Avatar
                            size={"xs"}
                            name="ofek ashkenazi"
                            src='https://bit.ly/sage-adebayo'
                            position={"absolute"}
                            bottom={"0px"}
                            right='-5px'
                            padding={"2px"}
                        />
                        <Avatar
                            size={"xs"}
                            name="ofek ashkenazi"
                            src='https://bit.ly/prosper-baba'
                            position={"absolute"}
                            bottom={"0px"}
                            left='4px'
                            padding={"2px"}
                        />
                    </Box>
                </Flex>

                <Flex flex={1} flexDirection={"column"} gap={2}>

                    <Flex justifyContent={"space-between"} w={"full"}>
                        <Flex w={"full"} alignItems={"center"} >
                            <Text fontSize={"sm"} fontWeight={"bold"} >ofekashkenazi</Text>
                            <Image src='/verified.png' w={4} h={4} ml={1} />
                        </Flex>
                        <Flex gap={4} alignItems={"center"}>
                            <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                            <BsThreeDots />
                        </Flex>
                    </Flex>

                    <Text fontSize={"sm"}>This is a post</Text>

                    <Box borderRadius={6}
                        overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                        <Image src='/post1.webp' w={"full"} />
                    </Box>

                    <Flex gap={3} my={1}>
                        <ActionsButtons liked={liked} setLiked={setLiked} />
                    </Flex>

                    <Flex gap={2} alignItems={"center"}>
                        <Text color={"gray.light"} fontSize={"sm"}>55 replies</Text>
                        <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                        <Text color={"gray.light"} fontSize={"sm"}>105 liked</Text>
                    </Flex>

                </Flex>

            </Flex>

        </Link>
    )
}