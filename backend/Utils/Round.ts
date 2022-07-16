import Player from './Player';
import { shuffle } from './utils';

/*
-Round
    -skribl
*/

const getSecretKeyword = (): string => {
    // TODO: secret_keyword --- preparation
    return 'hello world';
};

class Round {
    secret_keyword: string;
    player_order: Array<Player>;
    setter_player_idx: number;

    in_play: boolean;

    constructor(players: Array<Player>) {
        this.secret_keyword = getSecretKeyword();
        this.player_order = shuffle(players);

        this.setter_player_idx = 0;
        this.in_play = true;
    }

    processMessage = (message: string) => {
        message.trim();
        const result =
            this.secret_keyword.toLowerCase() === message.toLowerCase();

        return result;
    };

    skriblNext = () => {
        this.secret_keyword = getSecretKeyword();
        this.setter_player_idx++;

        if (this.setter_player_idx == this.player_order.length) {
            this.end();
        } else {
            this.player_order[this.setter_player_idx].is_skribl_setter = true;
        }
    };

    removePlayer = (socket_id: string) => {
        this.player_order = this.player_order.filter(
            (player) => player.socket_id !== socket_id
        );
    };

    end = () => {
        this.in_play = false;
    };
}

export default Round;
