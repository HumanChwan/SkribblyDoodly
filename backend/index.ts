import express from 'express';
import { createServer } from 'http';
import { Server, Socket } from 'socket.io';
import 'dotenv/config';
import Room from './Utils/Room';
import Player from './Utils/Player';

const PORT = process.env.PORT;
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: process.env.CLIENT_URL,
    },
});

app.use(express.json());

const updateRoom = (room: Room) => {
    io.to(room.ID).emit(
        'room-update',
        room.players.map((room_player) => ({
            username: room_player.username,
            ID: room_player.socket_id,
            score: room_player.score,
            round_success: room_player.skribl_success,
        }))
    );
};

const leaveRoom = (player: Player, socket: Socket) => {
    if (player.room === null) return;

    const room = player.room;
    player.disengage();

    socket.leave(room.ID);

    updateRoom(room);
};

io.on('connection', (socket: Socket) => {
    console.log(`New socket connected`);

    const player = new Player('', socket.id);

    socket.on('global-room-assign', async () => {
        const room = await Room.joinGlobalRoom(player);
        player.room = room;

        socket.join(room.ID);
        updateRoom(room);
    });

    socket.on('chat-send', (message: string) => {
        if (player.room === null) return;

        const messageObj = {
            sender: player.username,
            message: message,
            admin: false,
        };

        const result = player.room.present_game?.round?.processMessage(message);
        if (result) {
            socket.join(`${player.room.ID}-success`);
            player.setWin();

            messageObj.admin = true;
            messageObj.message = 'CORRECT';

            updateRoom(player.room);
        }

        io.to(player.room.ID).emit('chat-receive', messageObj);
    });

    socket.on('game-start', () => {
        if (player.room?.room_host?.socket_id === player.socket_id) {
            const canStart = player.room!.startGameTrigger();
        } else {
            io.emit(
                'system-message',
                'YOU DO NOT HAVE THE ROOM HOST PRIVILEGES'
            );
        }
    });

    socket.on('leave-room', () => {
        leaveRoom(player, socket);
    });

    socket.on('username-change', (username: string) => {
        player.username = username;
        if (player.room) updateRoom(player.room);
    });

    socket.on('disconnect', () => {
        leaveRoom(player, socket);
    });
});

httpServer.listen(PORT, () => {
    console.log(`[⚡] Server listening on : http://localhost:${PORT}/`);
});
