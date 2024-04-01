import { Avatar, Flex, Text, Image, Box, Divider, Button } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import ActionsButtons from "../components/ActionsButtons";
import { useState } from "react";
import Comment from "../components/Comment";

export default function PostPage() {
    const [liked, setLiked] = useState(false)
    return (
        <>

            <Flex>

                <Flex w={"full"} alignItems={"center"} gap={2}>
                    <Avatar src="/post4.png" size={"md"} name="ofek ashkenazi" />

                    <Flex alignItems={"center"}>
                        <Text fontSize={"sm"} fontWeight={"bold"}>ofek ashkenazi</Text>
                        <Image src="/verified.png" w={4} h={4} ml={2} />
                    </Flex>

                </Flex>

                <Flex gap={4} alignItems={"center"}>
                    <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                    <BsThreeDots />
                </Flex>

            </Flex>

            <Text my={3}>Lets talk about one piece</Text>

            <Box borderRadius={6}
                overflow={"hidden"} border={"1px solid"} borderColor={"gray.light"}>
                <Image src={"/post1.png"} w={"full"} />
            </Box>

            <Flex gap={3} my={3}>
                <ActionsButtons liked={liked} setLiked={setLiked} />
            </Flex>

            <Flex gap={2} alignItems={"center"}>
                <Text color={"gray.light"} fontSize={"sm"}>238 replies</Text>
                <Box w={0.5} h={0.5} borderRadius={"full"} bg={"gray.light"}></Box>
                <Text color={"gray.light"} fontSize={"sm"}>
                    {200 + (liked ? 1 : 0)} likes
                </Text>
            </Flex>

            <Divider my={4}/>

            <Flex justifyContent={"space-between"} alignItems={"center"}>
                <Flex gap={2} alignItems={"center"}>
                    <Text fontSize={"2xl"}>🤝</Text>
                    <Text color={"gray.light"}>Get the app to like, reply and post.</Text>
                </Flex>
                <Button>Get</Button>
            </Flex>

            <Divider my={4}/>

            <Comment comment="Hey this lookes great!" createdAt="2d" likes={100} username="Thghostx" userAvatar="/post4.png"/>

        </>
    )
}