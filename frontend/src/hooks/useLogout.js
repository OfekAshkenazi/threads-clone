import { useSetRecoilState } from "recoil";
import userAtom from "../atoms/user.atom";
import useShowToast from './useShowToast';

export default function useLogout() {
    const setUser = useSetRecoilState(userAtom)
    const showToast = useShowToast()

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

        } catch (error) {
            console.log(error)
        }
    }

    return {handleLogOut}
}