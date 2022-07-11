import Room from "./Room";

class Player {
    username: string;
    socket_id: string;
    room: Room | null;
    score: number;
    round_success: boolean;
    round_success_time: Date | null;

    constructor(username: string, socket_id: string) {
        this.username = username;
        this.socket_id = socket_id;
        this.room = null;
        this.score = 0;
        this.round_success = false;
        this.round_success_time = null;
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
