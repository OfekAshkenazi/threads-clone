import { createContext } from "react";

const SocketContext = createContext()

export const SocketContextProvider = ({children}) => {
    return (
        <SocketContext.Provider value={"hi"}>
            {children}
        </SocketContext.Provider>
    )
}