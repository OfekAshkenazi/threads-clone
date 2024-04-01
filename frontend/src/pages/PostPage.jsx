import { Avatar, Flex } from "@chakra-ui/react";

export default function PostPage() {
    return (
        <>
        
        <Flex>
            <Flex w={"full"} alignItems={"center"} gap={3}>
                <Avatar  src="/post4.png" size={"md"} name="ofek ashkenazi"/>
                <Flex></Flex>
            </Flex>
        </Flex>
        </>
    )
}