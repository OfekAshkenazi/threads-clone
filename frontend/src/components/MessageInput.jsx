import { Flex, Image, Input, InputGroup, InputRightElement, Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay, Spinner, useDisclosure, } from '@chakra-ui/react';
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from '../hooks/useShowToast';
import selectedConversationAtom from '../atoms/selectedConversation.atom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { useRef, useState } from 'react';
import conversationsAtom from '../atoms/conversations.atom';
import { BsFillImageFill } from 'react-icons/bs';
import usePreviewImage from '../hooks/usePreviewImage';


export default function MessageInput({ setMessages }) {
    const selectedConversation = useRecoilValue(selectedConversationAtom)
    const setConversations = useSetRecoilState(conversationsAtom);
    const [loading, setLoading] = useState(false)

    const showToast = useShowToast()
    const [message, setMessage] = useState("")
    const imageRef = useRef(null)
    const { onClose } = useDisclosure()
    const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage()


    async function handleSendMessage(e) {
        e.preventDefault()
        if (!message && !imageUrl) return
        if(loading) return 
        setLoading(true)

        try {
            const res = await fetch("/api/messages/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    message: message,
                    recipientId: selectedConversation.userId,
                    image: imageUrl,
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
            setImageUrl("")

        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return (

        <Flex gap={2} alignItems={"center"}>

            <form onSubmit={handleSendMessage} style={{ flex: 95 }}>

                <InputGroup>
                    <Input w={"full"} placeholder={"Type a message"} onChange={(e) => setMessage(e.target.value)} value={message} />
                    <Flex gap={1}>
                        <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>

                            <IoSendSharp height={"100%"} cursor={"pointer"} title='send message' />

                        </InputRightElement >

                    </Flex>

                </InputGroup>
            </form>

            <Flex flex={5} cursor={"pointer"}>
                <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
                <Input type={"file"} hidden ref={imageRef} onChange={handleImageChange} />

            </Flex>
            <Modal isOpen={imageUrl}
                onClose={() => {
                    onClose()
                    setImageUrl("")
                }}

            >

                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>

                        <Flex mt={5} w={"full"}>
                            <Image src={imageUrl} borderRadius={4} />
                        </Flex>
                        <Flex justifyContent={"flex-end"} my={3}>
                            {!loading ? (
                            <IoSendSharp size={20} cursor={"pointer"} onClick={handleSendMessage} />

                            ) : (
                                <Spinner size={"md"}/>
                            )}
                        </Flex>

                    </ModalBody>
                </ModalContent>
            </Modal>


        </Flex>
    )
}