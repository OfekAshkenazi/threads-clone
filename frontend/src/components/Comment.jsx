import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import { useState } from "react"
import { BsThreeDots } from "react-icons/bs"
import ActionsButtons from "./ActionsButtons"

export default function Comment() {
    const [liked, setLiked] = useState()


    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src="post4.png" size={"sm"} />
            </Flex>

            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>username</Text>

                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>1d</Text>
                        <BsThreeDots />
                    </Flex>

                </Flex>

                <Text>Hey this lookes great!</Text>
                <ActionsButtons liked={liked} setLiked={setLiked}/>
                <Text fontSize={"sm"} color={"gray.light"}> {100 + (liked ? 1 :0)} likes</Text>
            </Flex>

            <Divider my={4} />

        </>

    )
}