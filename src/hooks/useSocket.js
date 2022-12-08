import { useCallback, useEffect, useState } from 'react'
import { io } from 'socket.io-client';

export const useSocket = (serverPath) => {

    const [socket, setSocket] = useState(null);
    const [online, setOnline] = useState(false);

    const conectarSocket = useCallback(() => {

        let token = JSON.parse(atob(localStorage.getItem("keyID"))) || null;

        let socketTemp = io(serverPath, {
            transports: ["websocket"],
            forceNew: true,
            query: {
                idsocket: token.id
            }
        });

        setSocket(socketTemp);

    }, [serverPath]);

    const desconectarSocket = useCallback(() => {
        socket?.disconnect();
    }, [socket]);

    useEffect(() => {
        socket?.on("connect", () => {
            setOnline(true);
        });
    }, [socket]);

    useEffect(() => {
        setOnline(socket?.connected);
    }, [socket]);

    useEffect(() => {
        socket?.on("disconnect", () => {
            setOnline(false);
        });
    }, [socket]);

    return {
        socket,
        online,
        conectarSocket,
        desconectarSocket
    }
}
