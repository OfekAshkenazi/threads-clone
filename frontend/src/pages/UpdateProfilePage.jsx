import { Button, Flex, FormControl, FormLabel, Heading, Input, InputRightElement, Stack, useColorModeValue, Avatar, Center, InputGroup } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/user.atom'

export default function UpdateProfilePage() {
    const [showPassword, setShowPassword] = useState(false)

    const [user, setUser] = useRecoilState(userAtom)

    const [inputs, setInputs] = useState({
        name: user.name,
        username: user.username,
        email: user.email,
        bio: user.bio,
        profilePic: user.profilePic,
        password: ''
    })

    const fileRef = useRef()

    return (
        <Flex align={'center'} justify={'center'} my={6}>
            <Stack
                spacing={4}
                w={'full'}
                maxW={'md'}
                bg={useColorModeValue('white', 'gray.dark')}
                rounded={'xl'}
                boxShadow={'lg'}
                p={6}
            >
                <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                    User Profile Edit
                </Heading>

                <FormControl>

                    <Stack direction={['column', 'row']} spacing={6}>

                        <Center>
                            <Avatar size="xl" src={user.profilePic} boxShadow={"md"}/>
                        </Center>

                        <Center w="full">
                            <Button onClick={() => fileRef.current.click()} w="full">Change Avatar</Button>
                            <input type='file' hidden ref={fileRef}/>
                        </Center>

                    </Stack>

                </FormControl>

                <FormControl >
                    <FormLabel>Full name</FormLabel>
                    <Input
                        placeholder="Full name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={inputs.name}
                        onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
                    />
                </FormControl>
                
                <FormControl >
                    <FormLabel>User name</FormLabel>
                    <Input
                        placeholder="User Name"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={inputs.username}
                        onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
                    />
                </FormControl>
                <FormControl  >
                    <FormLabel>Email address</FormLabel>
                    <Input
                        placeholder="your-email@example.com"
                        _placeholder={{ color: 'gray.500' }}
                        type="email"
                        value={inputs.email}
                        onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
                    />
                </FormControl>
                <FormControl >
                    <FormLabel>Bio</FormLabel>
                    <Input
                        placeholder="Enter your bio"
                        _placeholder={{ color: 'gray.500' }}
                        type="text"
                        value={inputs.bio}
                        onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
                    />
                </FormControl>

                <FormControl >
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                        <Input type={showPassword ? 'text' : 'password'} value={inputs.password}
                            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
                             />
                        <InputRightElement h={'full'}>
                            <Button
                                variant={'ghost'}
                                onClick={() => setShowPassword((showPassword) => !showPassword)}>
                                {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                            </Button>
                        </InputRightElement>
                    </InputGroup>
                </FormControl>
                <Stack spacing={6} direction={['column', 'row']}>
                    <Button
                        bg={'red.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'red.500',
                        }}>
                        Cancel
                    </Button>
                    <Button
                        bg={'blue.400'}
                        color={'white'}
                        w="full"
                        _hover={{
                            bg: 'blue.500',
                        }}>
                        Submit
                    </Button>
                </Stack>
            </Stack>
        </Flex>
    )
}