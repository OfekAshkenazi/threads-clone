import { Link } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import { useRecoilValue } from 'recoil';
import userAtom from './../atoms/user.atom';

export default function HomePage() {
    const user = useRecoilValue(userAtom)
    console.log(user)
    return (
        <Link to={`/${user.username}`}>
            <Flex w={"full"} justifyContent={"center"}>
                <Button mx={"auto"}>Visit Profile Page</Button>
            </Flex>
        </Link>
    )
}