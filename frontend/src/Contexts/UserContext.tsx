import React, { useContext, createContext, useState, useEffect } from "react";
import io, { Socket } from "socket.io-client";

export interface UserContextInterface {
    username: string;
    setUsername: (username: string) => void;
    joinGlobalRoom: () => void;
    leaveRoom: () => void;
}

const UserContext = createContext<UserContextInterface | null>(null);

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = (props: any) => {
    const [username, setUsername] = useState<string>("");
    const [socket, setSocket] = useState<Socket | null>(null);

    useEffect(() => {
        const userSocket = io(`${process.env.REACT_APP_SERVER_URL}`, {
            query: { username: "" },
        });
        setSocket(userSocket);

        return () => {
            userSocket.close();
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (socket === null) return;

        socket.on("join-room", (players, roomid) => {
            console.log(players, roomid);
        });

        socket.on("room-update", (room) => {
            console.log(room);
        });
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.emit("username-change", username);
    }, [socket, username]);

    const joinGlobalRoom = () => {
        socket?.emit("global-room-assign");
    };

    const leaveRoom = () => {
        socket?.emit("leave-room");
    };

    const value: UserContextInterface = {
        username,
        setUsername,
        joinGlobalRoom,
        leaveRoom,
    };

    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    );
};

export default UserProvider;
