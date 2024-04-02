import { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";
import { useParams } from "react-router-dom";
import useShowToast from './../hooks/useShowToast';
import { Flex, Spinner } from "@chakra-ui/react";

export default function UserPage() {
    const [user, setUser] = useState()
    const [loading, setLoading] = useState(true)

    const { username } = useParams()
    const showToast = useShowToast()

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
            setUser(data)

        } catch (error) {
            showToast("Error", "there was an error while finding this user", "error")
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    if (!user && loading) {
        return (
            <Flex justifyContent={"center"}>
                <Spinner size={"xl"} />

            </Flex>
        )
    }

    if (!user && !loading) return <h1>User not found</h1>
    return (
        <>
            <section>
                <UserHeader user={user} />
                <UserPost likes={600} replies={5} postImg="/post1.png" postTitle="Lets talk about one piece" />
                <UserPost likes={320} replies={15} postImg="/post2.png" postTitle="Lets talk about life" />
                <UserPost likes={456} replies={2} postImg="/post3.png" postTitle="Lets talk about the kids in africa" />
                <UserPost likes={551} replies={16} postImg="/post4.png" postTitle="Lets talk about life" />
            </section>
        </>

    )
}