import { createContext, useContext, useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/user.atom";
import io from "socket.io-client";


const SocketContext = createContext()

export const userSocket = () => {
    return useContext(SocketContext)
}

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null)
    const loggedInUser = useRecoilValue(userAtom)
    const [onlineUsers, setOnlineUsers] = useState([])

    useEffect(() => {
        const socket = io("http://localhost:5000", {
            query: {
                userId: loggedInUser?._id
            }
        })

        setSocket(socket)

        socket.on("getOnlineUsers", (users) => {
            setOnlineUsers(users)
        })
        
        return () => {
            socket && socket.close()
        }
    }, [loggedInUser?._id])
    

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    )
}