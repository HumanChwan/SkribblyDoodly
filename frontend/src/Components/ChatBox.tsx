import React, { useEffect, useState } from "react";
import { useUser } from "../Contexts/UserContext";

interface Message {
    success: boolean;
    sender: string;
    message: string;
}

const ChatBox = () => {
    const [messages, setMessages] = useState<Array<Message>>([]);
    const [inputText, setInputText] = useState<string>("");
    const { socket } = useUser()!;

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (socket === null) return;
        socket.emit("chat-send", inputText);

        setInputText("");
    };

    useEffect(() => {
        if (socket === null) return;

        socket.on("chat-receive", (sanitised_messaage) => {
            const new_messages = [...messages, sanitised_messaage];
            setMessages(new_messages);
        });

        return () => {
            socket.off("chat-receive");
        };
    }, [socket]);

    return (
        <section>
            <div>
                {messages.map((message) => {
                    return `@${message.sender}: ${message.message}`;
                })}
            </div>
            <div>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        onChange={(e) => {
                            setInputText(e.target.value);
                        }}
                        value={inputText}
                    />
                    <input type='submit' value='Submit' />
                </form>
            </div>
        </section>
    );
};

export default ChatBox;
