import { VStack, Box, Flex, Avatar, Text, Link, Menu, MenuButton, Portal, MenuList, MenuItem, useToast, Button } from "@chakra-ui/react";
import { BsInstagram } from 'react-icons/bs';
import { CgMoreO } from 'react-icons/cg';
import { useRecoilValue } from 'recoil';
import userAtom from './../atoms/user.atom';
import { Link as RouterLink } from 'react-router-dom'
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

export default function UserHeader({ user }) {
    const showToast = useShowToast()
    const loggedInUser = useRecoilValue(userAtom)
    const [following, setFollowing] = useState(user.followers.includes(loggedInUser._id))
    const [updating, setUpdating] = useState(false)

    function copyUrl() {
        const currentUrl = window.location.href
        navigator.clipboard.writeText(currentUrl).then(() => {
            showToast("Success", "Profile link copied.", "success")
        })
    }

    async function handleFollowUnfollow() {
        if (!loggedInUser) {
            showToast("Error", "Please login to follow", "error")
            return
        }

        if(updating) return
        setUpdating(true)

        try {
            const res = await fetch(`/api/users/follow/${user._id}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()

            if (data.error) {
                showToast("Error", data.error, "error")
                return
            }

            /// only for frontend simulate adding and removing followrs.
            if (following) {
                showToast("Success", `Unfollowed ${user.name}`, "success")
                user.followers.pop()
            } else {
                showToast("Success", `Followed ${user.name}`, "success")
                user.followers.push(loggedInUser._id)

            }

            setFollowing(!following)


        } catch (error) {
            showToast("Error", error, "error")
        }finally{
            setUpdating(false)
        }
    }

    return (
        <VStack gap={4} alignItems={"start"}>

            <Flex justifyContent={"space-between"} w={"full"}>

                <Box>
                    <Text fontSize={{ base: "large", md: "1xl", lg: "2xl" }} fontWeight={"bold"}>
                        {user.name}
                    </Text>
                    <Flex gap={2} alignItems={"center"} >
                        <Text fontSize={{ base: "xs", md: "sm" }}>{user.username}</Text>
                        <Text fontSize={"xs"} bg={"gray.dark"} color={"gray.light"} p={1} borderRadius={"full"}>threads.net</Text>
                    </Flex>
                </Box>


                <Box>
                    {user.profilePic && (
                        <Avatar name={user.name} src={user.profilePic} size={{ base: "md", md: "xl" }} />

                    )}
                    {!user.profilePic && (
                        <Avatar name={user.name} src="https://bit.ly/broken-link" size={{ base: "md", md: "xl" }} />
                    )}

                </Box>


            </Flex>

            <Text>
                {user.bio}
            </Text>

            {loggedInUser._id === user._id && (
                <Link as={RouterLink} to={`/update`}>
                    <Button size={"sm"}>Update Profile</Button>
                </Link>
            )}

            {loggedInUser._id !== user._id && (
                <Button size={"sm"} isLoading={updating} onClick={handleFollowUnfollow}>{following ? "Unfollow" : "Follow"}</Button>

            )}

            <Flex w={"full"} justifyContent={"space-between"}>

                <Flex gap={2} alignItems={"center"}>

                    <Text color={"gray.light"}> {user.followers.length} followers</Text>
                    <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
                    <Link color={"gray.light"}>instagram.com</Link>

                </Flex>

                <Flex>

                    <Box className="icon-container">
                        <BsInstagram size={24} cursor={"pointer"} />
                    </Box>


                    <Box className="icon-container">
                        <Menu>
                            <MenuButton>
                                <CgMoreO size={24} cursor={"pointer"} />
                            </MenuButton>
                            <Portal>
                                <MenuList bg={"gray.dark"}>
                                    <MenuItem bg={"gray.dark"} onClick={copyUrl}>Copy link</MenuItem>
                                </MenuList>
                            </Portal>
                        </Menu>
                    </Box>

                </Flex>

            </Flex>


            <Flex w={"full"}>
                <Flex flex={1} borderBottom={"1.5px solid white"} justifyContent={"center"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Threads</Text>
                </Flex>
                <Flex flex={1} borderBottom={"1px solid gray"} justifyContent={"center"} color={"gray.light"} pb="3" cursor={"pointer"}>
                    <Text fontWeight={"bold"}>Replies</Text>
                </Flex>
            </Flex>

        </VStack>
    )
}