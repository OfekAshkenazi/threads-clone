import { Avatar, Flex, useColorModeValue, Text, Image, Divider, SkeletonCircle, Skeleton } from "@chakra-ui/react";
import Message from "./Message";
import MessageInput from './MessageInput';

export default function MessageContainer() {
    return (
        <Flex flex={70} bg={useColorModeValue("gary.100", "gray.dark")} borderRadius={"md"} flexDirection={"column"} p={2}>


            msgheader

            <Flex w={"full"} h={12} alignItems={"center"} gap={2}>
                <Avatar src="hhtps://bit.ly/borken-link" size={"sm"} />
                <Text display={"flex"} alignItems={"center"}>username <Image src="/verified.png" h={4} ml={1} /></Text>

            </Flex>

            <Divider />

            <Flex flexDirection={"column"} gap={4} my={4} height={"400px"} overflowY={"scroll"} p={1}>

                {false && (
                    [0, 1, 2, 3, 4].map((_, idx) => {
                        return (
                            <Flex key={idx * 10} gap={2} alignItems={"center"} p={1} borderRadius={"md"} alignSelf={idx % 2 === 0 ? "flex-start" : "flex-end"}>

                                {idx % 2 === 0 && <SkeletonCircle size={7} />}

                                <Flex flexDirection={"column"} gap={2}>
                                    <Skeleton height={"8px"} width={"250px"} />
                                    <Skeleton height={"8px"} width={"250px"} />
                                    <Skeleton height={"8px"} width={"250px"} />
                                </Flex>

                                {idx % 2 !== 0 && <SkeletonCircle size={7} />}

                            </Flex>
                        )
                    })
                )}

                <Message ownMessage={true} />
                <Message ownMessage={false} />
                <Message ownMessage={true} />

            </Flex>

            <MessageInput />
        </Flex>
    )
}