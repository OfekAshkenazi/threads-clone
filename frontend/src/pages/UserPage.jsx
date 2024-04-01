import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

export default function UserPage() {
    return (
        <>
            <UserHeader />
            <UserPost likes={600} replies={5} postImg="/post1.png"/>

        </>
    )
}