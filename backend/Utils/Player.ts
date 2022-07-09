import Room from "./Room";

class Player {
    username: string;
    socket_id: string;
    room: Room | null;
    score: number;

    constructor(username: string, socket_id: string) {
        this.username = username;
        this.socket_id = socket_id;
        this.room = null;
        this.score = 0;
    }

    disengage = () => {
        if (this.room === null) return;
        this.room.players = this.room.players.filter(
            (room_player) => room_player.socket_id !== this.socket_id
        );
        this.room = null;
    };
}

export default Player;
