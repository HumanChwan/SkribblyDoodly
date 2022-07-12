import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../Contexts/UserContext';

const Players = () => {
    const { roomPlayers: players, leaveRoom } = useUser()!;
    const navigate = useNavigate();

    const handleLeave = () => {
        leaveRoom();
        navigate('../');
    };

    return (
        <section className='player-box'>
            <div className='player-box__list'>
                {players.map((player, idx) => {
                    return <div key={idx}>{player.username}</div>;
                })}
            </div>
            <div className='player-box__game-options'>
                <button onClick={handleLeave} className='btn-primary'>
                    Leave
                </button>
            </div>
        </section>
    );
};

export default Players;
