import { Flex, Image, useColorMode, Link } from "@chakra-ui/react";
import { useRecoilValue } from 'recoil';
import userAtom from './../atoms/user.atom';
import { AiFillHome } from 'react-icons/ai'
import { RxAvatar } from 'react-icons/rx'
import { Link as RouterLink } from 'react-router-dom'
import { FiLogIn } from "react-icons/fi";



export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()
    const loggedInUser = useRecoilValue(userAtom)

    return (
        <Flex justifyContent={"space-between"} mt={6} mb={4}>

            {loggedInUser &&
                <Link as={RouterLink} to="/">
                    <AiFillHome size={24} />
                </Link>
            }

            <Image cursor={"pointer"} alt="logo" src={colorMode === "dark" ? '/light-logo.svg' : "/dark-logo.svg"} onClick={toggleColorMode} w={6} />

            {loggedInUser &&
                <Link as={RouterLink} to={`/${loggedInUser.username}`}>
                    <RxAvatar size={24} />
                </Link>
            }

            {!loggedInUser && (
                <Link as={RouterLink} to="/auth">
                    <FiLogIn  size={24} />
                </Link>
            )}


        </Flex>
    )
}