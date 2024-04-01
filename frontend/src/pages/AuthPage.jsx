import { useRecoilValue } from 'recoil'
import SignupCard from "../components/SignupCard";
import Login from './../components/Login';
import authScreenAtom from './../atoms/auth.atom';

export default function AuthPage() {
    const authScreenState = useRecoilValue(authScreenAtom)

    return (
        <>
            {authScreenState === "login" ? <Login /> : <SignupCard />}
        </>
    )
}

