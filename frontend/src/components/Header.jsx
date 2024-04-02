import { Flex, Image, useColorMode } from "@chakra-ui/react";

export default function Header() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex justifyContent={"center"} mt={6} mb={4}>
            <Image cursor={"pointer"} alt="logo" src={colorMode === "dark" ? '/light-logo.svg' : "/dark-logo.svg"} onClick={toggleColorMode} w={6} />
        </Flex>
    )
}