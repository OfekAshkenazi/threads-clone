import { Avatar, Divider, Flex, Text } from "@chakra-ui/react"
import { BsThreeDots } from "react-icons/bs"
import ActionsButtons from "./ActionsButtons"

export default function Comment({ comment, createdAt, likes, username, userAvatar }) {

    return (
        <>
            <Flex gap={4} py={2} my={2} w={"full"}>
                <Avatar src={userAvatar} size={"sm"} />
            </Flex>

            <Flex gap={1} w={"full"} flexDirection={"column"}>
                <Flex w={"full"} justifyContent={"space-between"} alignItems={"center"}>
                    <Text fontSize={"sm"} fontWeight={"bold"}>{username}</Text>

                    <Flex gap={2} alignItems={"center"}>
                        <Text fontSize={"sm"} color={"gray.light"}>{createdAt}</Text>
                        <BsThreeDots />
                    </Flex>

                </Flex>

                <Text>{comment}</Text>
                {/* <ActionsButtons  /> */}
                <Text fontSize={"sm"} color={"gray.light"}> {likes} likes</Text>
            </Flex>

            <Divider my={4} />

        </>

    )
}