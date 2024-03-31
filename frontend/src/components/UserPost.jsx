import { Avatar, Flex, Box } from '@chakra-ui/react'
import { Link } from 'react-router-dom'


export default function UserPost() {
    return (
        <Link to={`/ofektheking/post/1`}>
            <Flex gap={3} mb={4} py={5} >
                <Flex flexDirection={"column"} alignItems={"center"}>
                    <Avatar size="md" name='ofek ashkenazi' src='/post4.jpg' />
                    <Box w="1px" h={"full"} bg={"gray.light"} my={2}></Box>
                    <Box position={"relative"} w={"full"}>
                        <Avatar size={"xs"} name="ofek ashkenazi" src='https://bit.ly/dan-abramov' position={"absolute"} top={"0px"} left={"15px"} padding={"2px"} />
                        <Avatar size={"xs"} name="ofek ashkenazi" src='https://bit.ly/sage-adebayo' position={"absolute"} bottom={"0px"} right={"-5px"} padding={"2px"} />
                        <Avatar size={"xs"} name="ofek ashkenazi" src='https://bit.ly/prosper-baba' position={"absolute"} bottom={"0px"} left={"4px"} padding={"2px"} />
                    </Box>
                </Flex>
                <Flex flex={1} flexDirection={"column"} gap={2}>
                    <Flex justifyContent={"space-between"}></Flex>
                </Flex>

            </Flex>
        </Link>
    )
}