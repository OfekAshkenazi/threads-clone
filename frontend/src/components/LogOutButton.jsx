import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";
import useShowToast from './../hooks/useShowToast';

export default function LogOutButton() {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()

    async function handleLogOut() {
        try {
            const res = fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json()

            if (data.error) {
                showToast("Error",`cannot log out,: ${data.error} `,"error")
            }

            showToast("Success","log out successfully","suucess")
            localStorage.removeItem("user")
            setUser(null)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogOut}>Log out</Button>
    )
}