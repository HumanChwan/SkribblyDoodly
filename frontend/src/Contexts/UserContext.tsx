import React, { useContext, createContext, useState, useEffect } from 'react';
import io, { Socket } from 'socket.io-client';
import { IPlayer } from '../types';

export interface IUserContextInterface {
    username: string;
    setUsername: (username: string) => void;
    joinGlobalRoom: () => void;
    leaveRoom: () => void;
    socket: Socket | null;
    roomPlayers: Array<IPlayer>;
}

const UserContext = createContext<IUserContextInterface | null>(null);

export const useUser = () => {
    return useContext(UserContext);
};

const UserProvider = (props: any) => {
    const [username, setUsername] = useState<string>('');
    const [socket, setSocket] = useState<Socket | null>(null);
    const [roomPlayers, setRoomPlayers] = useState<Array<IPlayer>>([]);
    const [roomID, setRoomID] = useState<string | null>('');

    useEffect(() => {
        const userSocket = io(`${process.env.REACT_APP_SERVER_URL}`);
        setSocket(userSocket);

        return () => {
            userSocket.close();
            setSocket(null);
        };
    }, []);

    useEffect(() => {
        if (socket === null) return;

        socket.on('join-room', (players: Array<IPlayer>, roomID: string) => {
            setRoomPlayers(players);
            setRoomID(roomID);
        });

        socket.on('room-update', (players: Array<IPlayer>) => {
            setRoomPlayers(players);
        });
    }, [socket]);

    useEffect(() => {
        if (socket === null) return;
        socket.emit('username-change', username);
    }, [socket, username]);

    const joinGlobalRoom = () => {
        socket?.emit('global-room-assign');
    };

    const leaveRoom = () => {
        socket?.emit('leave-room');
    };

    const value: IUserContextInterface = {
        username,
        setUsername,
        joinGlobalRoom,
        leaveRoom,
        socket,
        roomPlayers,
    };

    return <UserContext.Provider value={value}>{props.children}</UserContext.Provider>;
};

export default UserProvider;
