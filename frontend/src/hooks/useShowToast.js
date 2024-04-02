import { useToast } from '@chakra-ui/react';

export default function useShowToast() {
    const toast = useToast()

    function showToast(title, description, status) {
        toast({
            title,
            description,
            status,
            duration: 1500,
            isClosable: true
        });
    }

    return showToast
}
