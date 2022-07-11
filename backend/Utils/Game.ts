import Player from "./Player";
import Room from "./Room";

const SUCCESS_MESSAGE = "Correct answer!";

class Game {
    _message: string;
    sender: Player;
    room: Room | null;
    success: boolean;
    final_message: string;

    constructor(message: string, player: Player) {
        this._message = message;
        this.sender = player;
        this.room = player.room;
        this.success = false;
        this.final_message = this._message;
    }

    toString = () => {
        return this._message;
    };

    processMessage = () => {
        if (this.room === null || this.room.secret_keyword === null) return;

        const result =
            this.room.secret_keyword.toLowerCase() ===
            this._message.toLowerCase();

        this.success = result;
        if (result) {
            // TODO: make the sender join success channel (another room, which is exclusive for success players)
            this.final_message = SUCCESS_MESSAGE;
            this.sender.round_success = true;
            this.sender.round_success_time = new Date();
        }
    };
}

export default Game;
