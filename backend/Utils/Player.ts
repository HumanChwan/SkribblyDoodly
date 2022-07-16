import Room from './Room';

class Player {
    username: string;
    socket_id: string;
    room: Room | null;

    score: number;

    // -----------SKRIBL SPECIFIC FIELDS---------------
    skribl_success: boolean;
    skribl_success_time: Date | null;
    is_skribl_setter: boolean;

    constructor(username: string, socket_id: string) {
        this.username = username;
        this.socket_id = socket_id;

        this.room = null;

        this.score = 0;

        this.skribl_success = false;
        this.skribl_success_time = null;
        this.is_skribl_setter = false;
    }

    setWin = () => {
        this.skribl_success = true;
        this.skribl_success_time = new Date();
    };

    disengage = () => {
        if (this.room === null) return;

        this.room.removePlayer(this.socket_id);
        this.room = null;

        this.score = 0;

        this.skribl_success = false;
        this.skribl_success_time = null;
        this.is_skribl_setter = false;
    };

    refresh = () => {
        this.skribl_success = false;
        this.skribl_success_time = null;

        this.is_skribl_setter = false;
    };
}

export default Player;
