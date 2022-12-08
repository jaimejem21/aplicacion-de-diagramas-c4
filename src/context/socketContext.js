import { createContext, useContext, useEffect } from "react"
import { Api } from "../const/api";
import { useSocket } from "../hooks/useSocket";
import { authContext } from "./authContext";

export const socketContext = createContext(null);

export const SocketContextProvider = ({ children }) => {

    const { socket, online, conectarSocket, desconectarSocket } = useSocket(Api.url);
    const { auth } = useContext(authContext);
    const { isAuthenticated } = auth;

    useEffect(() => {

        if (isAuthenticated) {
            conectarSocket();
        }

    }, [isAuthenticated, conectarSocket]);

    useEffect(() => {

        if (!isAuthenticated) {
            desconectarSocket();
        }

    }, [isAuthenticated, desconectarSocket]);


    return (
        <socketContext.Provider value={{
            socket,
            online
        }}>
            {children}
        </socketContext.Provider>
    )
}

export default socketContext
