import UserHeader from "../components/UserHeader";
import UserPost from "../components/UserPost";

export default function UserPage() {
    return (
        <>
            <UserHeader />
            <UserPost likes={600} replies={5} postImg="/post1.png" postTitle="Lets talk about one piece" />
            <UserPost likes={320} replies={15} postImg="/post2.png" postTitle="Lets talk about life" />
            <UserPost likes={456} replies={2} postImg="/post3.png" postTitle="Lets talk about the kids in africa" />
            <UserPost likes={551} replies={16} postImg="/post4.png" postTitle="Lets talk about life" />

        </>
    )
}