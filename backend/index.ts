import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";
import "dotenv/config";
import Room from "./Utils/Room";
import Player from "./Utils/Player";
import Game from "./Utils/Game";

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
        "room-update",
        room.players.map((room_player) => ({
            username: room_player.username,
            ID: room_player.socket_id,
            score: room_player.score,
            round_sucess: room_player.round_success,
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

io.on("connection", (socket: Socket) => {
    console.log(`New socket connected`);

    const player = new Player("", socket.id);

    socket.on("global-room-assign", async () => {
        const room = await Room.joinGlobalRoom(player);
        player.room = room;

        socket.join(room.ID);
    });

    socket.on("chat-send", (message) => {
        if (player.room === null) return;

        const game = new Game(message, player);
        game.processMessage();

        io.to(player.room.ID).emit("chat-receive", {
            success: game.success,
            sender: player.username,
            message: game.final_message,
        });
        updateRoom(player.room);
    });

    socket.on("leave-room", () => {
        leaveRoom(player, socket);
    });

    socket.on("username-change", (username: string) => {
        player.username = username;
    });

    socket.on("disconnect", () => {
        leaveRoom(player, socket);
    });
});

httpServer.listen(PORT, () => {
    console.log(`[⚡] Server listening on : http://localhost:${PORT}/`);
});
