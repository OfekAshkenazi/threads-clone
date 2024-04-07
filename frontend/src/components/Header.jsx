import { Flex, Image, useColorMode, Link, Button, Divider } from "@chakra-ui/react";
import { useRecoilValue, useSetRecoilState } from 'recoil';
import userAtom from './../atoms/user.atom';
import { AiFillHome } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { Link as RouterLink } from 'react-router-dom'
import { FiLogIn, FiLogOut } from "react-icons/fi";
import { BsChatSquareText } from "react-icons/bs";

import useLogout from "../hooks/useLogout";
import authScreenAtom from './../atoms/auth.atom';



export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()
    const loggedInUser = useRecoilValue(userAtom)
    const { handleLogOut } = useLogout()
    const setAuthScreen = useSetRecoilState(authScreenAtom);

    return (

        <>
            <Flex justifyContent={"space-between"} mt={6} mb={4}>

                {loggedInUser &&
                    <Link as={RouterLink} to="/" title="home page">
                        <AiFillHome size={24} />
                    </Link>
                }

                {!loggedInUser && (
                    <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("login")}>
                        Login
                    </Link>
                )}

                <Image title="Change dark/light mode" cursor={"pointer"} alt="logo" src={colorMode === "dark" ? '/light-logo.svg' : "/dark-logo.svg"} onClick={toggleColorMode} w={6} />

                {loggedInUser &&
                    <Flex alignItems={"center"} gap={4} >
                        <Link as={RouterLink} to={`/${loggedInUser.username}`}>
                            <RxAvatar size={23} title="Profile page" />
                        </Link>

                        <Link as={RouterLink} to={`/chat`} position={"relative"} top={"0.5px"}>
                            <BsChatSquareText size={22} title="Chat" />
                        </Link>

                        <Button size={"sm"} onClick={handleLogOut} title="Logout">
                            <FiLogOut size={17} />
                        </Button>
                    </Flex>
                }

                {!loggedInUser && (
                    <Link as={RouterLink} to={"/auth"} onClick={() => setAuthScreen("signup")}>
                        signup
                    </Link>
                )}



            </Flex>

            <Divider my={4}/>

        </>

    )
}