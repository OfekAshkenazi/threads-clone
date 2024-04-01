import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";

export default function LogOutButton() {
    const setUser = useSetRecoilState(userAtom)

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
                console.log(error)
            }
            console.log(data)

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