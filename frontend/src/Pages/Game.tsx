import React from 'react';
import Canvas from '../Components/Canvas';
import ChatBox from '../Components/ChatBox';
import Players from '../Components/Players';

const Game = () => {
    return (
        <main className='game'>
            <Players />
            <Canvas />
            <ChatBox />
        </main>
    );
};

export default Game;
