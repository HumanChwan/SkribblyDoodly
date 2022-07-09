import { promises as fs } from "fs";
import Player from "./Player";

const RandomString = async () => {
    try {
        const data = await fs.readFile("./Utils/words.txt", "utf-8");
        const words = data.split("\n");
        return `${words[Math.floor(words.length * Math.random())]}-${
            words[Math.floor(words.length * Math.random())]
        }-${words[Math.floor(words.length * Math.random())]}`;
    } catch (err) {
        console.error("ERROR: could not read file `words.txt`");
        return "xxxxx-xxxxx-xxxxx";
    }
};

const ROOM_STRENGTH = 5;
class Room {
    ID: string;
    scope: string;
    strength: number;
    secret_keyword: string | null;
    players: Array<Player>;

    static current_room: Room | null = null;
    static get ROOM_STRENGTH() {
        return ROOM_STRENGTH;
    }
    constructor(id: string, scope: string) {
        this.ID = id;
        this.scope = scope;
        this.strength = 0;
        this.players = [];
        this.secret_keyword = null;
    }

    static joinGlobalRoom = async (player: Player): Promise<Room> => {
        if (Room.current_room === null)
            Room.current_room = new Room(await RandomString(), "global");

        const joinable_room = Room.current_room;
        joinable_room.players.push(player);
        console.log(this.current_room);

        Room.current_room.strength++;

        if (Room.current_room.strength === Room.ROOM_STRENGTH)
            Room.current_room = null;

        return joinable_room;
    };
}

export default Room;
