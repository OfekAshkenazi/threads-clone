import { InputGroup, Input, InputRightElement, Button, Flex } from '@chakra-ui/react';
import { IoSendSharp } from 'react-icons/io5'
export default function MessageInput() {
    return (
        <InputGroup>
            <Input w={"full"} placeholder={"Type a message"} />
            <Flex gap={1}>
                <InputRightElement>

                    <IoSendSharp height={"100%"} cursor={"pointer"} title='send message'/>

                </InputRightElement >

            </Flex>

        </InputGroup>
    )
}