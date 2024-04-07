import { Text, Flex, Box, Skeleton, SkeletonCircle } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import SuggestedUser from './SuggestedUser';
import useShowToast from '../hooks/useShowToast';

export default function SuggestedUsers() {
    const [loading, setLoading] = useState(false)
    const [suggestedUsers, setSuggestedUsers] = useState([])
    const showToast = useShowToast()

    useEffect(() => {
        getSuggestedUsers()
    }, [])

    async function getSuggestedUsers() {
        setLoading(true)
        try {
            const res = await fetch("/api/users/suggested")

            const data = await res.json()
            if (data.error) {
                showToast("Error", data.error, "error")
                return
            }

            setSuggestedUsers(data)

        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }


    return (
        <>
            <Text mb={6} fontWeight={"bold"}>
                Suggested Users
            </Text>


            <Flex direction={"column"} gap={4}>

                {!loading && suggestedUsers.map((user) => {
                    return (
                        <SuggestedUser key={user._id} user={user} />
                    )
                })}

                {loading && [0, 1, 2, 3].map((_, idx) => {
                    return (
                        <Flex key={`123456-${idx}`} gap={2} alignItems={"center"} p={1} borderRadius={"md"}>

                            <Box>
                                <SkeletonCircle size={10} />
                            </Box>

                            <Flex w={"full"} flexDirection={"column"} gap={2}>
                                <Skeleton h={"8px"} w={"80px"} />
                                <Skeleton h={"8px"} w={"80px"} />
                            </Flex>

                            <Flex>
                                <Skeleton h={"20px"} w={"60px"} />
                            </Flex>

                        </Flex>
                    )
                })}

            </Flex>
        </>
    )
}