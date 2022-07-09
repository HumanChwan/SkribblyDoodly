import Player from "./Player";
import Room from "./Room";

class Game {
    _message: string;
    sender: Player;
    room: Room | null;

    constructor(message: string, player: Player) {
        this._message = message;
        this.sender = player;
        this.room = player.room;
    }

    toString = () => {
        return this._message;
    };

    processMessage = () => {
        // TODO: room key-word process
        if (this.room === null || this.room.secret_keyword === null) return;

        const result =
            this.room.secret_keyword.toLowerCase() ===
            this._message.toLowerCase();
    };
}

export default Game;
