import Player from './Player';
import Room from './Room';

/*
-Game (analogous to Round)
    -skribl
*/

class Game {
    room: Room;
    rounds: number;
    secret_keyword: string;

    constructor(rounds: number, room: Room) {
        this.room = room;
        this.rounds = rounds;

        // TODO: secret_keyword --- preparation
        this.secret_keyword = '';
    }

    processMessage = (message: string, player: Player) => {
        const result = this.secret_keyword.toLowerCase() === message.toLowerCase();

        if (result) {
            player.skribl_success = true;
            player.skribl_success_time = new Date();
        }
        return result;
    };
}

export default Game;
