import { useRecoilValue } from 'recoil';
import userAtom from '../atoms/user.atom';
import { useState } from 'react';
import useShowToast from './useShowToast';


export default function useFollowUnFollow(user) {
    const loggedInUser = useRecoilValue(userAtom)
    const showToast = useShowToast()
    const [following, setFollowing] = useState(user.followers.includes(loggedInUser?._id))

    const [updating, setUpdating] = useState(false)
    const userId = user?._id

    async function handleFollowUnfollow() {
        if (!loggedInUser) {
            showToast("Error", "Please login to follow", "error")
            return
        }

        if (updating) return
        setUpdating(true)
        try {
            const res = await fetch(`/api/users/follow/${userId}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            })

            const data = await res.json()

            if (data.error) {
                console.log(data.error)
                showToast("Error", "Cannot follow unfollow", "error")
                return
            }

            /// only for frontend simulate adding and removing followrs.
            if (following) {
                showToast("Success", `Unfollowed ${user?.name}`, "success")
                user.followers.pop()

            } else {
                showToast("Success", `Followed ${user?.name}`, "success")
                user.followers.push(loggedInUser?._id)

            }

            setFollowing(!following)


        } catch (error) {
            showToast("Error", "Cannot follow unfollow", "error")
        } finally {
            setUpdating(false)
        }
    }


    return { handleFollowUnfollow, following, updating }

}

