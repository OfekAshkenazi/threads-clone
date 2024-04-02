import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from './../hooks/useShowToast';

export default function UserPage() {
    const [user, setUser] = useState(null)

    const { username } = useParams()
    const showToast = useShowToast()

    useEffect(() => {
        getUser()
        console.log("trigger")

    }, [username])

    async function getUser() {
        try {
            const res = await fetch(`/api/users/profile/${username}`)
            const data = await res.json()

            if (data.error) {
                showToast("Error", "cannot find any user like that", "error")

            }
            setUser(data)

        } catch (error) {
            showToast("Error", "there was an error while finding this user", "error")
            console.log(error)
        }
    }

    return (
        <>
            {user && (
                <section>
                    <UserHeader user={user} />
                    <UserPost likes={600} replies={5} postImg="/post1.png" postTitle="Lets talk about one piece" />
                    <UserPost likes={320} replies={15} postImg="/post2.png" postTitle="Lets talk about life" />
                    <UserPost likes={456} replies={2} postImg="/post3.png" postTitle="Lets talk about the kids in africa" />
                    <UserPost likes={551} replies={16} postImg="/post4.png" postTitle="Lets talk about life" />
                </section>
            )}
        </>

    )
}