import { InputGroup, Input, InputRightElement, Button, Flex } from '@chakra-ui/react';
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from '../hooks/useShowToast';
import selectedConversationAtom from '../atoms/selectedConversation.atom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useState } from 'react';
import conversationsAtom from '../atoms/conversations.atom';


export default function MessageInput({ setMessages }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
	const setConversations = useSetRecoilState(conversationsAtom);

    const showToast = useShowToast()
    const [message, setMessage] = useState("")

    async function handleSendMessage(e) {
        e.preventDefault()
        if (!message) return
        try {
            const res = await fetch("/api/messages/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    recipientId: selectedConversation.userId
                })
            })
            const data = await res.json()

            if (data.error) {
                showToast("Error", "Cannot send message", "error")
                return
            }

            setMessages((messages) => [...messages, data])

            setConversations((prevConversations) => {
                const updatedConversations = prevConversations.map((conversation) => {
                    if (conversation._id === selectedConversation._id) {
                        return {
                            ...conversation,
                            lastMessage: {
                                text: message,
                                sender: data.sender,
                            }
                        }
                    }
                    return conversation
                })
                return updatedConversations
            })

            setMessage("")

        } catch (error) {
            console.log(error)
        } finally {
        }
    }



    return (
        <form onSubmit={handleSendMessage}>

            <InputGroup>
                <Input w={"full"} placeholder={"Type a message"} onChange={(e) => setMessage(e.target.value)} value={message} />
                <Flex gap={1}>
                    <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>

                        <IoSendSharp height={"100%"} cursor={"pointer"} title='send message' />

                    </InputRightElement >

                </Flex>

            </InputGroup>
        </form>
    )
}