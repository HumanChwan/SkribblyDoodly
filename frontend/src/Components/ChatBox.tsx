import React, { useEffect, useState } from 'react';
import { useUser } from '../Contexts/UserContext';
import { IMessage } from '../types';

const ChatBox = () => {
    const [messages, setMessages] = useState<Array<IMessage>>([]);
    const [inputText, setInputText] = useState<string>('');
    const { socket } = useUser()!;

    const handleSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (socket === null) return;
        socket.emit('chat-send', inputText);

        setInputText('');
    };

    useEffect(() => {
        if (socket === null) return;

        socket.on('chat-receive', (sanitised_messaage) => {
            setMessages((messages: Array<IMessage>) => {
                const new_messages = [...messages, sanitised_messaage];
                return new_messages;
            });
        });

        return () => {
            socket.off('chat-receive');
        };
    }, [socket]);

    return (
        <section className='chat-box'>
            <div className='chat-box__messages'>
                {messages.map((message, idx) => {
                    return (
                        <p className='chat-box__messages__message' key={idx}>
                            <strong>@{message.sender}</strong>: {message.message}
                        </p>
                    );
                })}
            </div>
            <div className='chat-box__input'>
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
