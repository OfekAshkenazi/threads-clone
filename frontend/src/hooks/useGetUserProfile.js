import { useEffect, useState } from "react"
import useShowToast from "./useShowToast"
import { useParams } from "react-router-dom"

export default function useGetUserProfile() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)
    const showToast = useShowToast()
    const { username } = useParams()

    useEffect(() => {
        getUser()

    }, [username, showToast])


    async function getUser() {
        try {
            const res = await fetch(`/api/users/profile/${username}`)
            const data = await res.json()

            if (data.error) {
                showToast("Error", "Cannot find any user like that", "error")
                return
            }
            if(data.isFrozen) {
                setUser(null)
                return
            }
            
            setUser(data)

        } catch (error) {
            showToast("Error", "there was an error while finding this user", "error")
        } finally {
            setLoading(false)
        }
    }

    return { loading, user }
}