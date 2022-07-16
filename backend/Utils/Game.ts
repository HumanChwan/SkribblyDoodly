import assert from 'assert';
import Room from './Room';
import Round from './Round';

class Game {
    round: Round;
    rounds_left: number;
    room: Room;

    in_play: boolean;

    constructor(room: Room, numberOfRounds: number) {
        this.round = new Round(room.players);
        this.rounds_left = numberOfRounds - 1;
        this.room = room;

        this.in_play = true;
    }

    refresh = () => {
        this.room.players.forEach((player) => {
            player.refresh();
        });
    };

    roundRefresh = () => {
        this.refresh();
        assert(this.rounds_left > 0, 'Game Ended, yet round refresh called');

        this.round = new Round(this.room.players);
    };

    removePlayer = (socket_id: string) => {
        this.round?.removePlayer(socket_id);
    };
}

export default Game;
