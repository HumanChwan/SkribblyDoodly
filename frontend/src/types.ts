export interface IPlayer {
    username: string;
    ID: string;
    score: number;
    round_success: boolean;
}

export interface IMessage {
    success: boolean;
    sender: string;
    message: string;
}