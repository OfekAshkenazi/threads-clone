import { Link } from 'react-router-dom';
import { Button, Flex } from '@chakra-ui/react';
import useShowToast from './../hooks/useShowToast';

export default function HomePage() {
    const showtoast = useShowToast()

    return (
            <Link to={`/ofektheking`}>
                <Flex w={"full"} justifyContent={"center"}>
                    <Button mx={"auto"}>Visit Profile Page</Button>
                </Flex>
            </Link>
    )
}