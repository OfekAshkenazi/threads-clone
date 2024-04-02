import { Flex, Box, FormControl, FormLabel, Input, InputGroup, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link, } from '@chakra-ui/react'

import { useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import authScreenAtom from '../atoms/auth.atom'
import useShowToast from './../hooks/useShowToast';
import userAtom from '../atoms/user.atom'


export default function Login() {
    const [showPassword, setShowPassword] = useState(false)
    const setAuthScreenState = useSetRecoilState(authScreenAtom)
    const showToast = useShowToast()
    const setUser = useSetRecoilState(userAtom)

    const [loading, setLoading] = useState(false)

    const [inputs, setInputs] = useState({
        username: "",
        password: "",
    })

    async function handleLogin() {
        if (!inputs.username || !inputs.password) return showToast('Error', 'please fill all the fileds', 'error')
        setLoading(true)
        try {
            const res = await fetch("/api/users/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(inputs)
            })

            const data = await res.json()
            if (data.error) {
                showToast('Error', data.error, 'error')
                return
            }

            localStorage.setItem("user", JSON.stringify(data))
            setUser(data)

        } catch (error) {
            showToast("Error", error, "error")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }



    return (
        <Flex align={'center'} justify={'center'}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'} textAlign={'center'}>
                        Login
                    </Heading>

                </Stack>
                <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.dark')} boxShadow={'lg'} p={8}
                    w={{
                        base: "full",
                        sm: "400px"
                    }} >
                    <Stack spacing={4}>

                        <FormControl isRequired>
                            <FormLabel>User name</FormLabel>
                            <Input type="text" value={inputs.username} onChange={(e) => setInputs({...inputs, username: e.target.value})} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <InputGroup>
                                <Input type={showPassword ? 'text' : 'password'} value={inputs.password} onChange={(e) => setInputs({...inputs, password: e.target.value})}/>
                                <InputRightElement h={'full'}>
                                    <Button
                                        variant={'ghost'}
                                        onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                        {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                                    </Button>
                                </InputRightElement>
                            </InputGroup>
                        </FormControl>
                        <Stack spacing={10} pt={2}>
                            <Button
                                loadingText="Submitting"
                                size="lg"
                                bg={useColorModeValue("gray.600", "gray.700")}
                                color={'white'}
                                _hover={{
                                    bg: useColorModeValue("gray.700", "gray.800"),
                                }}
                                onClick={handleLogin}
                            >
                                Login
                            </Button>
                        </Stack>
                        <Stack pt={6}>
                            <Text align={'center'}>
                                Don't have an account? <Link onClick={() => setAuthScreenState("signup")} color={'blue.400'}>Sign up</Link>
                            </Text>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    )
}