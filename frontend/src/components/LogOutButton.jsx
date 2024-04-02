import { Button } from "@chakra-ui/react";
import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";
import useShowToast from './../hooks/useShowToast';
import { FiLogOut } from 'react-icons/fi'
import { useNavigate } from "react-router-dom";

export default function LogOutButton() {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()
    const navi = useNavigate()

    async function handleLogOut() {
        try {
            const res = await fetch("/api/users/logout", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            })

            const data = await res.json()

            if (data.error) {
                // showToast("Error",`cannot log out,: ${data.error} `,"error")
                console.log(data.error)
            }

            showToast("Success", "log out successfully", "success")

            localStorage.removeItem("user")
            setUser(null)
            navi("/")

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Button position={"fixed"} top={"30px"} right={"30px"} size={"sm"} onClick={handleLogOut}>
            <FiLogOut size={15} />
        </Button>
    )
}