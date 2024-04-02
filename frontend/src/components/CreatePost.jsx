import { AddIcon } from "@chakra-ui/icons";
import { Button, useColorModeValue, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, Textarea, Text, Input, Flex, Image, CloseButton } from "@chakra-ui/react";
import { useRef, useState } from "react";
import usePreviewImage from "../hooks/usePreviewImage";
import { BsFillImageFill } from "react-icons/bs";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";
import useShowToast from "../hooks/useShowToast";

const MAX_CHAR = 500

export default function CreatePost() {
    const [postText, setPostText] = useState("")
    const [remainingChar, setRemainingChar] = useState(MAX_CHAR)
    const [loading, setLoading] = useState(false)
    const user = useRecoilValue(userAtom)


    const { isOpen, onOpen, onClose } = useDisclosure()
    const { handleImageChange, imageUrl, setImageUrl } = usePreviewImage()
    const showToast = useShowToast()

    function handlePostText(e) {
        const inputText = e.target.value

        if (inputText.length > MAX_CHAR) {
            const filterText = inputText.slice(0, MAX_CHAR)
            setPostText(filterText)
            setRemainingChar(0)
        } else {
            setPostText(inputText)
            setRemainingChar(MAX_CHAR - inputText.length)
        }

    }

    const imageRef = useRef(null)

    async function handleCreatePost() {
        setLoading(true)
        try {
            const res = await fetch("/api/posts/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ postedBy: user._id, text: postText, image: imageUrl })
            })

            const data = await res.json()

            if (data.error) {
                showToast("Error", data.error, "error")
                return
            }

            showToast("Success", "Post created successfully", "success")
            onClose()
            setPostText("")
            setImageUrl("")
            
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <Button
                position={"fixed"}
                bottom={10}
                right={10}
                leftIcon={<AddIcon />}
                bg={useColorModeValue("gray.300", "gray.dark")}
                onClick={onOpen}
            >
                Post
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>

                        <FormControl>
                            <Textarea placeholder="Post content on here" onChange={handlePostText} value={postText}></Textarea>
                            <Text fontSize={"xs"} fontWeight={"bold"} textAlign={"right"} m={1} color={"gray.800"}>{`${remainingChar}/${MAX_CHAR}`}</Text>

                            <Input type="file" hidden ref={imageRef} onChange={handleImageChange} />
                            <BsFillImageFill style={{ marginLeft: "5px", cursor: "pointer" }} size={16} onClick={() => imageRef.current.click()} />


                        </FormControl>


                        {imageUrl && (
                            <Flex mt={5} w={"full"} position={"relative"}>

                                <Image src={imageUrl} alt="Selected image" />
                                <CloseButton onClick={() => setImageUrl("")} bg={"gray.800"} position={"absolute"} top={2} right={2} />

                            </Flex>
                        )}

                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={handleCreatePost} isLoading={loading}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </>
    )
}